# This Is The Way

To build the future.

Guides for improving AI agents and practicing continuous agentic engineering.

## Development

All build tooling lives in the `site/` directory:

```bash
cd site
bun install
bun run dev
```

## Build

```bash
cd site
bun run build
```

Output goes to `site/dist/`.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via GitHub Actions.

To enable deployment:
1. Go to repo Settings > Pages
2. Set "Source" to "GitHub Actions"

## License

[ISC](LICENSE)
