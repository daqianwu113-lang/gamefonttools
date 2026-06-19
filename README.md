# Game Font Tools

Static MVP for a multilingual Roblox fonts and Roblox Studio font helper.

## Features

- Roblox-style Unicode text generator
- Copy-paste font styles
- Roblox Studio font preview
- Lua and rich text code generation
- English and Simplified Chinese UI
- SEO basics for `gamefonttools.com`

## Deploy

Cloudflare Pages settings:

- Project name: `gamefonttools`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`

Direct upload from this directory:

```bash
CLOUDFLARE_API_TOKEN="..." \
CLOUDFLARE_ACCOUNT_ID="..." \
node scripts/deploy-cloudflare-pages.mjs
```

Custom domain:

- `gamefonttools.com`
- `www.gamefonttools.com` redirecting or pointing to the same Pages project
