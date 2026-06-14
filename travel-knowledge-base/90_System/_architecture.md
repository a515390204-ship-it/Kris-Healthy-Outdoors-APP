# Travel Knowledge Base Architecture

## 1. Architecture Principle

The travel knowledge base is a source-preserving evidence system for location knowledge.

It should not behave like a flat note collection. It should behave like a pipeline:

```text
RawSource -> Evidence -> Claim -> Entity -> Card -> View / Dataset
```

## 2. Layer Responsibilities

### RawSource

RawSource stores where information came from:

- Xiaohongshu notes and comments
- map POI records
- official tourism pages
- attraction or hotel pages
- blog posts
- manual notes
- screenshots and OCR files

RawSource files are immutable.

### Evidence

Evidence is the smallest source-backed fragment that can be cited. It can be text, comment, image OCR, metadata, or manual observation.

Evidence is always factual at the source level:

```text
[FACT] This source said or showed X.
```

It does not mean X is verified in the real world.

### Claim

Claim is a structured assertion extracted from evidence.

Examples:

- `PLACE-xxx opening_hours = 09:00-18:00`
- `PLACE-xxx reservation = required`
- `PLACE-xxx crowd_level = weekend high`
- `ROUTE-xxx includes PLACE-aaa -> PLACE-bbb`

Claims can be active, verified, contradicted, outdated, or rejected.

### Entity

Entities are stable objects:

- Place
- Area
- Route
- Activity
- TripPlan
- Topic

Entity identity is where aliases, external IDs, and platform-specific names are resolved.

### Card

Cards are human-facing knowledge pages generated from accepted claims and synthesis.

Cards must show:

- current summary
- source-backed facts
- practical fields
- highlights
- risks
- unresolved conflicts
- source trail
- wikilinks

### View / Dataset

Views and datasets are outputs for people and the mini program. They should be regenerated from accepted cards and claims, not manually treated as source truth.

## 3. Current Repository Compatibility

The existing repository already has a useful LLM Wiki foundation:

- `raw/sources/` preserves imported material.
- `wiki/sources/` summarizes source batches.
- `wiki/entities/` stores city, place, and route pages.
- `wiki/synthesis/` stores cross-source analysis.
- `datasets/` feeds the app.

The new architecture does not delete these. It wraps them with stronger lower-level logic and migrates them gradually.

## 4. Promotion Flow

```text
_inbox/Raw_Files
  -> 10_Mutable/Evidence
  -> 10_Mutable/Claims
  -> 10_Mutable/Draft_Cards
  -> 20_Immutable/Knowledge_Base
  -> 30_Views and datasets
```

Promotion requires:

- traceable sources
- enough evidence
- no unresolved high-risk conflicts
- consistent relations and wikilinks
- freshness review for volatile fields

## 5. Conflict Flow

```text
New Claim conflicts with current card
  -> create Conflict
  -> mark field NEED_REVIEW
  -> prioritize if high-risk
  -> resolve by official source or human review
  -> update card field
  -> keep old claims as history
```

Conflicts are not noise. They are a core part of making the knowledge base trustworthy.
