# Travel Knowledge Base

This is a source-preserving, evidence-backed travel knowledge base for the travel planning mini program.

The active schema is:

- `90_System/_schema.md`
- `90_System/_architecture.md`
- `90_System/_constraints.md`
- `90_System/_taxonomy.md`

## Core Logic

```text
RawSource -> Evidence -> Claim -> Entity -> Card -> View / Dataset
```

The knowledge base keeps raw information, extracted evidence, structured claims, stable entities, and user-facing cards separate.

## New Directory Layers

- `_inbox/`: raw imports, parsed text, and quick notes.
- `10_Mutable/`: evidence, claims, drafts, conflicts, and review queues.
- `20_Immutable/`: stable knowledge cards for places, areas, routes, activities, trip plans, and topics.
- `30_Views/`: city, theme, trip, and status views.
- `90_System/`: schema, architecture, taxonomy, constraints, and templates.
- `90_Scripts/`: future ingestion, normalization, validation, update, and export scripts.

## Legacy Compatibility

The older LLM Wiki structure remains during migration:

- `raw/sources/`: immutable source data such as Xiaohongshu crawls.
- `wiki/`: existing city pages, source summaries, concepts, and synthesis.
- `datasets/`: structured manifests for app-side ingestion.
- `tools/`: existing maintenance scripts.

Do not delete legacy content until it has been migrated and source references are preserved.

## Important Rule

Xiaohongshu data is user-experience evidence. Do not treat it as verified truth until official or stable sources confirm transport, tickets, opening hours, hotel status, closures, safety details, or other high-risk practical facts.
