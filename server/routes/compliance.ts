import { Router, Request, Response } from 'express';
import db from '../database.js';

const router = Router();

// Get all compliance dates
router.get('/', (req: Request, res: Response) => {
  const { month, category, priority } = req.query;
  let query = 'SELECT * FROM compliance_dates WHERE 1=1';
  const params: any[] = [];

  if (month && month !== 'All') { query += ' AND month = ?'; params.push(month); }
  if (category && category !== 'All') { query += ' AND category = ?'; params.push(category); }
  if (priority && priority !== 'All') { query += ' AND priority = ?'; params.push(priority); }

  query += " ORDER BY CASE month WHEN 'July' THEN 1 WHEN 'August' THEN 2 WHEN 'September' THEN 3 WHEN 'October' THEN 4 WHEN 'November' THEN 5 WHEN 'December' THEN 6 WHEN 'January' THEN 7 WHEN 'February' THEN 8 WHEN 'March' THEN 9 END, day";

  const items = db.prepare(query).all(...params);
  res.json(items);
});

// Get upcoming deadlines (next 7)
router.get('/upcoming', (req: Request, res: Response) => {
  const items = db.prepare(
    "SELECT * FROM compliance_dates ORDER BY CASE month WHEN 'July' THEN 1 WHEN 'August' THEN 2 WHEN 'September' THEN 3 WHEN 'October' THEN 4 WHEN 'November' THEN 5 WHEN 'December' THEN 6 WHEN 'January' THEN 7 WHEN 'February' THEN 8 WHEN 'March' THEN 9 END, day LIMIT 7"
  ).all();
  res.json(items);
});

export default router;
