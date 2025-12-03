import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiPrompt = `
Write a short, nostalgic, artistic caption (max 50 words) for a polaroid photo of "${prompt}".
Tone:
- dreamy
- emotional
- diary-like
- lowercase aesthetic
no hashtags. 
Return ONLY the caption text.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Return ONLY the caption text." },
        { role: "user", content: aiPrompt },
      ],
      temperature: 0.9,
    });

    const story = completion.choices[0].message.content;

    res.json({ success: true, story });
  } catch (error) {
    console.error("❌ OpenAI backend error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate story",
    });
  }
});

export default router;