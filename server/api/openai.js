import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const { model, messages } = req.body;

    const completion = await client.chat.completions.create({
      model,
      messages,
      max_tokens: 80
    });

    res.json(completion);
  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "OpenAI backend error" });
  }
});

export default router;
