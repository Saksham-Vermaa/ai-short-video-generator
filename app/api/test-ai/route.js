import { generateScript } from "@/lib/gemini";

export async function GET() {
  try {
    const script = await generateScript("facts about black holes");
    return Response.json(script);
  } catch (error) {
    console.error("Gemini error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
