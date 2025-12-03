import express from "express";
import openaiRoute from "./openai.js";
import storyRoute from "./story.js";

const router = express.Router();

router.use("/openai", openaiRoute);
router.use("/story", storyRoute);

export default router;
