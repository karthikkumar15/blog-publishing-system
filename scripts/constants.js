const fs = require('fs');
const path = require('path');

function loadConfig() {
  const configPath = path.join(process.cwd(), 'config.json');

  if (!fs.existsSync(configPath)) {
    console.error('❌ config.json not found. Run: npm run init');
    process.exit(1);
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    validateConfig(config);
    return config;
  } catch (err) {
    console.error('❌ Error loading config:', err.message);
    process.exit(1);
  }
}

function validateConfig(config) {
  const required = [
    'site.name', 'site.domain', 'site.baseUrl', 'site.description',
    'github.owner', 'github.repo', 'github.branch',
    'deployment.platform', 'deployment.projectName',
    'blogStructure.trackerPath', 'blogStructure.articlesRootPath',
    'authors'
  ];

  for (const field of required) {
    const keys = field.split('.');
    let value = config;
    for (const key of keys) {
      value = value?.[key];
      if (!value) {
        throw new Error(`Missing required config: ${field}`);
      }
    }
  }

  if (!Array.isArray(config.authors) || config.authors.length === 0) {
    throw new Error('At least one author required in config');
  }
}

module.exports = { loadConfig, validateConfig };
