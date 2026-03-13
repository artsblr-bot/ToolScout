import fs from 'fs';

// Read API key manually
const envContent = fs.readFileSync('.env', 'utf-8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function testFetch() {
  const prompt = `You are ToolScout. The user wants to build: \nA voice AI browser extension. Return a JSON array of 10-15 \nbest free tools. Each tool must have:\nname, category, description, url, \nfree_tier (true/false), rating (1-5), \nbest_for. Categories: Frontend, Backend, \nAI, Database, Hosting, Design, APIs.\nReturn ONLY the JSON array, nothing else.`;

  console.log("Using API Key:", apiKey ? apiKey.substring(0, 10) + "..." : "NONE");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    console.log("Status:", response.status, response.statusText);
    const textData = await response.text();
    console.log("Raw Response body:");
    console.log(textData);

  } catch (error) {
    console.error("Test execution failed.");
    console.error(error);
  }
}

testFetch();
