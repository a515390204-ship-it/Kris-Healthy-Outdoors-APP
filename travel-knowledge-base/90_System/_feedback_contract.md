# Feedback Contract

Version: v1.0

User feedback is a knowledge input, not a direct edit.

## 1. Principle

Feedback must be append-only and traceable.

```text
FeedbackEvent -> Evidence -> Claim / Conflict / Review Queue -> Confidence update -> Card/View refresh
```

Feedback never overwrites:

- RawSource
- Evidence
- existing Claims
- stable card history

## 2. FeedbackEvent Model

```yaml
---
type: feedback_event
id: FB-<UUID-SHORT>
entity_id: PLACE-xxxx
field: opening_hours
feedback_type: confirm | dispute | stale | correction | experience_note
value: ""
observed_at: 2026-06-29T14:00:00+08:00
submitted_at: 2026-06-29T14:05:00+08:00
user_context:
  trip_id: ""
  city: ""
  source: frontend
status: received | converted_to_evidence | queued_for_review | rejected
---
```

## 3. Feedback Types

| Type | Meaning | Expected action |
|---|---|---|
| `confirm` | User agrees with current field or claim | increase support if credible |
| `dispute` | User reports contradiction | create conflict or review item |
| `stale` | User says information may be outdated | mark claim/card field aging or stale |
| `correction` | User offers replacement value | create claim candidate, review if high-risk |
| `experience_note` | User shares subjective experience | create experience evidence |

## 4. Trust Treatment

Feedback confidence depends on:

- recency
- whether it includes observation time
- whether it matches other evidence
- whether the field is high-risk
- whether the user is trusted or anonymous
- whether media/location proof exists

Feedback can raise or lower confidence, but high-risk facts still require stronger verification.

## 5. Conflict Creation

Create or update a Conflict when feedback contradicts:

- verified claim
- active claim
- current card field
- multiple existing user-experience sources

## 6. Frontend Feedback UX

The frontend should allow field-level feedback:

- confirm this is still true
- this is wrong
- this is outdated
- add my experience
- report closure or safety issue

High-risk reports should be prioritized in review queues.

## 7. Card Refresh Rules

A feedback event may refresh card presentation when:

- enough feedback supports an existing claim
- feedback creates a high-severity conflict
- feedback marks an important field stale
- trusted review resolves a conflict

The refresh must cite feedback-derived evidence IDs and preserve older claims.
