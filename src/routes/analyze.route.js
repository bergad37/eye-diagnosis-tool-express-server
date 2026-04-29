import express from "express";
import multer from "multer";
import { analyzeImage } from "../controllers/analyze.controller.js";

const router = express.Router();

// store uploaded files
const upload = multer({
  dest: "uploads/",
  limits: {
    // Keep reasonable default; Render free instances struggle with huge bodies.
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith("image/")) {
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "image"));
    }
    cb(null, true);
  },
});

router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (!err) return next();

    // Multer errors → 400 so the client won't keep retrying.
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ error: "Image too large (max 10MB)" });
      }
      return res.status(400).json({ error: "Invalid image upload" });
    }

    next(err);
  });
}, analyzeImage);

export default router;