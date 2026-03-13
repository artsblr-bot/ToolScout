import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf-8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function testFetch() {
  console.log("Testing gemini-2.5-flash-lite API...");
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello" }] }],
          generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
        }),
      }
    );
    console.log("Status:", response.status);
    console.log("Data:", await response.text());
  } catch (err) {
    console.error(err);
  }
}

testFetch();
