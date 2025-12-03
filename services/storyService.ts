export const generatePhotoStory = async (topic: string): Promise<string> => {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "write a dreamy nostalgic caption max 50 words, lowercase."
          },
          { role: "user", content: topic }
        ]
      })
    });

    const data = await response.json();

    // ✅ CORRECT FIELD FOR OPENAI RESPONSE
    const caption = data?.choices?.[0]?.message?.content;

    if (caption) return caption;

    return "a faint memory...";
  } catch (err) {
    console.error("STORY GENERATION ERROR:", err);
    return "the memory is too hazy right now.";
  }
};