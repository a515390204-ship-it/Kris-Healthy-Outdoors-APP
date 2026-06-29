# Kris Healthy Outdoors APP

This repository is organized as a product system with the travel knowledge base as an independent knowledge node.

## Repository Layers

```text
Kris-Healthy-Outdoors-APP/
├── travel-knowledge-base/   # canonical knowledge assets and schema
├── apps/                    # frontend and product-facing applications
├── backend/                 # backend APIs and local service entrypoints
├── crawlers/                # source crawlers such as Xiaohongshu/map/official sites
├── workers/                 # ingestion, extraction, claim generation, conflict detection
├── packages/                # shared schemas, types, and utilities
├── docs/                    # engineering and architecture documents
├── assets/                  # shared static assets
├── data/                    # runtime/demo data
├── lib/                     # legacy shared browser modules
└── templates/               # legacy templates
```

## Boundary Rule

`travel-knowledge-base/` is the knowledge asset layer. It stores raw sources, evidence, claims, cards, views, and system schema.

Runtime code should live outside the knowledge base:

- frontend code in `apps/`
- backend API code in `backend/`
- crawlers in `crawlers/`
- knowledge update jobs in `workers/`
- shared types and utilities in `packages/`

Backend services may read from and write to `travel-knowledge-base/`, but they should not be embedded inside it as long-running services.

## Current Migration Status

The root directory still contains legacy static demo files such as `index.html`, `outdoor.html`, `kb.html`, `xhs-admin.html`, and related CSS/JS files. These should be migrated into `apps/web/legacy-static/` after deployment paths are confirmed.

Do not delete root deployment files until GitHub Pages/local-start behavior has been verified.
