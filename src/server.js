import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'https://www.artopt.io'
  })
);
app.use(express.json());

// API prefix
app.use('/api/analyze', analyzeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
