import { fetchToolRecommendations } from './src/lib/claude.js';
import process from 'process';

// mock import.meta for node execution
globalThis.import = { meta: { env: { VITE_GEMINI_KEY: process.env.VITE_GEMINI_KEY } } };

async function test() {
  try {
    console.log("Testing fetchToolRecommendations with project description: 'A CRM app for small businesses'");
    const tools = await fetchToolRecommendations("A CRM app for small businesses");
    console.log("Success! Found", tools.length, "tools");
    console.log(tools[0]);
  } catch (err) {
    console.error("Test failed:");
    console.error(err);
  }
}

test();
