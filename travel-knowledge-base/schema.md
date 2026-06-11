# Travel LLM Wiki Schema

This vault follows the LLM Wiki pattern: immutable raw sources, LLM-generated wiki pages, and explicit schema rules. Use `[[wikilinks]]`, YAML frontmatter, `wiki/index.md`, and `wiki/log.md`.

## Directory Contract

```text
raw/
  sources/        Immutable copied source files and raw crawls.
  assets/         Local images and downloaded media.
wiki/
  index.md        Content catalog and navigation entry.
  overview.md     High-level synthesis.
  log.md          Append-only operation log.
  entities/
    cities/       City pages.
    places/       Attractions, neighborhoods, restaurants, hotels.
    routes/       Multi-city and single-city route entities.
  concepts/       Travel planning concepts, styles, confidence rules.
  sources/        One page per source or source batch.
  synthesis/      Cross-source analysis and product-ready summaries.
  queries/        Saved answers and research outputs.
  comparisons/    City/route/hotel/transport comparisons.
datasets/         Structured manifests that can be consumed by the mini program.
tools/            Import and maintenance scripts.
```

## Page Types

### City

Frontmatter:

```yaml
type: city
city: 香港
country: 中国
sources: []
updated: ISO_DATE
confidence: draft | mixed | verified
```

Required sections:

- Snapshot
- Best For
- Map Planning Notes
- Attractions
- Food
- Accommodation
- Transport
- Open Questions
- Source Notes

### Place

Use for attractions, restaurants, food streets, neighborhoods, hotels, and transit nodes.

Required fields: `type`, `place_type`, `city`, `sources`, `confidence`.

### Route

Use for multi-city and single-city travel routes. Required sections:

- User Input Fit
- Route Sequence
- Map Logic
- Transport
- Daily Plan
- Evidence
- Risks and Verification Needed

### Source Summary

Every raw import should have a source summary page under `wiki/sources/`. Preserve the original raw source path in `sources[]`. Summarize without copying full copyrighted text.

## Ingest Workflow

1. Copy the raw source into `raw/sources/`.
2. Create or update a source summary under `wiki/sources/`.
3. Update related city, place, route, and concept pages.
4. Update `wiki/index.md`.
5. Append one log entry to `wiki/log.md`.
6. Mark uncertain facts as `needs_verification`; never promote Xiaohongshu-only facts to verified.

## Confidence Rules

- `verified`: stable fact checked against official or operational source.
- `mixed`: supported by multiple user notes but not officially verified.
- `draft`: imported from one or more unverified sources.
- `needs_verification`: should not be used as a final recommendation without checking.

## Mini Program Output Rules

- Always separate city-level route overview from single-city detail.
- Map overview should show city nodes and inter-city route first.
- Attraction, food, and hotel points should appear only after selecting or zooming into a city.
- Every generated recommendation should carry evidence references back to wiki/source pages.
