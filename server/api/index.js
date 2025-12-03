import { Router } from "express";
import openaiHandler from "./openai.js";
import storyHandler from "./story.js";

const router = Router();

// route for /api/openai
router.post("/openai", openaiHandler);

// route for /api/story
router.post("/story", storyHandler);

export default router;
