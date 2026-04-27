const https = require('https');

function checkGitHubToken() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('❌ GITHUB_TOKEN not set');
    console.log('   Run: export GITHUB_TOKEN=ghp_xxxx');
    process.exit(1);
  }

  console.log(`✅ GITHUB_TOKEN detected (${token.slice(0, 10)}...)\n`);

  const options = {
    hostname: 'api.github.com',
    path: '/user',
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'Blog-Publishing-System'
    }
  };

  https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        const user = JSON.parse(data);
        console.log(`✅ GitHub token valid`);
        console.log(`   User: ${user.login}`);
        console.log(`   Name: ${user.name}`);
      } else {
        console.error(`❌ Token invalid (${res.statusCode})`);
        process.exit(1);
      }
    });
  }).on('error', (e) => {
    console.error(`❌ Network error: ${e.message}`);
    process.exit(1);
  }).end();
}

checkGitHubToken();
