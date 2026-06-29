# Knowledge API Contract

Version: v1.0

This document defines the backend API shape expected by the frontend and future services.

## 1. Design Principle

The API must return knowledge plus epistemic state.

It should not return a plain recommendation without source trail, confidence, freshness, and conflict state.

## 2. Core Endpoints

### 2.1 Intent Retrieval

```http
POST /api/knowledge/query
```

Request:

```json
{
  "intent": "杭州适合亲子citywalk的路线",
  "city": "杭州",
  "dateRange": {
    "start": "2026-07-10",
    "end": "2026-07-12"
  },
  "travelStyle": ["parent_child", "citywalk"],
  "constraints": {
    "pace": "relaxed",
    "avoid": ["high_queue"]
  }
}
```

Response:

```json
{
  "answerType": "places_routes_summary",
  "results": [
    {
      "entityId": "PLACE-xxxx",
      "entityType": "place",
      "title": "",
      "summary": "",
      "confidence": 0.76,
      "freshness": "current",
      "facts": [],
      "inferences": [],
      "disputed": [],
      "sourceTrail": [],
      "feedbackActions": ["confirm", "dispute", "report_stale", "add_note"]
    }
  ],
  "openQuestions": [],
  "queryTrace": {
    "matchedCities": [],
    "matchedStyles": [],
    "usedIndexes": ["entity", "semantic", "claim"]
  }
}
```

### 2.2 Entity Detail

```http
GET /api/knowledge/entities/{entityId}
```

Returns a stable card plus current claims, disputed claims, freshness, and source trail.

### 2.3 Feedback Submit

```http
POST /api/feedback
```

Request:

```json
{
  "entityId": "PLACE-xxxx",
  "field": "opening_hours",
  "feedbackType": "confirm | dispute | stale | correction | experience_note",
  "value": "周日实际没有开门",
  "observedAt": "2026-06-29T14:00:00+08:00",
  "userContext": {
    "tripId": "",
    "city": "杭州"
  }
}
```

Response:

```json
{
  "feedbackId": "FB-xxxx",
  "status": "accepted_as_feedback_evidence",
  "nextAction": "review_queue | confidence_recalculation | no_card_change"
}
```

### 2.4 Conflict List

```http
GET /api/knowledge/conflicts?city=杭州&severity=high
```

Returns unresolved conflicts that may affect planning.

### 2.5 Freshness Status

```http
GET /api/knowledge/freshness?city=杭州
```

Returns stale or aging fields by entity and field.

## 3. Response Semantics

### 3.1 `facts`

Direct source-backed statements. Each item must include evidence IDs.

### 3.2 `inferences`

Agent or human synthesis. Each item must include confidence and supporting evidence.

### 3.3 `disputed`

Conflicting claims. These must be visible to the frontend when relevant.

### 3.4 `confidence`

A numeric score used for sorting and display. It is not a claim of truth by itself.

### 3.5 `freshness`

One of:

- `current`
- `aging`
- `stale`
- `unknown`

## 4. Frontend Display Rules

- Show high-risk disputed fields as caveats.
- Do not hide disputed information.
- Do not present Xiaohongshu-only operational facts as verified.
- Show source labels in user-friendly form.
- Allow user feedback at entity and field level.

## 5. Backend Write Rules

- Feedback writes append-only FeedbackEvent records.
- Feedback may create Evidence and Claims.
- Feedback never edits RawSource.
- Feedback never directly overwrites stable cards.
