import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const scriptSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    scenes: {
      type: "array",
      minItems: 6,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          text: { type: "string" },
          imageQuery: { type: "string" },
        },
        required: ["text", "imageQuery"],
      },
    },
  },
  required: ["title", "scenes"],
};

export async function generateScript(topic) {
  const prompt = `You are a scriptwriter for short vertical videos (YouTube Shorts, Instagram Reels).

Write a video script about: "${topic}"

Rules:
- "title" is a short, catchy title (under 8 words).
- Split the script into 6 to 8 scenes.
- Each scene shares a different interesting fact or idea. Do not repeat yourself.
- Each scene's "text" is the narration: 2 sentences, about 12 to 18 words, in simple spoken English.
- The whole script must be 80 to 110 words in total, so the video is about 30 to 40 seconds long when read aloud.
- Each scene's "imageQuery" is 2 to 4 words to search a stock photo website for a matching image.
- The first scene must hook the viewer so they keep watching.
- Only include facts you are confident are true.`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-lite-latest",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: scriptSchema,
    },
  });

  return JSON.parse(response.text);
}
