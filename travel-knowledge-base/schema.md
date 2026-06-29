# Travel Knowledge Base Schema

The active schema is now v2.1 and is maintained at:

- `90_System/_schema.md`
- `90_System/_architecture.md`
- `90_System/_constraints.md`
- `90_System/_taxonomy.md`

Backend and product integration contracts are maintained at:

- `90_System/_backend_architecture.md`
- `90_System/_pipeline_contract.md`
- `90_System/_api_contract.md`
- `90_System/_feedback_contract.md`

This file is kept as the legacy entry point for older tools and readers.

## Current Model

The knowledge base now follows a source-preserving evidence pipeline:

```text
RawSource -> Evidence -> Claim -> Entity -> Card -> View / Dataset
```

The backend extends this into a production loop:

```text
Daily crawl -> Evidence/Claim extraction -> Knowledge card update -> Frontend retrieval
Frontend feedback -> Feedback evidence -> Claim confidence update -> Card/View refresh
```

## Compatibility

The previous LLM Wiki folders remain available during migration:

- `raw/sources/`
- `wiki/entities/`
- `wiki/sources/`
- `wiki/synthesis/`
- `datasets/`
- `tools/`

New ingestion should use the v2 directories:

- `_inbox/`
- `10_Mutable/`
- `20_Immutable/`
- `30_Views/`
- `90_System/`
- `90_Scripts/`

## Migration Rule

Do not delete legacy pages during schema migration. Move knowledge gradually into the new model while preserving source references, wikilinks, and operation history.
