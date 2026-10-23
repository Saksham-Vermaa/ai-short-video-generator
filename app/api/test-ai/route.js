import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: "Tell me one surprising fact about black holes in 2 sentences.",
    });

    return Response.json({ answer: response.text });
  } catch (error) {
    console.error("Gemini error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
