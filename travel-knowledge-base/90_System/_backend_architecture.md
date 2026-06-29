# Backend Architecture Contract

Version: v1.0  
Scope: crawler, ingestion, retrieval, feedback, and frontend-facing knowledge APIs.

## 1. Goal

The backend must keep the travel knowledge base continuously updated while preserving source truth and exposing both trusted and disputed information honestly.

It must support four loops:

```text
Daily crawl -> Evidence/Claim extraction -> Knowledge card update -> Frontend retrieval
Frontend feedback -> Feedback evidence -> Claim confidence update -> Knowledge card/view refresh
```

## 2. Non-Negotiable Rules

- Crawled data never overwrites raw data.
- User feedback never overwrites crawled data.
- Cards are updated by field, not by whole-card replacement.
- Disputed information is presented as disputed, not hidden.
- Confidence changes must be explainable through evidence, source authority, freshness, and feedback.
- Official/stable sources are required before high-risk operational facts become `verified`.

## 3. Runtime Components

### 3.1 Scheduler

Runs daily jobs and targeted refreshes.

Responsibilities:

- start Xiaohongshu crawl jobs
- start official/map verification jobs
- schedule freshness checks
- retry failed jobs
- write run logs

Recommended implementation options:

- GitHub Actions for low-frequency maintenance
- server cron for daily production crawls
- queue worker for retries and rate-limited tasks

### 3.2 Crawler Workers

Fetch source material from external platforms.

Initial worker groups:

- `xiaohongshu_crawler`: user-experience notes, comments, engagement, tags, POI hints
- `map_crawler`: address, coordinates, opening status, phone, POI identity
- `official_crawler`: hours, tickets, reservation, closure, safety, transport notices
- `manual_import`: human observations and uploaded notes

Crawler output must be written as RawSource records and raw files.

### 3.3 Ingestion Pipeline

Transforms raw source material into knowledge-system objects.

```text
RawSource
  -> Parsed_Text / OCR
  -> Evidence
  -> Claim
  -> Conflict detection
  -> Draft Card update
  -> Promotion gate
  -> Stable Card / View / Dataset
```

### 3.4 Knowledge Store

The Git repository remains the canonical auditable knowledge store.

Runtime systems may additionally use:

- relational DB for job status and API speed
- object storage for raw files and screenshots
- vector index for semantic retrieval
- search index for title, alias, city, category, and tags
- cache for frontend API responses

Runtime stores are derived or operational. They do not replace the Git knowledge base.

### 3.5 Retrieval API

Serves frontend intent-based knowledge queries.

The API should retrieve:

- matching places, areas, routes, activities, and trip plans
- current accepted claims
- disputed claims when relevant
- source trail and confidence explanation
- freshness and review status

### 3.6 Feedback API

Receives user feedback and turns it into feedback evidence.

Feedback is never a direct overwrite. It becomes:

```text
FeedbackEvent -> Evidence -> Claim adjustment / Conflict / Review Queue
```

## 4. Backend Data Flow

### 4.1 Daily Crawl Flow

```text
Scheduler
  -> crawler job
  -> raw source saved
  -> extraction job
  -> evidence generated
  -> claims generated
  -> constraints evaluated
  -> conflicts created or updated
  -> draft cards updated by field
  -> promotion gate checked
  -> stable cards and views refreshed
  -> frontend indexes rebuilt
```

### 4.2 Frontend Query Flow

```text
User intent
  -> retrieval API
  -> intent parser
  -> city/theme/time/style filters
  -> entity search + semantic search
  -> claim aggregation
  -> confidence/conflict packaging
  -> frontend response
```

### 4.3 Feedback Flow

```text
User feedback
  -> feedback API
  -> FeedbackEvent saved
  -> evidence generated
  -> confidence recalculation
  -> possible conflict/review item
  -> card/view refresh if threshold crossed
```

## 5. Trust and Dispute Policy

The backend must avoid pretending certainty.

### 5.1 High-Confidence Display

A statement can be displayed as high-confidence when:

- it is supported by official/stable sources, or
- it is supported by multiple independent user-experience sources and is not high-risk, and
- it is fresh enough for the field type, and
- there is no unresolved high-severity conflict.

### 5.2 Disputed Display

A disputed statement should be displayed with disagreement context:

- what sources disagree
- when each source was captured
- which source types support each side
- whether the field affects planning risk
- whether user feedback confirms one side

### 5.3 Feedback Impact

User feedback can:

- increase confidence when it agrees with existing claims
- decrease confidence when it contradicts accepted claims
- create a new conflict
- mark a field as stale or needs review
- promote a review task

User feedback should not directly mark a claim as verified unless it comes from a trusted reviewer workflow.

## 6. Frontend Contract

Frontend responses should include both answer and epistemic state.

Minimum response fields:

```json
{
  "entityId": "PLACE-xxxx",
  "title": "",
  "summary": "",
  "facts": [],
  "inferences": [],
  "disputed": [],
  "confidence": 0.0,
  "freshness": "current",
  "sourceTrail": [],
  "feedbackActions": []
}
```

The frontend should not hide disputed information. It should show it as a planning caveat.

## 7. Operational Guarantees

- Every crawl run has a run ID.
- Every raw source has a content hash.
- Every evidence item points to a source.
- Every claim points to evidence.
- Every card field points to claims or evidence.
- Every feedback event is append-only.
- Every confidence change is reproducible.

## 8. Recommended Build Phases

### Phase 1: Minimal Backend Loop

- daily Xiaohongshu import job
- RawSource/Evidence/Claim generation
- conflict detection
- read-only retrieval API
- feedback event capture

### Phase 2: Trust and Search

- confidence scoring service
- vector/search index
- city/theme route retrieval
- freshness checks
- review queue

### Phase 3: Production Hardening

- official/map verification crawlers
- queue retries
- admin review UI
- dataset export automation
- monitoring and alerting
