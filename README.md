# newmap-site

The central hub for newmap.

## Change the domain

**One file:** `src/content/site.json`

```json
{
  "url": "https://newmap.tech",
  "email": "hello@newmap.tech"
}
```

Change `url` and `email`, then rebuild. The `astro.config.mjs` reads from this file automatically.

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

Outputs to `dist/`.

## Architecture

The site is designed to grow without accumulating clutter.

### Header (max 4 items, never grows)

The header is reserved for the core hub pages only:

- **About** — Who we are
- **Work** — What we build
- **Offerings** — How to work with us
- **Contact** — How to reach us

**Never add more items to the header.** As the site grows, new content lives elsewhere.

### Footer (secondary navigation)

The footer auto-populates based on what content actually exists:

```json
"footer": {
  "links": [
    { "label": "Writing", "href": "/writing" },
    { "label": "Cases", "href": "/cases" }
  ],
  "external": [
    { "label": "Demo", "href": "https://demo.newmap.site" }
  ]
}
```

- Footer links only appear when the corresponding content exists
- External links show `↗` and open in a new tab
- Copyright and email always visible

### Contextual links (within pages)

Related content surfaces where it matters:

- **Work page** links to Demo when demo exists
- **Offerings page** links to Case Studies when cases exist
- **About page** links to Writing when blog exists

This keeps the global nav clean while making content discoverable.

## Adding Content Types

The pattern: **content collection + hub page + detail template**.

**Example: Adding a blog**

1. **Create the content directory:**
   ```
   src/content/writing/
     first-post.md
   ```

2. **Create the hub page** (`src/pages/writing.astro`)
3. **Create the detail template** (`src/pages/writing/[slug].astro`)
4. **Enable in footer** by setting `hasWriting = true` in `src/components/layout/Footer.astro`

**Do NOT add to header nav.** The Writing link will appear in the footer automatically.

**Future content types:**
- `/writing` — Blog posts, notes
- `/cases` — Case studies from completed pilots
- `/docs` — Documentation

**Future external properties:**
- `demo.newmap.site` — Interactive demo (separate repo, linked in footer with ↗)

## Deployment

### GitHub Pages
1. Set custom domain in repo settings
2. Optionally add `public/CNAME` with your domain

### VPS
```bash
bun run build
rsync -avz dist/ user@vps:/var/www/newmap/
```
