import fs from 'fs';
// Read API key manually
const envContent = fs.readFileSync('.env', 'utf-8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

// Mock the Vite import meta
globalThis.import = { meta: { env: { VITE_GEMINI_KEY: apiKey } } };

import { fetchToolRecommendations } from './src/lib/claude.js';

async function testFetch() {
  try {
    console.log("Fetching tools for 'A voice AI browser extension'...");
    const tools = await fetchToolRecommendations("A voice AI browser extension");
    console.log("Success! Extracted JSON Tools. Count:", tools.length);
    console.log("First item sample:", JSON.stringify(tools[0], null, 2));
  } catch (error) {
    console.error("Test execution failed.");
    console.error(error);
  }
}

testFetch();
