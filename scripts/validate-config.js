const { loadConfig, validateConfig } = require('./constants');
const fs = require('fs');
const path = require('path');

function validateFiles(config) {
  console.log('\n📂 Checking files and folders...\n');

  const trackerPath = config.blogStructure.trackerPath;
  if (!fs.existsSync(trackerPath)) {
    console.error(`❌ Tracker file not found: ${trackerPath}`);
    return false;
  }
  console.log(`✅ Tracker: ${trackerPath}`);

  const articlesPath = config.blogStructure.articlesRootPath;
  if (!fs.existsSync(articlesPath)) {
    console.error(`❌ Articles folder not found: ${articlesPath}`);
    return false;
  }
  console.log(`✅ Articles folder: ${articlesPath}`);

  return true;
}

try {
  console.log('\n🔍 Validating configuration...\n');
  const config = loadConfig();

  console.log('✅ config.json found and valid');
  console.log(`   Site: ${config.site.name}`);
  console.log(`   Domain: ${config.site.domain}`);
  console.log(`   Repo: ${config.github.owner}/${config.github.repo}`);
  console.log(`   Authors: ${config.authors.length} configured`);

  const filesOk = validateFiles(config);

  if (filesOk) {
    console.log('\n✅ All validation checks passed!\n');
    process.exit(0);
  } else {
    console.log('\n❌ Some checks failed\n');
    process.exit(1);
  }
} catch (err) {
  console.error(`❌ Validation failed: ${err.message}\n`);
  process.exit(1);
}
