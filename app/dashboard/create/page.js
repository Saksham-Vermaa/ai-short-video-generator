"use client";

import { useState } from "react";

export default function CreateVideo() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setScript(null);

    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setScript(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Create a video 🎬</h1>
      <p className="text-gray-400 mt-2">Type a topic and AI will write the script.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. facts about black holes"
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black font-semibold rounded-lg px-5 py-2 disabled:opacity-50 flex items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? "Writing..." : "Generate"}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {loading && (
        <div className="mt-8 space-y-3 animate-pulse">
          <p className="text-gray-400">✍️ AI is writing your script... this takes a few seconds</p>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-20 bg-gray-800 rounded-xl" />
          ))}
        </div>
      )}

      {script && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">{script.title}</h2>
          <ol className="mt-4 space-y-3">
            {script.scenes.map((scene, index) => (
              <li key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-400">Scene {index + 1}</p>
                <p className="mt-1">{scene.text}</p>
                <p className="text-sm text-gray-500 mt-2">🖼️ {scene.imageQuery}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}
