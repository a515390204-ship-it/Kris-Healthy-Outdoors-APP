# Travel Knowledge Base Constraints

## 1. Source Authority

| Source | Strong for | Weak for |
|---|---|---|
| official site | hours, tickets, reservation, rules | subjective experience |
| map platform | address, geo, phone, operational state | taste, vibe, route quality |
| Xiaohongshu post | route experience, pain points, photo spots, crowd signals | verified operational facts |
| Xiaohongshu comment | latest corrections, recent warnings | stable truth |
| manual verification | any field | depends on reviewer quality |

## 2. High-Risk Fields

These fields require stronger review:

- closure / still open
- address / geo
- opening hours
- ticket / price
- reservation
- safety
- transport availability
- hotel status

## 3. Conflict Rules

Create a Conflict when:

- two active claims disagree on the same field
- a newer claim contradicts the current card
- a high-risk field is supported only by weak evidence
- a source appears to mention a different place with the same name

## 4. Card Update Rules

- Never overwrite raw material.
- Never silently replace high-risk fields.
- Keep stale claims as history.
- Mark unresolved operational conflicts as `[NEED_REVIEW]`.
- Cite claim or evidence IDs beside important values.
