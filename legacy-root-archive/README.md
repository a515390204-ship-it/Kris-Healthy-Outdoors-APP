# Legacy Root Archive

This folder is the target archive for legacy root-level prototype files and local-dev scripts.

The repository is being reorganized so the root only contains the current product architecture tree:

```text
travel-knowledge-base/
apps/
backend/
crawlers/
workers/
packages/
docs/
legacy-root-archive/
```

## Archive Policy

Legacy root files should be moved here without changing their content. This preserves history while keeping the root clean.

Binary files, especially large images under `assets/`, must be moved with native git commands such as `git mv` so content is not damaged.

## Files To Archive

### Static prototype pages

Target: `legacy-root-archive/apps-web-legacy-static/`

- `index.html`
- `styles.css`
- `script.js`
- `outdoor.html`
- `outdoor.css`
- `outdoor.js`
- `kb.html`
- `kb.css`
- `kb.js`
- `kb-manage.html`
- `kb-manage.css`
- `kb-manage.js`
- `xhs-admin.html`
- `xhs-admin.css`
- `xhs-admin.js`
- `404.html`
- `_redirects`

### Static assets

Target: `legacy-root-archive/assets/`

- `assets/outdoor/baoshi.jpg`
- `assets/outdoor/jingshan.jpg`
- `assets/outdoor/jiuxi.jpg`

### Local development backend scripts

Target: `legacy-root-archive/backend-local-dev/`

- `api-server.ps1`
- `static-server.js`
- `start-kb-api.cmd`
- `start-product.cmd`

### Legacy browser modules and demo data

Target: `legacy-root-archive/browser-runtime/`

- `data/knowledge-base.json`
- `lib/kb-client.js`
- `lib/kb-data.js`
- `lib/kb-storage.js`

### Legacy templates

Target: `legacy-root-archive/templates/`

- `templates/kb-import-template-fields.md`
- `templates/kb-import-template.csv`

### Legacy docs

Target: `legacy-root-archive/docs/`

- `docs/github-branches-and-run.md`
- `docs/xiaohongshu-integration.md`

## Recommended Native Git Move

Run from the repository root when local git networking is stable:

```bash
git mv index.html styles.css script.js outdoor.html outdoor.css outdoor.js legacy-root-archive/apps-web-legacy-static/
git mv kb.html kb.css kb.js kb-manage.html kb-manage.css kb-manage.js legacy-root-archive/apps-web-legacy-static/
git mv xhs-admin.html xhs-admin.css xhs-admin.js 404.html _redirects legacy-root-archive/apps-web-legacy-static/
git mv assets legacy-root-archive/assets
git mv api-server.ps1 static-server.js start-kb-api.cmd start-product.cmd legacy-root-archive/backend-local-dev/
git mv data lib legacy-root-archive/browser-runtime/
git mv templates legacy-root-archive/templates
git mv docs/github-branches-and-run.md docs/xiaohongshu-integration.md legacy-root-archive/docs/
```

After moving, update any relative paths only if these legacy prototypes still need to run.
