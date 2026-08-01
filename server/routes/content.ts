import { Router, Request, Response } from 'express';
import db from '../database.js';

const router = Router();

// Get page by slug
router.get('/:slug', (req: Request, res: Response) => {
  const page = db.prepare('SELECT * FROM content_pages WHERE slug = ?').get(req.params.slug);
  if (!page) return res.status(404).json({ error: 'Not found' });
  res.json(page);
});

// List all pages
router.get('/', (req: Request, res: Response) => {
  const pages = db.prepare('SELECT slug, title, category, updated_at FROM content_pages ORDER BY category, title').all();
  res.json(pages);
});

export default router;
