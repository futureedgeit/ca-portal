import { getUpcomingDeadlines } from '../../src/data/calendar.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, priority, limit = 6 } = req.query || {};

  let upcoming = getUpcomingDeadlines();

  if (category && category !== 'All') {
    upcoming = upcoming.filter((e: any) => e.category.toLowerCase() === String(category).toLowerCase());
  }

  if (priority && priority !== 'All') {
    upcoming = upcoming.filter((e: any) => e.priority.toLowerCase() === String(priority).toLowerCase());
  }

  const numLimit = Number(limit) || 6;
  return res.status(200).json(upcoming.slice(0, numLimit));
}
