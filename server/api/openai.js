import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { model, messages } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 80
      })
    });

    const data = await completion.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ error: "Oracle failed", details: err.message });
  }
});

export default router;