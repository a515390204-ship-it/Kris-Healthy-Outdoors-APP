# AGENTS.md

You are maintaining the Travel Knowledge Base for a map-first travel planning mini program.

Follow the active schema in `90_System/_schema.md` and backend contracts in:

- `90_System/_backend_architecture.md`
- `90_System/_pipeline_contract.md`
- `90_System/_api_contract.md`
- `90_System/_feedback_contract.md`

## Operating Rules

- Treat raw sources as immutable. Do not rewrite files in `raw/sources/` or `_inbox/Raw_Files/`.
- Separate `RawSource`, `Evidence`, `Claim`, `Entity`, `Card`, and frontend-facing views.
- Use `[FACT]`, `[INFERENCE]`, `[CONJECTURE]`, and `[NEED_REVIEW]` markers consistently.
- Do not publish Xiaohongshu-derived facts as verified until checked against official or stable sources.
- Update place cards by field, not by whole-card replacement.
- Preserve source traceability through Evidence and Claim IDs.
- Create Conflict records when important claims disagree.
- Present disputed information as disputed; do not hide it.
- Treat user feedback as append-only feedback evidence, never as direct overwrite.
- Use `[[wikilinks]]` between stable cards.
- Keep city pages practical: map logic, route sequencing, transport tradeoffs, and planning constraints matter more than generic descriptions.

## Product Priorities

1. Strong map interaction.
2. User input fit: city, date range, travel style.
3. Multi-city route clarity.
4. Single-city attraction, food, accommodation, and culture detail.
5. Evidence-backed recommendations.
6. Field freshness for operational facts such as tickets, opening hours, reservation, transport, and safety.
7. Feedback-driven confidence updates without loss of original evidence.

## Backend Priorities

1. Daily crawl jobs preserve raw source material.
2. Extraction creates Evidence before Claims.
3. Claims feed field-level Card updates.
4. Conflicts and stale fields enter Review Queue.
5. Retrieval APIs return knowledge plus confidence, freshness, source trail, and disputed fields.
6. Feedback APIs create FeedbackEvent records and downstream Evidence/Claims.

## Legacy Migration

Existing `wiki/`, `raw/`, `datasets/`, and `tools/` content should be preserved during migration. Move content gradually into `_inbox/`, `10_Mutable/`, `20_Immutable/`, and `30_Views/` only when source references and wikilinks remain intact.
