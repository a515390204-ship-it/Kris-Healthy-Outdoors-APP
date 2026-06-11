# Travel Knowledge Base

This is an LLM Wiki-style knowledge base for the travel planning mini program.

Location: `D:\Travel Knowledge Base`

## What Is Inside

- `purpose.md`: product goal and knowledge-base mission.
- `schema.md`: page types, confidence rules, and ingest workflow.
- `AGENTS.md`: maintenance instructions for future LLM agents.
- `raw/sources/`: immutable source data such as Xiaohongshu crawls.
- `wiki/`: LLM-maintained pages, including city pages, source summaries, concepts, and synthesis.
- `datasets/`: structured manifests for app-side ingestion.
- `tools/`: maintenance scripts.

## Current Seed Data

The first seed import contains 9 Xiaohongshu candidate travel notes for Hong Kong and Macau.

Start here:

- `wiki/index.md`
- `wiki/overview.md`
- `wiki/entities/cities/hong-kong.md`
- `wiki/entities/cities/macau.md`
- `wiki/synthesis/xhs-hong-kong-macau-initial-findings.md`

## Import Future Xiaohongshu Candidate Data

After running the mini program crawler and producing `xhs-import-candidates*.json`, copy it into the knowledge base with:

```bash
python "D:\Travel Knowledge Base\tools\import_xhs_candidates.py" "C:\path\to\xhs-import-candidates.json" --batch 2026-05-27-city-topic
```

That script stores the raw JSON under `raw/sources/xiaohongshu/` and appends an operation log entry.

## Important Rule

Xiaohongshu data is user-experience evidence. Do not treat it as verified truth until official or stable sources confirm transport, tickets, opening hours, hotel status, and safety details.
