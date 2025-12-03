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

// 1️⃣ API FIRST
import apiRouter from "./api/index.js";
app.use("/api", apiRouter);

// 2️⃣ Serve static files from /dist
app.use(express.static(path.join(__dirname, "..", "dist")));

// 3️⃣ SPA fallback (Express 5 SAFE VERSION — NO "*")
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// 4️⃣ PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
