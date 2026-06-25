# ManCAR Weekly Reports

This repository publishes weekly meeting reports and experiment records through GitHub Pages.

Site entry:

- `index.html`: chronological report index.
- `reports/<date>-<slug>/`: immutable report snapshots and their assets.
- `records/<date>-<slug>.md`: experiment record metadata for each report.

## Weekly Update Flow

1. Create a new folder under `reports/YYYY-MM-DD-topic-slug/`.
2. Put the rendered report at `reports/YYYY-MM-DD-topic-slug/index.html`.
3. Copy any referenced local assets and source data next to the report so relative links remain stable.
4. Add a matching record file under `records/YYYY-MM-DD-topic-slug.md`.
5. Update `index.html`, `reports/index.html`, and `reports/manifest.json`.
6. Commit and push to `main`; GitHub Pages serves from the repository root.

The first archived report is the Scheme-I structural hybrid GPU main GSAP report from the ManCAR reproduction evidence.
