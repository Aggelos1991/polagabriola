export const generatePhotoStory = async (topic: string): Promise<string> => {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "write a dreamy nostalgic caption max 50 words, lowercase." },
          { role: "user", content: topic }
        ]
      })
    });

    const data = await response.json();

    // 🔥 LAST TIME THIS WAS THE FIX 🔥
    const text =
      data?.choices?.[0]?.message?.content?.trim() ||
      data?.story ||
      data?.response ||
      null;

    if (text) return text;

    return "the memory is too hazy right now.";
  } catch (err) {
    console.error("STORY GENERATION ERROR:", err);
    return "the memory is too hazy right now.";
  }
};
