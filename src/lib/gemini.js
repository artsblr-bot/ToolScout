export async function fetchToolRecommendations(projectDescription) {
  const apiKey = import.meta.env.VITE_GEMINI_KEY;

  if (!apiKey) {
    throw new Error("API key is not set. Please check your .env file.");
  }

  const prompt = `You are ToolScout, an elite software architect and AI agent.
The user wants to build:
"${projectDescription}"

Deeply analyze this request to understand precisely what architecture and tools are required.
Search the web for the absolute best, most modern, and EASIEST to use tools to build this specific project in current-year software development.

Your response MUST be a highly accurate JSON object strictly following this structure:
{
  "tools": [
    // Array of exactly 10-15 tool objects.
    // Each MUST have these keys:
    // "name": The exact tool name.
    // "category": Choose one of (Frontend, Backend, AI, Database, Hosting, Design, APIs).
    // "description": One concise line describing it (max 10 words).
    // "url": The official website URL.
    // "free_tier": true or false.
    // "rating": Number between 1-5.
    // "best_for": One sentence explaining EXACTLY why it is perfect for this project.
  ],
  "build_guide": {
    "estimated_time": "e.g., 2 hours, 10 minutes",
    "difficulty": "Beginner, Intermediate, or Advanced",
    "steps": [
      // Array of steps in chronological order. Each step MUST have:
      // "order": Number (1, 2, 3...)
      // "tool": Name of the tool to use for this step.
      // "instruction": A comprehensive, detailed paragraph (3-5 sentences) explaining EXACTLY what to do, how to use the tool, best practices, and the expected outcome. It must act as an educational mini-tutorial.
    ]
  }
}

Return strictly the raw JSON object. Do not wrap in markdown or add conversational text.`;

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    tools: [{ googleSearch: {} }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  async function callGemini(modelName) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw { status: response.status, message: `API error: ${response.status}` };
    }

    const data = await response.json();
    
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error("Invalid response format from Gemini");
    }

    let cleanedText = textContent.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.slice(0, -3);
    }

    return JSON.parse(cleanedText.trim());
  }

  async function callGroq() {
    const groqApiKey = import.meta.env.VITE_GROQ_KEY;
    
    if (!groqApiKey) {
      throw new Error("Groq API key is not set. Please check your .env file.");
    }
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw { status: response.status, message: `Groq API error: ${response.status}` };
    }

    const data = await response.json();
    const textContent = data.choices?.[0]?.message?.content;

    if (!textContent) {
      throw new Error("Invalid response format from Groq");
    }

    return JSON.parse(textContent.trim());
  }

  try {
    // 1. Try gemini-2.5-flash first
    return await callGemini("gemini-2.5-flash");
  } catch (error) {
    // 2. If rate limited (error 429) fallback to gemini-2.5-flash-lite
    if (error.status === 429) {
      console.warn("gemini-2.5-flash rate limited (429). Falling back to gemini-2.5-flash-lite...");
      try {
        return await callGemini("gemini-2.5-flash-lite");
      } catch (fallbackError) {
        console.warn("gemini-2.5-flash-lite also failed. Silently falling back to Groq API (llama-3.1-8b-instant)...");
        try {
          return await callGroq();
        } catch (groqError) {
          console.error("Groq fallback also failed:", groqError);
          throw new Error("Taking a short break, try again in a minute");
        }
      }
    } else {
      console.warn("Gemini API error. Silently falling back to Groq API (llama-3.1-8b-instant)...");
      try {
        return await callGroq();
      } catch (groqError) {
        console.error("Groq fallback also failed:", groqError);
        throw new Error("Taking a short break, try again in a minute");
      }
    }
  }
}
