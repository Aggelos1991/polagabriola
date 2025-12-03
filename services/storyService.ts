export const generatePhotoStory = async (topic: string): Promise<string> => {
  try {
    const res = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: topic })   // 🔥 THIS WAS THE FIX
    });

    const data = await res.json();

    // backend returns: { success: true, story: "..." }
    if (data?.story) return data.story.trim();

    return "the memory is too hazy right now.";
  } catch (err) {
    console.error("STORY GENERATION ERROR:", err);
    return "the memory is too hazy right now.";
  }
};
