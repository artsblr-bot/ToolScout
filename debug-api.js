import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf-8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

// Mock Vite
globalThis.import = { meta: { env: { VITE_GEMINI_KEY: apiKey } } };

import { fetchToolRecommendations } from './src/lib/gemini.js';

async function test() {
  try {
    console.log("Fetching tool recommendations for: 'a personal finance tracker'...");
    const data = await fetchToolRecommendations("a personal finance tracker");
    console.log("Success! Data received:");
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed:");
    console.error(err);
  }
}

test();
