import express from "express";
import multer from "multer";
import { analyzeImage } from "../controllers/analyze.controller.js";

const router = express.Router();

// store uploaded files
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), analyzeImage);

export default router;