import express from "express";
import dotenv from "dotenv";
import openaiRoute from "./api/openai.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/openai", openaiRoute);

app.listen(3001, () => {
  console.log("AI server running on http://localhost:3001");
});