import { Router, Request, Response } from 'express';
import db from '../database.js';

const router = Router();

// Clean XML/HTML and garbage from text
function cleanText(text: string): string {
  if (!text) return '';
  let cleaned = text
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    // Remove Google News base64 article IDs (long alphanumeric strings)
    .replace(/\bCBM[a-zA-Z0-9_=-]{20,}\b/g, '')
    .replace(/\b[A-Z]{3,4}[a-zA-Z0-9_=-]{30,}\b/g, '')
    // Remove GMT timestamps
    .replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+GMT\b/g, '')
    // Remove URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove isPermaLink and guid attributes
    .replace(/\bisPermaLink\s*=\s*"?(?:true|false)"?/gi, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Remove duplicate source name at end (e.g., "CAclubindia CAclubindia")
  const words = cleaned.split(' ');
  if (words.length > 2 && words[words.length - 1] === words[words.length - 2]) {
    words.pop();
    cleaned = words.join(' ');
  }

  return cleaned;
}

// Clean articles that still have garbage in title or summary
export function cleanAllArticles(): number {
  const bad = db.prepare(
    "SELECT id, title, summary FROM news WHERE " +
    "summary LIKE '%<link>%' OR summary LIKE '%<pubDate%' OR summary LIKE '%<guid%' OR " +
    "summary LIKE '% CBM%' OR summary LIKE '%isPermaLink%' OR " +
    "summary LIKE '% GMT %' OR summary LIKE '%</title>%' OR title LIKE '%</title>%'"
  ).all() as any[];

  let fixed = 0;
  for (const a of bad) {
    const cleanTitle = cleanText(a.title);
    const cleanSummary = cleanText(a.summary);

    const finalTitle = cleanTitle.replace(/\s*-\s*\S+$/, '').trim();
    const finalSummary = cleanSummary.length > 10 ? cleanSummary : finalTitle;

    db.prepare('UPDATE news SET title = ?, summary = ? WHERE id = ?').run(
      finalTitle, finalSummary, a.id
    );
    fixed++;
  }
  if (fixed > 0) console.log(`[CLEAN] Fixed ${fixed} articles with raw XML`);
  return fixed;
}

// Clean items as they're served
function cleanItem(item: any) {
  return {
    ...item,
    title: cleanText(item.title).replace(/\s*-\s*\S+$/, '').trim(),
    summary: cleanText(item.summary) || cleanText(item.title).replace(/\s*-\s*\S+$/, '').trim(),
  };
}

// Get all news (with optional filters)
router.get('/', (req: Request, res: Response) => {
  const { category, search, limit = 20, offset = 0 } = req.query;
  let query = 'SELECT * FROM news WHERE is_published = 1';
  const params: any[] = [];

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }
  if (search) {
    query += ' AND (title LIKE ? OR summary LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY published_date DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  const items = db.prepare(query).all(...params) as any[];
  const total = db.prepare('SELECT COUNT(*) as count FROM news WHERE is_published = 1').get() as { count: number };

  res.json({ items: items.map(cleanItem), total: total ? total.count : 0 });
});

// Get categories with counts
router.get('/categories', (req: Request, res: Response) => {
  const cats = db.prepare(
    'SELECT category, COUNT(*) as count FROM news WHERE is_published = 1 GROUP BY category ORDER BY count DESC'
  ).all();
  res.json(cats);
});

// Get single news item
router.get('/:id', (req: Request, res: Response) => {
  const item = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(cleanItem(item));
});

export default router;
