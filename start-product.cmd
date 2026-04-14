@echo off
setlocal
set ROOT=%~dp0
set NODE_CMD=node
where node >nul 2>nul
if errorlevel 1 (
  set NODE_CMD=%ROOT%node-v22.15.1-win-x64\node.exe
)
start "Knowledge Base API" powershell -ExecutionPolicy Bypass -File "%ROOT%api-server.ps1"
start "Static Site" %NODE_CMD% "%ROOT%static-server.js"
echo.
echo Product is starting...
echo Frontend: http://127.0.0.1:8080
echo Knowledge API: http://127.0.0.1:3047/api/health
echo.
pause
