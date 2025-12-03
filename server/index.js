import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resolve dirname because we are inside ESM module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 1. Serve React build from /dist
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// 👉 2. API Routes
import apiRouter from "./api/index.js";
app.use("/api", apiRouter);

// 👉 3. SPA fallback (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// 👉 4. PORT for Render
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
