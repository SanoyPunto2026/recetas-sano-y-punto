const fs = require('fs');
const https = require('https');

// Parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/banco_recetas?select=*&limit=5`;
const apiKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const options = {
  headers: {
    'apikey': apiKey,
    'Authorization': `Bearer ${apiKey}`
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if(json.length > 0) {
      console.log("COLUMNS:", Object.keys(json[0]));
      console.log("VALUES (First item):", JSON.stringify(json[0], null, 2));
    } else {
      console.log("No data returned");
    }
  });
}).on('error', err => {
  console.error("Error:", err);
});
