# First-Time Setup

## Prerequisites

- Node.js 16+
- GitHub account with a repository for your blog content
- Vercel account (or alternative deployment platform)

## Step 1: Clone This Repository

Replace `your-fork` with your GitHub username or organization name.

```bash
git clone https://github.com/your-fork/blog-publishing-system.git
cd blog-publishing-system
npm install
```

## Step 2: Run Interactive Setup

```bash
npm run init
```

This will prompt you for:
- Site name and domain
- GitHub username/org and repository name
- Vercel project name
- Path to your tracker.json
- Path to your articles folder
- Author information

**Output:** Creates `config.json` in the root directory.

## Step 3: Configure Credentials

### GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it "Blog Publishing System"
4. Select scopes: `repo` (full control of private repositories)
5. Copy the token

Add to your environment:
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

Or add to `.env`:
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

**Important:** Add `.env` to your `.gitignore` file to prevent accidentally committing credentials:

```bash
echo ".env" >> .gitignore
```

### Vercel Token (Optional - auto-deploys if configured)

1. Go to https://vercel.com/account/tokens
2. Create new token
3. Add to environment: `export VERCEL_TOKEN=...`

## Step 4: Verify Setup

```bash
npm run validate
```

This command verifies:
- config.json exists and is valid
- Required blog structure files are present (`08-final-draft.md`, `10-seo-package.md`, `09-interactive-visuals/specs.md`)
- GitHub token has required permissions

## Step 5: You're Ready!

See [docs/workflow.md](docs/workflow.md) for the full blog publishing process.
