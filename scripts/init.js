const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function runSetup() {
  console.log('\n🚀 Blog Publishing System Setup\n');

  const config = {
    site: {},
    github: {},
    deployment: {},
    blogStructure: { requiredFiles: [
      '08-final-draft.md',
      '10-seo-package.md',
      '09-interactive-visuals/specs.md'
    ] },
    authors: []
  };

  // Site info
  config.site.name = await question('📝 Site name (e.g., "TechAcademy"): ');
  config.site.domain = await question('🌐 Site domain (e.g., "techacademy.com"): ');
  config.site.baseUrl = await question('🔗 Base URL (e.g., "https://techacademy.com"): ');
  config.site.description = await question('📄 Site description: ');

  // GitHub info
  config.github.owner = await question('👤 GitHub username/org: ');
  config.github.repo = await question('📦 Repository name (e.g., "blog"): ');
  config.github.branch = await question('🌳 Default branch (e.g., "main"): ') || 'main';
  config.github.contentPath = 'src/data';
  config.github.componentPath = 'src/components/articles';

  // Deployment
  config.deployment.platform = 'vercel';
  config.deployment.projectName = await question('⚡ Vercel project name: ');

  // Blog structure
  config.blogStructure.trackerPath = await question('📋 Path to tracker.json (full path): ');
  config.blogStructure.articlesRootPath = await question('📁 Articles root folder (full path): ');

  // Authors
  console.log('\n👥 Add authors (enter blank name to finish):');
  let authorCount = 1;
  while (true) {
    const name = await question(`Author ${authorCount} name (or press Enter to finish): `);
    if (!name.trim()) break;

    const avatar = await question('Avatar URL: ');
    config.authors.push({
      id: `author-${authorCount}`,
      name: name.trim(),
      slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
      avatar: avatar.trim()
    });
    authorCount++;
  }

  // Save config
  const configPath = path.join(process.cwd(), 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  rl.close();

  console.log(`\n✅ Configuration saved to config.json`);
  console.log(`\nNext steps:`);
  console.log(`1. Set your GITHUB_TOKEN: export GITHUB_TOKEN=ghp_xxxx`);
  console.log(`2. Review config.json and adjust if needed`);
  console.log(`3. Run: npm run publish\n`);
}

runSetup().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
