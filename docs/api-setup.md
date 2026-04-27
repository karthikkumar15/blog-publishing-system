# API Setup & Credentials

This guide helps you set up the required API credentials.

## GitHub Token (Required)

The publish skill needs GitHub API access to push code to your repository.

### Create GitHub Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Configure:
   - Token name: `Blog Publishing System`
   - Expiration: 90 days (or No expiration)
   - Scopes: Check only `repo` (full control of private repositories)
4. Click **Generate token**
5. **Copy the token immediately** (you won't see it again)

### Add to Environment

**Option 1: Shell export (temporary)**
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxx
```

**Option 2: .env file (persistent)**
```bash
# Create .env in repo root
echo "GITHUB_TOKEN=ghp_xxxxxxxxxxxxxx" >> .env
```

**Option 3: Claude Code settings (persistent)**
In Claude Code settings, under "Environment variables," add:
```
GITHUB_TOKEN = ghp_xxxxxxxxxxxxxx
```

### Verify Token Works

```bash
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

You should see your GitHub user info (not a 401 error).

---

## Vercel Token (Optional, Recommended)

Vercel auto-triggers deploys when you push to the GitHub repo. This token just speeds up the process.

### Create Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **Create**
3. Configure:
   - Token name: `Blog Publishing`
   - Expiration: 7 days or unlimited
4. Copy the token

### Add to Environment

```bash
export VERCEL_TOKEN=vercel_xxxxxxxxxxxxxx
```

---

## Testing Credentials

```bash
# Test GitHub
npm run check-token

# Test full setup
npm run validate
```

Both should show green checkmarks.

---

## Token Rotation & Security

- **Rotate every 90 days** (use expiration feature)
- **Don't commit tokens to git** (.env is .gitignored)
- **Never share tokens** via email/chat
- **Revoke old tokens** at github.com/settings/tokens after creating new ones
