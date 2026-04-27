# Complete Blog Publishing Workflow

This document walks through the entire blog creation and publishing process, from idea to live website.

## Overview

The workflow has 6 phases:

```
Planning → Research → Writing → Review → Interactive → SEO → Publish
```

Each phase uses a specific skill, and progress is tracked in `tracker.json`.

---

## Phase 1: Planning & Topic Selection

**Goal:** Define the blog topic, outline, and target audience

**Skill used:** `/blog` (or `/topic-proposer` if brainstorming ideas)

**Output:** Initial outline + tracker entry

### Your Actions:

1. Research your topic
2. Define target audience
3. Create outline (3-5 main sections)
4. Run skill: `/blog` — starts the pipeline
5. Tracker status becomes `draft`

**Example tracker entry created:**
```json
{
  "slug": "cohort-based-learning-enterprise",
  "title": "Cohort-Based Learning in Enterprise L&D",
  "author": "Your Name",
  "status": "draft",
  "dateCreated": "2026-04-27"
}
```

---

## Phase 2: Content Writing

**Goal:** Write comprehensive, engaging blog post (1,400-1,500 words)

**Skill used:** `/blog-writer`

**Output:** Draft blog post with sections, examples, citations

### Your Actions:

1. Run `/blog-writer` with topic and outline
2. AI generates draft content
3. Copy/paste into `[slug]/08-final-draft.md`
4. Manually review and edit for voice/tone
5. Ensure word count is 1,400-1,500 words
6. Update tracker status to `writing-in-progress`

**File created:** `[articleRoot]/[weekFolder]/Blog-1-[slug]/08-final-draft.md`

---

## Phase 3: Content Review & Editing

**Goal:** Refine content for clarity, accuracy, engagement

**Skill used:** `/blog-editor`

**Output:** Polished, publication-ready content

### Your Actions:

1. Run `/blog-editor` on the draft
2. Address feedback for:
   - Clarity and flow
   - Accuracy of claims/examples
   - Engagement and tone
   - Length (hit 1,400-1,500 words)
3. Update `08-final-draft.md` with edits
4. Update tracker status to `in-review`

---

## Phase 4: Create Interactive Components

**Goal:** Add visualizations, charts, interactive tools

**Skill used:** `/interactive-visuals`

**Output:** React components + specs

### Your Actions:

1. Identify 2-3 sections that need visuals
2. Run `/interactive-visuals` with section details
3. AI generates React component code and specs
4. Copy components to `09-interactive-visuals/`
5. Create `specs.md` listing components and placement
6. Test components render without errors

**Files created:**
- `09-interactive-visuals/completion-chart.tsx`
- `09-interactive-visuals/specs.md`
- etc.

---

## Phase 5: SEO Optimization

**Goal:** Optimize for search engines with metadata and keywords

**Skill used:** `/seo-agent`

**Output:** SEO specs, meta tags, social copy

### Your Actions:

1. Run `/seo-agent` on the blog
2. AI analyzes keyword opportunities and generates:
   - Meta description (155 chars)
   - Title tag (≤60 chars)
   - H1, H2 optimization
   - Internal/external link suggestions
3. Save to `10-seo-package.md`
4. Apply recommended changes to `08-final-draft.md` if needed

**File created:** `[articleRoot]/[weekFolder]/Blog-1-[slug]/10-seo-package.md`

---

## Phase 6: Publishing

**Goal:** Deploy blog to your live website

**Skill used:** `/publish-blog`

**Output:** Live article on your website

### Your Actions:

1. Ensure all files are in place:
   - `08-final-draft.md`
   - `10-seo-package.md`
   - `09-interactive-visuals/*.tsx` (all components)
   - `09-interactive-visuals/specs.md`
2. Update tracker status to `ready-to-publish`
3. Run `/publish-blog`
4. Skill automatically:
   - Clones your GitHub repo
   - Updates `articles.ts` with metadata
   - Adds markdown content to `articleContent.ts`
   - Registers components in `articleComponents.tsx`
   - Commits and pushes to GitHub
   - Triggers Vercel deployment
5. Tracker status becomes `published` + date added

**Result:** Article live at `https://[yoursite.com]/resources/[slug]`

---

## File Structure Created During Workflow

```
Articles Root/
└── Wo[Week][Dates]/
    └── Blog-1-[slug]/
        ├── 08-final-draft.md (1,400-1,500 words)
        ├── 10-seo-package.md (SEO specs)
        ├── 09-interactive-visuals/
        │   ├── specs.md (component metadata)
        │   ├── completion-rate-chart.tsx
        │   ├── learning-architecture-matrix.tsx
        │   └── [more .tsx files]
        └── thumbnail.jpg (optional, recommended)
```

---

## Tracker.json Status Flow

```
draft
  ↓ (after writing starts)
writing-in-progress
  ↓ (after review complete)
in-review
  ↓ (after SEO done)
ready-to-publish
  ↓ (after /publish-blog run)
published
```

---

## Tips & Best Practices

### Content Writing
- Write for your audience, not search engines
- Use specific examples and case studies
- Include actionable takeaways
- Aim for 1,400-1,500 words naturally

### Interactive Components
- Keep to 2-3 per article (not too crowded)
- Make them add value, not just decoration
- Ensure they load fast (minimal dependencies)
- Test on mobile before publishing

### SEO
- Use primary keyword in title and H1
- Meta description should be compelling (people click it)
- Internal links should be contextual
- Don't keyword-stuff

### Republishing Changes
- If you need to update after publishing, edit the GitHub files directly in your repo
- Do NOT use `/publish-blog` again (it creates a new entry)
- Update tracker.json manually to note update date

---

## Common Issues

**Q: Tracker entry not found**
A: Make sure `config.json` has correct `trackerPath`

**Q: Components not rendering on live site**
A: Check for unescaped backticks or `${` in TSX files

**Q: Vercel deployment takes forever**
A: Check Vercel dashboard for build errors; may have syntax issues

**Q: GitHub token keeps expiring**
A: Generate new token with `repo` scope, update `GITHUB_TOKEN` env var
