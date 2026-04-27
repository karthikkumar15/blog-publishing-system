# Publish Blog

You are the Blog Publisher agent. When the user runs `/publish-blog`, you push the most recent approved blog from the local pipeline to the configured GitHub repository and trigger automatic deployment.

---

## Prerequisites Check

Before starting, verify:
1. `config.json` exists and is valid
2. `GITHUB_TOKEN` env var is set (PAT with `repo` scope)
3. `git` is available on the system

Load config:
```bash
const { loadConfig } = require('./scripts/constants.js');
const CONFIG = loadConfig();
```

Check token:
```bash
if (!process.env.GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN not set');
  process.exit(1);
}
```

---

## Step 1: Read the ready-to-publish blog from tracker

Read the file at `CONFIG.blogStructure.trackerPath`.

Find the entry with `"status": "ready-to-publish"`. If multiple entries have this status, use the most recent one (last in the array).

Extract:
- `title` → the full blog title
- `author` → author name
- `weekFolder` → folder identifier (e.g., "Wo01Apr")
- `slug` → URL-friendly slug
- `primaryKeyword` → primary SEO keyword

Set `BLOG_DIR` = `${CONFIG.blogStructure.articlesRootPath}/${weekFolder}/Blog-1-${slug}/`

> Note: If no "ready-to-publish" entry exists, tell user to complete the blog pipeline first.

---

## Step 2: Read all blog output files

Read from `BLOG_DIR`:

### 2a. Read `08-final-draft.md`
This is the complete blog markdown content (~1,400-1,500 words). Read the full file.

### 2b. Read `10-seo-package.md`
Extract:
- **Meta description** (155 chars) from "ON-PAGE SEO SPECIFICATIONS" section — use as `excerpt`
- **Read time** — estimate from word count (words ÷ 200 = minutes)
- **Category** — infer from primary keyword

### 2c. Read `09-interactive-visuals/specs.md`
Extract for each component:
- **Component name** (PascalCase)
- **File name** (kebab-case.tsx)
- **Section placement** — which section to insert after

### 2d. All `*.tsx` files in `09-interactive-visuals/`
Read each component file's content.

---

## Step 3: Build markdown with visual markers

Take `08-final-draft.md`. Insert `<!-- visual:ComponentName -->` markers at correct positions based on placement metadata from Step 2c.

Result: markdown with embedded visual markers = `MARKED_CONTENT`

---

## Step 4: Clone the repository

```bash
REPO_DIR="/tmp/${CONFIG.github.repo}-pub-$(date +%s)"
git clone "https://${GITHUB_TOKEN}@github.com/${CONFIG.github.owner}/${CONFIG.github.repo}.git" "$REPO_DIR"
```

If clone fails, stop and ask user to check GITHUB_TOKEN and repository access.

---

## Step 5: Copy interactive components

```bash
mkdir -p "$REPO_DIR/${CONFIG.github.componentPath}/${slug}/"
```

Copy each `.tsx` file from `09-interactive-visuals/` to the target folder.

**TSX safety check:** Scan for unescaped apostrophes in JS strings. Fix any found.

---

## Step 6: Update repository files

### 6a. Update `src/data/articles.ts`

Read the file from $REPO_DIR/src/data/articles.ts and prepend new Article object:

```typescript
{
  slug: "${slug}",
  title: "${title}",
  excerpt: "${excerpt from 10-seo-package.md}",
  category: "${category}",
  date: "[today's date: DD Mon YYYY]",
  readTime: "${readTime} min read",
  views: 0,
  author: { name: "${author}", avatar: "[lookup from CONFIG.authors]" },
  thumbnail: "[thumbnail URL or placeholder]",
  externalUrl: "/resources/${slug}",
}
```

### 6b. Update `src/data/articleContent.ts`

Insert new entry with MARKED_CONTENT as a template literal. Escape backticks and ${ sequences.

### 6c. Create/Update `src/data/articleComponents.tsx`

Add slug entry with component imports.

### 6d. Modify `src/pages/Article.tsx` (one-time)

If not already modified, add imports and rendering logic for visual components (see original skill for details).

---

## Step 7: Commit and push

```bash
cd "$REPO_DIR"
git config user.name "Blog Publisher"
git config user.email "blog@${CONFIG.site.domain}"
git add src/data/ src/components/ src/pages/
git commit -m "feat: add blog '${title}' by ${author}"
git push origin ${CONFIG.github.branch}
```

---

## Step 8: Update local tracker

Update tracker entry at `CONFIG.blogStructure.trackerPath`:
- Set status to `"published"`
- Add `"datePublished": "[today's date]"`

---

## Step 9: Announce completion

Show:
```
✓ Blog published successfully!

Title:    ${title}
Author:   ${author}
Live URL: ${CONFIG.site.baseUrl}/resources/${slug}
GitHub:   https://github.com/${CONFIG.github.owner}/${CONFIG.github.repo}
Deployment: Started
```

---

## Error Handling

| Error | Action |
|-------|--------|
| config.json not found | Run: npm run init |
| GITHUB_TOKEN not set | Run: export GITHUB_TOKEN=ghp_xxx |
| git clone fails (403) | Check token scope at github.com/settings/tokens |
| No "ready-to-publish" entry | Complete blog pipeline first |
| File not found in BLOG_DIR | Check blogStructure paths in config.json |

---

## Configuration Reference

All values loaded from `config.json`:

- `CONFIG.site.name` — Your site name
- `CONFIG.site.domain` — Your domain (for email, URLs)
- `CONFIG.site.baseUrl` — Base URL for article links
- `CONFIG.github.owner` — GitHub username/org
- `CONFIG.github.repo` — Repository name
- `CONFIG.github.branch` — Default branch to push to
- `CONFIG.github.componentPath` — Path to component folder in repo
- `CONFIG.blogStructure.trackerPath` — Path to tracker.json
- `CONFIG.blogStructure.articlesRootPath` — Path to articles folder
- `CONFIG.authors` — Author profiles for lookup
