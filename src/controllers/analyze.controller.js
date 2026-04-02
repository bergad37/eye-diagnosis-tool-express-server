import fs from "fs";
import { sendToAI } from "../services/ai.service.js";

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await sendToAI(req.file.path);

    // Delete uploaded file after sending to AI
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI processing failed" });
  }
};