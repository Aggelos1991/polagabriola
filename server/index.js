import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 API MUST COME FIRST
import apiRouter from "./api/index.js";
app.use("/api", apiRouter);

// 👉 Serve static
app.use(express.static(path.join(__dirname, "..", "dist")));

// 👉 SPA fallback ONLY AFTER API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// Render port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
