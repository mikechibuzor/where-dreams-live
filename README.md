# Where Dreams Live

Single-page editorial site for **Becoming**, Issue 01 of Where Dreams Live.

## What is included

- Responsive magazine-led landing page
- Direct PDF download with a failure-independent tracking request
- Persistent D1 download counter
- Issue previews and Instagram link
- Open Graph and X sharing metadata

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The `DB` binding is declared in `.openai/hosting.json`. The initial D1 migration
is included under `drizzle/` and is applied by the hosting platform.
