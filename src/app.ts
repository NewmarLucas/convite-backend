import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './router';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
});

export default app;
