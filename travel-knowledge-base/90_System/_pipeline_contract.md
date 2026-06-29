# Pipeline Contract

Version: v1.0

This document defines daily crawl and knowledge update jobs.

## 1. Job Types

| Job | Purpose | Output |
|---|---|---|
| `crawl_xiaohongshu_daily` | Crawl user-experience notes by city/theme/seed query | RawSource |
| `parse_raw_source` | Extract text, comments, OCR, metadata | Parsed_Text |
| `extract_evidence` | Produce source-backed fragments | Evidence |
| `generate_claims` | Convert evidence into structured assertions | Claim |
| `normalize_entities` | Resolve places, areas, aliases, POIs | Entity links |
| `detect_conflicts` | Detect claim disagreement and stale fields | Conflict |
| `update_draft_cards` | Apply accepted claims by field | Draft_Cards |
| `promotion_gate` | Check whether drafts can become stable | Knowledge_Base cards |
| `refresh_views` | Generate city/theme/trip/status views | 30_Views |
| `refresh_frontend_indexes` | Generate API/search/vector indexes | runtime index |
| `process_feedback_events` | Convert feedback into evidence/confidence updates | Evidence, Claim, Conflict |

## 2. Job Run Metadata

Every job run must record:

```yaml
type: job_run
id: JOB-<UUID-SHORT>
job_type: crawl_xiaohongshu_daily
status: pending | running | succeeded | failed | partial
started_at: 2026-06-29T10:00:00+08:00
finished_at:
input_refs: []
output_refs: []
error:
retry_count: 0
```

## 3. Daily Crawl Contract

Daily Xiaohongshu crawl should be city/theme based.

Input dimensions:

- city
- theme
- travel style
- season/date intent
- seed keywords
- known entities needing freshness refresh

Output requirements:

- raw file saved
- content hash generated
- source metadata saved
- crawl timestamp saved
- source query saved
- no raw overwrite

## 4. Claim Generation Contract

Claim generation must preserve uncertainty.

Do:

- create separate claims for separate fields
- attach source evidence IDs
- attach time scope when present
- use lower confidence for vague or old evidence
- create conflicts instead of choosing silently

Do not:

- turn a summary into a fact
- merge conflicting claims without a conflict record
- mark Xiaohongshu-only operational facts as verified

## 5. Card Update Contract

Cards are updated field by field.

A field update needs:

- target entity ID
- target field
- old value if any
- proposed value
- supporting claims
- conflict check result
- freshness status
- confidence score

High-risk fields with unresolved conflict must remain `[NEED_REVIEW]`.

## 6. View Refresh Contract

Views should be generated from stable cards and accepted claims.

Required view groups:

- `30_Views/By_City/`
- `30_Views/By_Theme/`
- `30_Views/By_Trip/`
- `30_Views/By_Status/`

Views must include caveats when disputed claims affect planning.

## 7. Failure Policy

- Partial crawl success should still preserve raw files already fetched.
- Failed extraction should create a review item.
- Failed promotion should leave drafts in `10_Mutable/Draft_Cards/`.
- Failed export should not mutate stable cards.
