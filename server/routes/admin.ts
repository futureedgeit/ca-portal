import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../database.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'ca-portal-jwt-secret-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

// Ensure initial admin user exists in DB
function ensureAdminUser() {
  const admin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get('admin') as any;
  if (!admin) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)')
      .run('admin', hash, 'admin');
    console.log('[AUTH] Created default admin user (admin / admin123)');
  }
}
ensureAdminUser();

// JWT Auth middleware
export function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const legacyToken = req.headers['x-admin-token'];

  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (typeof legacyToken === 'string') {
    // legacy hardcoded token fallback
    if (legacyToken === 'ca-portal-admin-2026') {
      req.user = { id: 1, username: 'admin', role: 'admin' };
      return next();
    }
    token = legacyToken;
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

// Admin Login endpoint
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    token,
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// ---- News CRUD ----
router.get('/news', auth, (req: Request, res: Response) => {
  const items = db.prepare('SELECT * FROM news ORDER BY published_date DESC').all();
  res.json(items);
});

router.post('/news', auth, (req: Request, res: Response) => {
  const { title, summary, category, source, impact, link, published_date } = req.body;
  const result = db.prepare(
    'INSERT INTO news (title, summary, category, source, impact, link, published_date) VALUES (?,?,?,?,?,?,?)'
  ).run(title, summary, category, source, impact, link, published_date || new Date().toISOString().split('T')[0]);
  res.json({ id: result.lastInsertRowid });
});

router.put('/news/:id', auth, (req: Request, res: Response) => {
  const { title, summary, category, source, impact, link, is_published } = req.body;
  db.prepare(
    'UPDATE news SET title=?, summary=?, category=?, source=?, impact=?, link=?, is_published=?, updated_at=datetime("now") WHERE id=?'
  ).run(title, summary, category, source, impact, link, is_published ?? 1, req.params.id);
  res.json({ success: true });
});

router.delete('/news/:id', auth, (req: Request, res: Response) => {
  db.prepare('DELETE FROM news WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ---- Tax Rates CRUD ----
router.get('/tax-rates', auth, (req: Request, res: Response) => {
  const items = db.prepare('SELECT * FROM tax_rates ORDER BY category, sub_category').all();
  res.json(items);
});

router.post('/tax-rates', auth, (req: Request, res: Response) => {
  const { category, sub_category, rate, description, effective_from } = req.body;
  const result = db.prepare(
    'INSERT INTO tax_rates (category, sub_category, rate, description, effective_from) VALUES (?,?,?,?,?)'
  ).run(category, sub_category, rate, description, effective_from);
  res.json({ id: result.lastInsertRowid });
});

router.put('/tax-rates/:id', auth, (req: Request, res: Response) => {
  const { category, sub_category, rate, description, effective_from } = req.body;
  db.prepare(
    'UPDATE tax_rates SET category=?, sub_category=?, rate=?, description=?, effective_from=?, updated_at=datetime("now") WHERE id=?'
  ).run(category, sub_category, rate, description, effective_from, req.params.id);
  res.json({ success: true });
});

router.delete('/tax-rates/:id', auth, (req: Request, res: Response) => {
  db.prepare('DELETE FROM tax_rates WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ---- Compliance Dates CRUD ----
router.get('/compliance', auth, (req: Request, res: Response) => {
  const items = db.prepare(
    `SELECT * FROM compliance_dates ORDER BY CASE month WHEN 'July' THEN 1 WHEN 'August' THEN 2 WHEN 'September' THEN 3 WHEN 'October' THEN 4 WHEN 'November' THEN 5 WHEN 'December' THEN 6 WHEN 'January' THEN 7 WHEN 'February' THEN 8 WHEN 'March' THEN 9 END, day`
  ).all();
  res.json(items);
});

router.post('/compliance', auth, (req: Request, res: Response) => {
  const { month, day, event, category, priority, description } = req.body;
  const result = db.prepare(
    'INSERT INTO compliance_dates (month, day, event, category, priority, description) VALUES (?,?,?,?,?,?)'
  ).run(month, day, event, category, priority, description);
  res.json({ id: result.lastInsertRowid });
});

router.put('/compliance/:id', auth, (req: Request, res: Response) => {
  const { month, day, event, category, priority, description } = req.body;
  db.prepare(
    'UPDATE compliance_dates SET month=?, day=?, event=?, category=?, priority=?, description=?, updated_at=datetime("now") WHERE id=?'
  ).run(month, day, event, category, priority, description, req.params.id);
  res.json({ success: true });
});

router.delete('/compliance/:id', auth, (req: Request, res: Response) => {
  db.prepare('DELETE FROM compliance_dates WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// ---- Content Pages CRUD ----
router.post('/content', auth, (req: Request, res: Response) => {
  const { slug, title, content, category } = req.body;
  db.prepare(
    'INSERT OR REPLACE INTO content_pages (slug, title, content, category, updated_at) VALUES (?,?,?,?,datetime("now"))'
  ).run(slug, title, content, category);
  res.json({ slug });
});

// ---- Stats ----
router.get('/stats', auth, (req: Request, res: Response) => {
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number };
  const fetchLogs = db.prepare('SELECT * FROM fetch_logs ORDER BY fetched_at DESC LIMIT 10').all();
  res.json({ newsCount: newsCount ? newsCount.count : 0, fetchLogs });
});

// ---- Trigger fetch ----
router.post('/trigger-fetch', auth, async (req: Request, res: Response) => {
  try {
    const { fetchAllNews } = await import('../scrapers/index.js');
    const results = await fetchAllNews();
    res.json({ success: true, results });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
