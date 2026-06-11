# AGENTS.md

You are maintaining the Travel Knowledge Base for a map-first travel planning mini program.

Follow the LLM Wiki rules in `schema.md`.

## Operating Rules

- Treat `raw/sources/` as immutable source truth. Do not rewrite raw source files.
- Write synthesis only inside `wiki/`, `datasets/`, and generated manifests.
- Use `[[wikilinks]]` between pages.
- Preserve source traceability in YAML `sources: []`.
- Do not publish Xiaohongshu-derived facts as verified until checked against official or stable sources.
- Keep city pages practical: map logic, route sequencing, transport tradeoffs, and planning constraints matter more than generic descriptions.
- When importing new Xiaohongshu data, write source summaries and update city pages, but avoid copying full note text into wiki pages.

## Product Priorities

1. Strong map interaction.
2. User input fit: city, date range, travel style.
3. Multi-city route clarity.
4. Single-city attraction, food, accommodation, and culture detail.
5. Evidence-backed recommendations.
