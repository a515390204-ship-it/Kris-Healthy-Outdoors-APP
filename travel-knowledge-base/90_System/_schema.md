# Travel Knowledge Base Cognitive Constitution

Version: v2.1  
Scope: `travel-knowledge-base/`  
Status: active schema

This file is the highest-level schema for the travel knowledge base. It upgrades the old LLM Wiki structure into a source-preserving, evidence-backed, location-centered knowledge system.

## 1. Core Principles

### 1.1 Separate Source, Evidence, Claim, Entity, and Card

The knowledge base must never collapse raw material, extracted evidence, structured claims, and human-facing knowledge cards into one object.

```text
RawSource -> Evidence -> Claim -> Entity -> Card -> View / Dataset
```

- `RawSource`: where the information came from.
- `Evidence`: the smallest source-backed fragment that can be cited.
- `Claim`: a structured, updateable assertion extracted from evidence.
- `Entity`: the stable object being described, such as a place, area, route, activity, trip plan, or topic.
- `Card`: the readable knowledge page generated from accepted claims, unresolved conflicts, and synthesis.
- `View / Dataset`: navigation, planning, and app-facing output generated from cards and claims.

### 1.2 Preserve Original Material

Raw files are first-order records. They must not be edited after ingestion. If a source needs correction, append a new source, claim, conflict, or erratum. Do not rewrite the original imported file.

### 1.3 Mark Epistemic Status Explicitly

Every knowledge statement must be marked as one of the following:

```text
[FACT] Directly present in a source or evidence fragment.
[INFERENCE | by: agent/human | confidence: high/medium/low] Derived from one or more facts.
[CONJECTURE | needs_verification: true] Plausible but not sufficiently supported.
[NEED_REVIEW] Conflicting, stale, incomplete, or operationally risky.
```

Xiaohongshu content is user-experience evidence. It can support travel taste, route preference, crowding signals, photo spots, pain points, and phrasing, but it must not become verified truth for opening hours, tickets, safety, closures, hotel status, or transport rules without official or stable confirmation.

### 1.4 Field-Level Updates, Not Whole-Card Overwrites

Place cards must be updated by field. A new source may update `queue_time` without touching `address`; a new official page may update `opening_hours` without rewriting the experience summary. Every important field must keep evidence or claim references.

### 1.5 Time and Freshness Are Part of Truth

Travel knowledge expires. Claims must carry `created`, `modified`, and when possible `observed_at`, `valid_from`, `valid_until`, or `time_scope`. Stale claims are not deleted; they are marked as stale and excluded from current-card promotion when necessary.

### 1.6 Conflicts Are First-Class Knowledge

Conflicting claims must create or update a `Conflict` record. High-risk conflicts, such as closure, address, ticketing, reservation, safety, and transport availability, must mark the card field as `[NEED_REVIEW]` until resolved.

## 2. Directory Contract

```text
travel-knowledge-base/
├── _inbox/
│   ├── Raw_Files/
│   │   ├── xiaohongshu/
│   │   ├── maps/
│   │   ├── official/
│   │   └── manual/
│   ├── Parsed_Text/
│   └── Quick_Notes/
├── 10_Mutable/
│   ├── Evidence/
│   ├── Claims/
│   ├── Draft_Cards/
│   ├── Review_Queue/
│   └── Conflicts/
├── 20_Immutable/
│   └── Knowledge_Base/
│       ├── Places/
│       ├── Areas/
│       ├── Routes/
│       ├── Activities/
│       ├── TripPlans/
│       └── Topics/
├── 30_Views/
│   ├── By_City/
│   ├── By_Theme/
│   ├── By_Trip/
│   └── By_Status/
├── 90_System/
│   ├── _schema.md
│   ├── _architecture.md
│   ├── _taxonomy.md
│   ├── _constraints.md
│   └── templates/
├── 90_Scripts/
│   ├── ingest/
│   ├── normalize/
│   ├── update_cards/
│   ├── validate/
│   └── export/
├── Archives/
├── raw/
├── wiki/
├── datasets/
└── tools/
```

`raw/`, `wiki/`, `datasets`, and `tools/` remain as legacy compatibility layers and should be migrated gradually. New imports should use the v2 folders unless an existing tool still requires the legacy path.

## 3. Layer Rules

### 3.1 `_inbox/`

Collection layer. It may contain unprocessed material, extracted text, and quick notes. Material here is not yet trusted knowledge.

### 3.2 `10_Mutable/`

Working layer. It may change frequently. Evidence, claims, drafts, conflicts, and review queues live here.

### 3.3 `20_Immutable/`

Stable knowledge layer. Immutable means source-backed and controlled, not frozen forever. Cards can receive field-level updates when new claims pass validation, but old evidence and claims must remain traceable.

### 3.4 `30_Views/`

Readable and app-planning views. Views are derived from cards and claims. They are not source truth.

### 3.5 `90_System/`

System layer for schema, architecture, taxonomy, constraints, templates, and future prompt contracts.

### 3.6 `90_Scripts/`

Automation layer for ingestion, normalization, field-level card updates, validation, and exports.

## 4. Core Entity Types

### 4.1 RawSource

```yaml
---
type: raw_source
id: SRC-<UUID-SHORT>
platform: xiaohongshu | amap | google_maps | official | blog | manual
source_url: ""
raw_file: "_inbox/Raw_Files/xiaohongshu/xxx.json"
title: ""
author: ""
published_at: ""
captured_at: 2026-06-14T10:00:00+08:00
content_hash: ""
location_hints: []
processing_status: raw | parsed | extracted | reviewed
---
```

### 4.2 Evidence

```yaml
---
type: evidence
id: EV-<UUID-SHORT>
source_id: SRC-xxxx
evidence_type: text | image | comment | metadata | ocr | manual_observation
captured_at: 2026-06-14T10:00:00+08:00
quote: ""
source_locator: ""
mentioned_entities: []
fact_marker: "[FACT]"
---
```

Evidence records prove that a source said or showed something. They do not prove that the real-world statement is true.

### 4.3 Claim

```yaml
---
type: claim
id: CL-<UUID-SHORT>
subject_id: PLACE-xxxx
predicate: opening_hours | price | reservation | crowd_level | transport | highlight | risk | suitability | address | geo | route_sequence
value: ""
value_type: text | number | range | boolean | enum | geo | list
time_scope: ""
source_evidence: [EV-xxxx]
confidence: 0.0
freshness: current | aging | stale | unknown
status: active | verified | contradicted | outdated | rejected
created: 2026-06-14T10:00:00+08:00
modified: 2026-06-14T10:00:00+08:00
---
```

### 4.4 Place

```yaml
---
type: place
id: PLACE-<UUID-SHORT>
title: ""
aliases: []
category: cafe | restaurant | attraction | hotel | museum | shopping | neighborhood | transport | nature | campsite
area_id: AREA-xxxx
address: ""
geo:
  lat:
  lng:
external_ids:
  amap:
  google_maps:
  xiaohongshu_poi:
created: 2026-06-14T10:00:00+08:00
modified: 2026-06-14T10:00:00+08:00
maturity: seed | sapling | evergreen
confidence: 0.0
source_refs: []
relations: []
tags: []
---
```

Required sections:

- Current Snapshot
- Facts
- Practical Info
- Highlights
- Risks / Avoid
- Open Conflicts
- Source Trail
- Wikilinks

### 4.5 Area

Use for countries, provinces, cities, districts, neighborhoods, islands, scenic zones, and transport hubs.

### 4.6 Route

Use for map-aware sequences, inter-city movement, single-city day plans, and theme routes.

### 4.7 Activity

Use for travel actions such as camping, citywalk, parent-child beach day, museum day, food crawl, rainy-day route, or photo route.

### 4.8 TripPlan

Use for reusable itinerary plans generated from places, routes, activities, time budgets, and traveler constraints.

### 4.9 Conflict

```yaml
---
type: conflict
id: CF-<UUID-SHORT>
subject_id: PLACE-xxxx
field: reservation
claims: [CL-aaa, CL-bbb]
reason: "Different sources disagree about whether reservation is required."
severity: low | medium | high
status: open | resolved | ignored
resolution: ""
resolved_by: ""
resolved_at: ""
---
```

## 5. Relation Model

Relations must appear in YAML and in a final `## Wikilinks` section using Obsidian/Dataview-compatible syntax.

| Relation | Meaning |
|---|---|
| `located_in` | Place belongs to an area |
| `nearby` | Two entities are spatially close |
| `same_as` | External/platform identity maps to the same entity |
| `suitable_for` | Place/route fits a topic, style, or traveler type |
| `avoid_when` | Not recommended under a condition |
| `best_during` | Better during a time, season, or situation |
| `mentioned_by` | Source or evidence mentions an entity |
| `supports_claim` | Evidence supports a claim |
| `conflicts_with` | Claim or card field conflicts with another |
| `part_of_route` | Place is included in a route |
| `derived_from` | Card or claim was derived from evidence/source |

## 6. Ingestion Protocol

1. Store raw imported material under `_inbox/Raw_Files/` or retain existing legacy raw material under `raw/sources/` as read-only.
2. Extract text/OCR into `_inbox/Parsed_Text/` when needed.
3. Create Evidence fragments under `10_Mutable/Evidence/`.
4. Normalize place identity, aliases, coordinates, platform POI IDs, city, and area.
5. Generate Claims under `10_Mutable/Claims/`.
6. Run constraints: source authority, freshness, conflict detection, required fields, and wikilinks.
7. Update or create Draft Cards under `10_Mutable/Draft_Cards/`.
8. Promote reviewed cards to `20_Immutable/Knowledge_Base/` when gates pass.
9. Append operation log entries.
10. Export app-facing views or datasets only after evidence references are preserved.

## 7. Field Update Rules

- Address and geo: prefer map/official sources; Xiaohongshu can supply hints.
- Opening hours, tickets, reservation, safety, closures: require official or stable confirmation before `verified`.
- Queue, crowd, photo spots, vibe, pain points: Xiaohongshu evidence is useful but should remain time-scoped.
- Price: must include observed date or source date; stale quickly.
- Suitability: may be inference, but cite supporting evidence.
- Route sequence: must distinguish source route from recommended route.

## 8. Freshness Defaults

| Field | Default review window |
|---|---:|
| Address / geo | 365 days |
| Opening hours | 30-90 days |
| Tickets / price | 30-90 days |
| Reservation rules | 30-60 days |
| Queue / crowd level | 14-30 days |
| Seasonal scenery | Season-bound |
| Subjective experience | Does not expire automatically, but freshness decreases |

## 9. Promotion Gate

A card may enter `20_Immutable/Knowledge_Base/` when all conditions pass:

- It has at least one source reference.
- It has at least two evidence fragments, or one manually verified evidence fragment.
- High-risk fields have no unresolved high-severity conflict.
- YAML relations and `## Wikilinks` are present and consistent.
- Every important fact field points to evidence or claim IDs.
- `maturity` is at least `sapling`, unless explicitly accepted as a seed card for navigation.

## 10. Legacy Migration Rule

Existing `wiki/entities`, `wiki/sources`, `wiki/synthesis`, and `datasets` are not deleted. They should be migrated gradually:

- `wiki/entities/cities/*` -> `20_Immutable/Knowledge_Base/Areas/`
- `wiki/entities/places/*` -> `20_Immutable/Knowledge_Base/Places/`
- `wiki/entities/routes/*` -> `20_Immutable/Knowledge_Base/Routes/`
- `wiki/sources/*` -> Evidence and RawSource references
- `wiki/synthesis/*` -> `30_Views/` or `20_Immutable/Knowledge_Base/Topics/`
- `datasets/*` -> generated outputs from accepted cards and claims

## 11. Operation Log

Important changes must append a log entry. Logs are append-only.

```text
[YYYY-MM-DD HH:MM] <TYPE> | <actor> | <description> | <entities>
```

Types: `INGEST`, `EXTRACT`, `CLAIM`, `UPDATE`, `LINK`, `CONFLICT`, `REVIEW`, `PROMOTE`, `ARCHIVE`, `MIGRATE`, `SCHEMA_CHANGE`, `ERRATUM`.
