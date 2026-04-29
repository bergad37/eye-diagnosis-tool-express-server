import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.route.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ['https://www.artopt.io'],
  })
);
app.use(express.json());

// Ensure upload dir exists for multer disk storage
fs.mkdirSync(path.resolve('uploads'), { recursive: true });

// API prefix
app.use('/api/analyze', analyzeRouter);
// Backwards-compatible path (some clients call /predict)
app.use('/predict', analyzeRouter);

app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
