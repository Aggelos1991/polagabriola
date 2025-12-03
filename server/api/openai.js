import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Return ONLY the caption text." },
        { role: "user", content: prompt }
      ],
      max_tokens: 80
    });

    res.json({ text: completion.choices[0].message.content });
  } catch (err) {
    console.error("OPENAI ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
