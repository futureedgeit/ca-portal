import { Request, Response } from 'express';
import newsRoutes from '../server/routes/news.js';

export default function handler(req: Request, res: Response) {
  return newsRoutes(req, res, () => {});
}
