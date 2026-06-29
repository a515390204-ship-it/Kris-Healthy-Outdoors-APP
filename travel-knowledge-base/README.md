# Travel Knowledge Base

This is a source-preserving, evidence-backed travel knowledge base for the travel planning mini program.

The active schema is:

- `90_System/_schema.md`
- `90_System/_architecture.md`
- `90_System/_constraints.md`
- `90_System/_taxonomy.md`

Backend and product integration contracts:

- `90_System/_backend_architecture.md`
- `90_System/_pipeline_contract.md`
- `90_System/_api_contract.md`
- `90_System/_feedback_contract.md`

## Core Logic

```text
RawSource -> Evidence -> Claim -> Entity -> Card -> View / Dataset
```

The production loop is:

```text
Daily crawl -> Evidence/Claim extraction -> Knowledge card update -> Frontend retrieval
Frontend feedback -> Feedback evidence -> Claim confidence update -> Card/View refresh
```

The knowledge base keeps raw information, extracted evidence, structured claims, stable entities, user-facing cards, and frontend-facing views separate.

## New Directory Layers

- `_inbox/`: raw imports, parsed text, and quick notes.
- `10_Mutable/`: evidence, claims, drafts, conflicts, and review queues.
- `20_Immutable/`: stable knowledge cards for places, areas, routes, activities, trip plans, and topics.
- `30_Views/`: city, theme, trip, and status views.
- `90_System/`: schema, architecture, taxonomy, constraints, backend contracts, API contracts, and templates.
- `90_Scripts/`: future ingestion, normalization, validation, update, and export scripts.

## Backend Responsibilities

- Crawl Xiaohongshu and other sources on a schedule.
- Preserve raw source material.
- Extract Evidence and Claims.
- Detect conflicts instead of hiding them.
- Update cards field by field.
- Serve frontend intent-based retrieval.
- Convert user feedback into append-only feedback evidence.
- Recalculate confidence without overwriting original information.

## Legacy Compatibility

The older LLM Wiki structure remains during migration:

- `raw/sources/`: immutable source data such as Xiaohongshu crawls.
- `wiki/`: existing city pages, source summaries, concepts, and synthesis.
- `datasets/`: structured manifests for app-side ingestion.
- `tools/`: existing maintenance scripts.

Do not delete legacy content until it has been migrated and source references are preserved.

## Important Rule

Xiaohongshu data is user-experience evidence. Do not treat it as verified truth until official or stable sources confirm transport, tickets, opening hours, hotel status, closures, safety details, or other high-risk practical facts.

Disputed information should be presented as disputed, not hidden.
