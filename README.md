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
├── docs/                    # active engineering and architecture documents
└── legacy-root-archive/     # archived legacy root-level prototype files
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

## Legacy Archive

Legacy root-level files and folders should be collected under `legacy-root-archive/`.

The archive target includes:

- static prototype pages and their CSS/JS
- legacy local API/start scripts
- legacy browser modules and demo data
- legacy templates
- legacy docs
- large static assets such as old outdoor images

See `legacy-root-archive/README.md` for the exact move manifest.

## Current Migration Status

The clean target root is now defined. Some old root files may remain until they can be moved with native `git mv`, because large binary assets must not be recreated through text-only APIs.

Do not delete legacy files until their content has been moved into `legacy-root-archive/` and verified.
