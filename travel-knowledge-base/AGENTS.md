# AGENTS.md

You are maintaining the Travel Knowledge Base for a map-first travel planning mini program.

Follow the active schema in `90_System/_schema.md`.

## Operating Rules

- Treat raw sources as immutable. Do not rewrite files in `raw/sources/` or `_inbox/Raw_Files/`.
- Separate `RawSource`, `Evidence`, `Claim`, `Entity`, and `Card`.
- Use `[FACT]`, `[INFERENCE]`, `[CONJECTURE]`, and `[NEED_REVIEW]` markers consistently.
- Do not publish Xiaohongshu-derived facts as verified until checked against official or stable sources.
- Update place cards by field, not by whole-card replacement.
- Preserve source traceability through Evidence and Claim IDs.
- Create Conflict records when important claims disagree.
- Use `[[wikilinks]]` between stable cards.
- Keep city pages practical: map logic, route sequencing, transport tradeoffs, and planning constraints matter more than generic descriptions.

## Product Priorities

1. Strong map interaction.
2. User input fit: city, date range, travel style.
3. Multi-city route clarity.
4. Single-city attraction, food, accommodation, and culture detail.
5. Evidence-backed recommendations.
6. Field freshness for operational facts such as tickets, opening hours, reservation, transport, and safety.

## Legacy Migration

Existing `wiki/`, `raw/`, `datasets/`, and `tools/` content should be preserved during migration. Move content gradually into `_inbox/`, `10_Mutable/`, `20_Immutable/`, and `30_Views/` only when source references and wikilinks remain intact.
