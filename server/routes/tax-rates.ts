import { Router, Request, Response } from 'express';
import db from '../database.js';

const router = Router();

// Get all tax rates
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  let query = 'SELECT * FROM tax_rates';
  const params: any[] = [];
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  query += ' ORDER BY category, sub_category';
  const items = db.prepare(query).all(...params);
  res.json(items);
});

// Get rate categories
router.get('/categories', (req: Request, res: Response) => {
  const cats = db.prepare('SELECT DISTINCT category FROM tax_rates ORDER BY category').all();
  res.json(cats);
});

export default router;
