import { complianceEvents } from '../src/data/calendar.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { month, category, priority } = req.query || {};

  let events = complianceEvents;

  if (month && month !== 'All') {
    events = events.filter(e => e.month.toLowerCase() === String(month).toLowerCase());
  }

  if (category && category !== 'All') {
    events = events.filter(e => e.category.toLowerCase() === String(category).toLowerCase());
  }

  if (priority && priority !== 'All') {
    events = events.filter(e => e.priority.toLowerCase() === String(priority).toLowerCase());
  }

  return res.status(200).json(events);
}
