#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
from datetime import UTC, datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="Import XHS candidate JSON into Travel Knowledge Base raw sources.")
    parser.add_argument("candidate_json", help="Path to xhs-import-candidates*.json")
    parser.add_argument("--batch", default="", help="Batch folder name, e.g. 2026-05-24-hong-kong-macau")
    args = parser.parse_args()

    source = Path(args.candidate_json).expanduser().resolve()
    if not source.exists():
        raise FileNotFoundError(source)

    batch = args.batch or f"{datetime.now().strftime('%Y-%m-%d')}-xhs-import"
    target_dir = ROOT / "raw" / "sources" / "xiaohongshu" / batch
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / source.name
    shutil.copy2(source, target)

    data = json.loads(target.read_text(encoding="utf-8"))
    manifest = {
        "importedAt": now_iso(),
        "source": str(source),
        "target": str(target.relative_to(ROOT)),
        "sourceQuery": data.get("sourceQuery"),
        "entryCount": len(data.get("entries") or []),
        "status": "raw_imported_needs_ingest",
    }
    (target_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    log = ROOT / "wiki" / "log.md"
    with log.open("a", encoding="utf-8") as handle:
        handle.write(f"\n## [{now_iso()}] ingest | {source.name}\n\n")
        handle.write(f"Copied candidate JSON to `{target.relative_to(ROOT)}`. Entry count: {manifest['entryCount']}.\n")

    print(target)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
