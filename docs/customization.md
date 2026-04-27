# Customization Guide

This document explains how to adapt the system to your specific needs.

## Changing Article Metadata Fields

If you want to track different fields (e.g., reading level, tags, status), update:

### 1. `tracker.json` schema

Add new fields:
```json
{
  "slug": "...",
  "status": "...",
  "readingLevel": "intermediate",
  "tags": ["AI", "L&D"]
}
```

### 2. `src/data/articles.ts`

Update the Article interface:
```typescript
interface Article {
  slug: string;
  readingLevel?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  // ... existing fields
}
```

### 3. Publish skill

Update Step 7 to extract and insert new fields.

---

## Supporting Multiple Content Types

The system is designed for blog posts, but can support:
- Whitepapers
- Case studies
- Tutorials
- Video transcripts

Add to `config.json`:
```json
{
  "contentTypes": {
    "blog": { "folder": "blogs", "url": "/blog/" },
    "tutorial": { "folder": "tutorials", "url": "/tutorials/" },
    "case-study": { "folder": "cases", "url": "/cases/" }
  }
}
```

Then in the publish skill, read content type from tracker and adjust paths accordingly.

---

## Changing Repository Structure

If your blog repo uses a different folder layout, update `config.json`:

```json
{
  "github": {
    "contentPath": "content/data",
    "componentPath": "src/react/components",
    "deploymentsPath": "public"
  }
}
```

Update publish skill Step 5, 7, 8 to use these paths.

---

## Adding Automated Social Posting

After publishing, auto-post to social media:

1. Add to `config.json`:
```json
{
  "social": {
    "twitter": { "enabled": true, "accountId": "..." },
    "linkedin": { "enabled": true, "accountId": "..." }
  }
}
```

2. Create new skill `/publish-social` or add to `/publish-blog` Step 13

3. Use `10-seo-package.md` social copy section

---

## Extending Skills

Each skill can be extended. Example: Add `/publish-newsletter` to send new blog to email list.

Create `skills/publish-newsletter.md`:

```markdown
# Publish to Newsletter

Subscribe to this skill after `/publish-blog` to auto-send new posts.

1. Read published blog metadata
2. Load email template from `templates/newsletter.html`
3. Call email provider API (SendGrid, Mailchimp, etc.)
4. Send to `CONFIG.newsletter.listId`
```

Then add to `config.json`:
```json
{
  "newsletter": {
    "provider": "sendgrid",
    "listId": "...",
    "templateId": "..."
  }
}
```

---

## Changing Deployment Platform

Currently supports Vercel. To add AWS Amplify, Netlify, GitHub Pages:

1. Create `scripts/deploy-[platform].js`
2. Update publish skill to call the appropriate deployer based on `CONFIG.deployment.platform`
3. Implement build/deploy logic for that platform

Example for GitHub Pages:
```javascript
// scripts/deploy-gh-pages.js
function deployToGitHubPages(repoDir) {
  // Run: npm run build
  // Push dist/ to gh-pages branch
}
```

---

## Environment-Specific Config

Support dev/staging/production:

```bash
# config.dev.json
# config.staging.json
# config.production.json

npm run publish -- --env=production
```

Then in `scripts/constants.js`:
```javascript
const env = process.argv.find(a => a.includes('--env='))?.split('=')[1] || 'dev';
const configFile = `config.${env}.json`;
```
