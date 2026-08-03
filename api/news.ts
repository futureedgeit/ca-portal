import { newsItems } from '../src/data/news.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, search, limit = 50 } = req.query || {};

  let items = newsItems.map((item, idx) => ({
    id: idx + 1,
    title: item.title,
    summary: item.summary,
    category: item.category,
    source: item.source || 'Official Circular',
    link: item.link || '',
    published_date: item.date || new Date().toISOString().split('T')[0],
    is_published: 1,
  }));

  if (category && category !== 'All') {
    items = items.filter(i => i.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
  }

  const numLimit = Number(limit) || 50;
  items = items.slice(0, numLimit);

  return res.status(200).json({
    items,
    total: items.length
  });
}
