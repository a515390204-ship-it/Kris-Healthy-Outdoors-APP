# Repository Structure

## Target Structure

```text
Kris-Healthy-Outdoors-APP/
├── travel-knowledge-base/
├── apps/
│   └── web/
│       └── legacy-static/
├── backend/
│   └── local-dev/
├── crawlers/
│   ├── xiaohongshu/
│   ├── maps/
│   └── official/
├── workers/
│   ├── ingest/
│   ├── extract/
│   ├── claim/
│   ├── conflict/
│   ├── update-cards/
│   └── export/
├── packages/
│   ├── schemas/
│   └── shared/
├── docs/
├── assets/
├── data/
├── lib/
└── templates/
```

## Design Logic

The knowledge base is a standalone node. It should remain readable, auditable, and versionable as knowledge assets.

Long-running code should live outside the knowledge base:

- daily crawlers
- backend APIs
- queue workers
- frontend applications
- shared runtime packages

## Legacy Root Files

The current root contains static prototype files:

- `index.html`, `styles.css`, `script.js`
- `outdoor.html`, `outdoor.css`, `outdoor.js`
- `kb.html`, `kb.css`, `kb.js`
- `kb-manage.html`, `kb-manage.css`, `kb-manage.js`
- `xhs-admin.html`, `xhs-admin.css`, `xhs-admin.js`

Recommended destination:

```text
apps/web/legacy-static/
```

The root also contains local service scripts:

- `api-server.ps1`
- `static-server.js`
- `start-kb-api.cmd`
- `start-product.cmd`

Recommended destination:

```text
backend/local-dev/
```

## Migration Policy

1. Create target folders and README files first.
2. Copy legacy files into target folders.
3. Update relative paths and local-start scripts.
4. Verify GitHub Pages/local server behavior.
5. Only then remove root duplicates.

This prevents deployment breakage while the repository is being reorganized.
