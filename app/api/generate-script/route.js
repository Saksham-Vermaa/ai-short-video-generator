import { getOrCreateUser } from "@/lib/user";
import { generateScript } from "@/lib/gemini";
import { db } from "@/db";
import { videos } from "@/db/schema";

export async function POST(request) {
  try {
    // 1. Who is asking? Only logged-in users can generate.
    const user = await getOrCreateUser();
    if (!user) {
      return Response.json({ error: "Please sign in first" }, { status: 401 });
    }

    // 2. Read the topic the user typed
    const { topic } = await request.json();
    if (!topic || topic.trim().length < 3 || topic.length > 200) {
      return Response.json(
        { error: "Topic must be between 3 and 200 characters" },
        { status: 400 },
      );
    }

    // 3. No credits? Stop before spending money on AI.
    if (user.credits < 1) {
      return Response.json({ error: "You have no credits left" }, { status: 403 });
    }

    // 4. Ask Gemini for the script
    const script = await generateScript(topic.trim());

    // 5. Save it as a new video row, so it isn't lost
    const [video] = await db
      .insert(videos)
      .values({
        userId: user.id,
        topic: topic.trim(),
        title: script.title,
        scenes: script.scenes,
      })
      .returning();

    return Response.json({ id: video.id, ...script });
  } catch (error) {
    console.error("Generate script error:", error);
    return Response.json({ error: "Could not generate script. Please try again." }, { status: 500 });
  }
}
