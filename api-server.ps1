param(
  [int]$Port = 3047
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dataPath = Join-Path $root "data\knowledge-base.json"

function Read-JsonFile {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    return @{ updatedAt = [DateTime]::UtcNow.ToString("o"); entries = @() }
  }

  $raw = Get-Content -Raw -LiteralPath $Path -Encoding UTF8
  if ([string]::IsNullOrWhiteSpace($raw)) {
    return @{ updatedAt = [DateTime]::UtcNow.ToString("o"); entries = @() }
  }

  return $raw | ConvertFrom-Json -Depth 100
}

function Write-JsonFile {
  param(
    [string]$Path,
    [object]$Data
  )

  $json = $Data | ConvertTo-Json -Depth 100
  Set-Content -LiteralPath $Path -Value $json -Encoding UTF8
}

function ConvertTo-JsonBytes {
  param([object]$Body)
  $json = $Body | ConvertTo-Json -Depth 100
  return [System.Text.Encoding]::UTF8.GetBytes($json)
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$BodyBytes = @(),
    [string]$ContentType = "application/json; charset=utf-8"
  )

  $headers = @(
    "HTTP/1.1 $StatusCode $StatusText",
    "Content-Type: $ContentType",
    "Content-Length: $($BodyBytes.Length)",
    "Access-Control-Allow-Origin: *",
    "Access-Control-Allow-Methods: GET,POST,PUT,PATCH,OPTIONS",
    "Access-Control-Allow-Headers: Content-Type",
    "Connection: close",
    "",
    ""
  ) -join "`r`n"

  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)

  if ($BodyBytes.Length -gt 0) {
    $Stream.Write($BodyBytes, 0, $BodyBytes.Length)
  }
}

function Read-Request {
  param([System.Net.Sockets.TcpClient]$Client)

  $stream = $Client.GetStream()
  $buffer = New-Object byte[] 65536
  $requestBuilder = New-Object System.Text.StringBuilder
  $bytesRead = 0

  do {
    $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
    if ($bytesRead -le 0) { break }
    [void]$requestBuilder.Append([System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead))
    if ($requestBuilder.ToString().Contains("`r`n`r`n")) { break }
  } while ($stream.DataAvailable)

  $requestText = $requestBuilder.ToString()
  if ([string]::IsNullOrWhiteSpace($requestText)) {
    return @{ Stream = $stream; Method = ""; Path = ""; Headers = @{}; Body = $null }
  }

  $headerEnd = $requestText.IndexOf("`r`n`r`n")
  $headerText = if ($headerEnd -ge 0) { $requestText.Substring(0, $headerEnd) } else { $requestText }
  $lines = $headerText -split "`r`n"
  $requestLine = $lines[0].Split(" ")
  $method = $requestLine[0]
  $path = $requestLine[1]
  $headers = @{}

  foreach ($line in $lines | Select-Object -Skip 1) {
    if ($line -match "^\s*$") { continue }
    $parts = $line.Split(":", 2)
    if ($parts.Length -eq 2) {
      $headers[$parts[0].Trim().ToLowerInvariant()] = $parts[1].Trim()
    }
  }

  $contentLength = 0
  if ($headers.ContainsKey("content-length")) {
    [void][int]::TryParse($headers["content-length"], [ref]$contentLength)
  }

  $body = ""
  if ($contentLength -gt 0) {
    $existingBody = if ($headerEnd -ge 0) { $requestText.Substring($headerEnd + 4) } else { "" }
    $bodyBuilder = New-Object System.Text.StringBuilder
    [void]$bodyBuilder.Append($existingBody)
    while ([System.Text.Encoding]::UTF8.GetByteCount($bodyBuilder.ToString()) -lt $contentLength) {
      $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
      if ($bytesRead -le 0) { break }
      [void]$bodyBuilder.Append([System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead))
    }
    $body = $bodyBuilder.ToString()
  }

  return @{
    Stream = $stream
    Method = $method
    Path = $path
    Headers = $headers
    Body = $body
  }
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $Port)
$listener.Start()

Write-Host "Knowledge base API started at http://127.0.0.1:$Port"

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()

    try {
      $request = Read-Request -Client $client
      $stream = $request.Stream

      if ($request.Method -eq "OPTIONS") {
        Send-Response -Stream $stream -StatusCode 204 -StatusText "No Content"
        continue
      }

      if ($request.Path -eq "/api/health" -and $request.Method -eq "GET") {
        Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -BodyBytes (ConvertTo-JsonBytes @{ ok = $true })
        continue
      }

      if ($request.Path -eq "/api/kb" -and $request.Method -eq "GET") {
        $doc = Read-JsonFile -Path $dataPath
        Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -BodyBytes (ConvertTo-JsonBytes $doc)
        continue
      }

      if ($request.Path -eq "/api/kb" -and $request.Method -eq "PUT") {
        $doc = $request.Body | ConvertFrom-Json -Depth 100
        $doc.updatedAt = [DateTime]::UtcNow.ToString("o")
        Write-JsonFile -Path $dataPath -Data $doc
        Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -BodyBytes (ConvertTo-JsonBytes $doc)
        continue
      }

      if ($request.Path -eq "/api/entries" -and $request.Method -eq "POST") {
        $entry = $request.Body | ConvertFrom-Json -Depth 100
        $doc = Read-JsonFile -Path $dataPath
        $entries = @($entry) + @($doc.entries | Where-Object { $_.id -ne $entry.id })
        $nextDoc = @{
          updatedAt = [DateTime]::UtcNow.ToString("o")
          entries = $entries
        }
        Write-JsonFile -Path $dataPath -Data $nextDoc
        Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -BodyBytes (ConvertTo-JsonBytes $nextDoc)
        continue
      }

      if ($request.Path -match "^/api/entries/([^/]+)/workflow$" -and $request.Method -eq "PATCH") {
        $entryId = [System.Uri]::UnescapeDataString($Matches[1])
        $workflow = $request.Body | ConvertFrom-Json -Depth 100
        $doc = Read-JsonFile -Path $dataPath

        $entries = foreach ($item in $doc.entries) {
          if ($item.id -eq $entryId) {
            $item.workflow.status = $workflow.status
            $item.workflow.reviewer = $workflow.reviewer
            $item.workflow.reviewNote = $workflow.reviewNote
            $item.workflow.updatedAt = [DateTime]::UtcNow.ToString("o")
          }
          $item
        }

        $nextDoc = @{
          updatedAt = [DateTime]::UtcNow.ToString("o")
          entries = @($entries)
        }

        Write-JsonFile -Path $dataPath -Data $nextDoc
        Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -BodyBytes (ConvertTo-JsonBytes $nextDoc)
        continue
      }

      Send-Response -Stream $stream -StatusCode 404 -StatusText "Not Found" -BodyBytes (ConvertTo-JsonBytes @{ error = "Not found" })
    } catch {
      Send-Response -Stream $client.GetStream() -StatusCode 500 -StatusText "Internal Server Error" -BodyBytes (ConvertTo-JsonBytes @{ error = $_.Exception.Message })
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
