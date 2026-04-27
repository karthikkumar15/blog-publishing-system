# Blog Publishing System

A complete, AI-powered blog publishing pipeline for creating, reviewing, and deploying high-quality technical content to your website.

**Status:** Production-ready | **License:** MIT | **Last Updated:** April 27, 2026

---

## 🎯 Quick Overview

This system automates the entire blog creation workflow:

```
Plan → Research → Write → Review → Interactive → SEO → Publish
```

Each blog goes from idea to live website through a structured 6-phase pipeline with AI assistance.

---

## ✨ Features

- **Interactive Setup** — Configure once, no hardcoded values
- **AI-Assisted Content** — Generate drafts, optimize SEO, create components
- **Auto-Deployment** — GitHub → Vercel pipeline
- **Interactive Components** — React-based charts and visualizations
- **SEO Optimization** — Automatic meta tags, keyword research
- **Content Tracking** — Monitor each blog through the pipeline
- **Team Collaboration** — Reviews, feedback, version control

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- GitHub account (for code repository)
- Vercel account (for deployment)
- [GITHUB_TOKEN](docs/api-setup.md) with `repo` scope

### 1. Clone This Repository
```bash
git clone https://github.com/karthikkumar15/blog-publishing-system
cd blog-publishing-system
npm install
```

### 2. Initial Setup
```bash
npm run init
```

This interactive wizard will ask for:
- Your site name and domain
- GitHub organization/username
- Vercel project name
- Author information
- Paths to your article folders

**Output:** `config.json` with all your settings

### 3. Configure Credentials
```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### 4. Verify Everything Works
```bash
npm run validate   # Check config and files
npm run check-token # Verify GitHub access
```

---

## 📚 Complete Documentation

- **[SETUP.md](SETUP.md)** — First-time setup guide
- **[docs/workflow.md](docs/workflow.md)** — The 6-phase blog creation process
- **[docs/api-setup.md](docs/api-setup.md)** — GitHub & Vercel token setup
- **[docs/customization.md](docs/customization.md)** — How to extend the system

---

## 🔄 The Blog Publishing Workflow

### Phase 1: Planning & Research
**Tool:** `/blog` or `/topic-proposer`  
Research topic, define audience, create outline, start tracking

### Phase 2: Content Writing
**Tool:** `/blog-writer`  
AI generates 1,400-1,500 word draft, you refine for voice/tone

### Phase 3: Content Review & Editing
**Tool:** `/blog-editor`  
Feedback on clarity, accuracy, engagement; polish final draft

### Phase 4: Interactive Components
**Tool:** `/interactive-visuals`  
Generate React charts and interactive tools (2-3 per article)

### Phase 5: SEO Optimization
**Tool:** `/seo-agent`  
Generate title, meta description, keyword recommendations

### Phase 6: Publishing
**Command:** `/publish-blog`  
Auto-commits to GitHub, deploys to Vercel, updates tracking

**Result:** Live at your website

---

## 📋 Configuration

### Your Settings (in `config.json`)

```json
{
  "site": {
    "name": "",
    "domain": "yourdomain.com",
    "baseUrl": "https://yourdomain.com",
    "description": "Your Description"
  },
  "github": {
    "owner": "USERID",
    "repo": "REPO_NAME",
    "branch": "main"
  },
  "deployment": {
    "platform": "vercel",
    "projectName": "PROJECT_NAME"
  },
  "authors": [
    { "name": "Author1", "slug": "author1", "avatar": "..." },
    { "name": "Author2", "slug": "author2", "avatar": "..." }
  ]
}
```

> **Note:** `config.json` is `.gitignored` — never commit credentials or sensitive paths

---

## 🛠️ Available Commands

```bash
npm run init          # Interactive setup wizard
npm run validate      # Verify config & files
npm run check-token   # Test GitHub token
```

---

## 📂 Your Blog Folder Structure

```
Articles/
└── Wo[Week]/
    └── Blog-1-[slug]/
        ├── 08-final-draft.md          # Final blog (1,400-1,500 words)
        ├── 10-seo-package.md          # SEO specs & meta tags
        ├── 09-interactive-visuals/
        │   ├── specs.md               # Component placement & names
        │   ├── completion-chart.tsx   # React components
        │   └── ...
        └── thumbnail.jpg              # Optional hero image
```

---

## 📊 Blog Status Tracking

Each blog flows through these statuses (in `tracker.json`):

```
draft → writing-in-progress → in-review → ready-to-publish → published
```

---

## 🤝 Contributing

We welcome contributions! See [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) for:
- How to report bugs
- How to submit features
- Code style guidelines
- Testing before PR submission

---

## 🐛 Troubleshooting

### Config not found
```bash
npm run init
```

### GitHub token issues
Generate a new token at https://github.com/settings/tokens with `repo` scope

### Components not rendering
Check for unescaped backticks in TSX files (escape as `\``)

### Vercel deployment stuck
Check dashboard: https://vercel.com/dashboard

---

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Slack notifications on publish
- [ ] Content scheduling
- [ ] Auto social media posting
- [ ] Analytics dashboard
- [ ] Newsletter integration
- [ ] Comment management

---

## 📞 Support & Contact

**Issues?** [GitHub Issues](https://github.com/karthikkumar15/blog-publishing-system/issues)

**Questions?** Check the [docs/](docs/) folder or create a discussion

**Team Contact:** [Add team contact info here]

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| [Your Name] | Lead | [@username](https://github.com/username) |
| [Add team members] | | |

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

Built with:
- Claude AI for content assistance
- Vercel for deployment
- React for interactive components
- GitHub for version control

---

**Last Updated:** April 27, 2026   
**Status:** ✅ Active & Production Ready
