# Travel Knowledge Base Purpose

## Mission

Build a persistent LLM-maintained travel knowledge base for a travel planning mini program. The knowledge base should help generate itinerary plans that are strongly grounded in city-specific facts, map context, user style preferences, and source evidence.

## Product Scope

The knowledge base must support travel planning for cities across China and eventually worldwide. It should cover:

- Attractions and neighborhoods
- Food, restaurants, markets, cafes, and local specialties
- Hotels, areas to stay, and accommodation tradeoffs
- Inter-city and intra-city transport
- Route planning, travel days, time budgets, and map-aware sequencing
- Culture, history, safety, ticketing, opening-hour, and practical reminders
- Travel styles: check-in, food, culture/history, City Walk, relaxed vacation, and intense high-density trips

## Source Strategy

Xiaohongshu is treated as user-experience evidence: real routes, phrasing, pain points, photo spots, queue warnings, and preference signals. It is not the only source of truth.

Official tourism sites, attraction pages, transport operators, hotel platforms, and map APIs should be used to verify stable facts such as opening hours, route availability, fares, safety constraints, and ticket rules.

## Core Product Questions

- Given cities, dates, and travel style, what route should the mini program recommend?
- Which attractions and food spots should appear on the map first, and which should only appear after zooming into a single city?
- What is the best transport mode between cities?
- Which areas are suitable for accommodation under different budgets and travel styles?
- Which source-backed notes should be shown to explain why a plan was generated?
