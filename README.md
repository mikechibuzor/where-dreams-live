# Where Dreams Live

Single-page editorial site for **Becoming**, Issue 01 of Where Dreams Live.

## What is included

- Responsive magazine-led landing page
- Direct PDF download with a failure-independent tracking request
- Private Google Sheets download log
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

## Private download tracking

1. Create a Google Sheet and open **Extensions → Apps Script**.
2. Paste `scripts/google-apps-script/download-tracker.gs` into the editor.
3. Add a `TRACKING_SECRET` under **Project Settings → Script properties**.
4. Run `setupDownloadSheet` once and grant access.
5. Deploy the script as a web app that executes as you and allows anyone to invoke it.
6. Copy `.env.example` to `.env.local` and set the web app URL and the same secret.

Each successful event becomes one row in the private `Downloads` tab. Tracking
errors are logged server-side and never interrupt the PDF download.

## Deploy to Vercel

Import the repository into Vercel as a Next.js project. Add
`DOWNLOAD_SHEET_WEBHOOK_URL` and `DOWNLOAD_SHEET_SECRET` in the Vercel project's
environment variables, then deploy. No custom build command or output directory
is required.
