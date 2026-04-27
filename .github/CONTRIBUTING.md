# Contributing

We welcome contributions! Here's how to help:

## For Bug Reports

1. Check [existing issues](../../issues)
2. If your bug is new, create a new issue with:
   - Exact error message
   - Steps to reproduce
   - Your `config.json` structure (remove sensitive data)

## For Feature Requests

1. Open an issue describing the feature
2. Explain the use case
3. If you can implement it, submit a PR!

## For Code Contributions

1. Fork this repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and test locally: `npm run validate`
4. Commit with clear message: `git commit -m "feat: add X"`
5. Push and open a PR

## Code Style

- Use `const` over `let`
- No `var`
- Clear variable names
- Comments for non-obvious logic

## Testing Your Changes

Before submitting PR:
1. `npm run validate` should pass
2. `npm run check-token` should pass
3. Test on your own blog repo if possible

## Questions?

Create a discussion or ask in an issue!

Thank you for contributing 🎉
