import express from "express";
import openaiRouter from "./openai.js";
import storyRouter from "./story.js";

const router = express.Router();

// /api/openai
router.use("/openai", openaiRouter);

// /api/story
router.use("/story", storyRouter);

export default router;
