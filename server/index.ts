import express, { Request, Response } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Auto-clean any articles with raw XML on every startup
import { cleanAllArticles } from './routes/news.js';
cleanAllArticles();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/admin', express.static(join(__dirname, '..', 'admin')));

// Import routes
import newsRoutes from './routes/news.js';
import taxRatesRoutes from './routes/tax-rates.js';
import complianceRoutes from './routes/compliance.js';
import contentRoutes from './routes/content.js';
import adminRoutes from './routes/admin.js';
import { fetchAllNews } from './scrapers/index.js';

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/news', newsRoutes);
app.use('/api/tax-rates', taxRatesRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes);

app.post('/api/fetch', async (req: Request, res: Response) => {
  try {
    const results = await fetchAllNews();
    res.json({ success: true, results });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Scheduled auto-fetch: daily at 8 AM and 6 PM IST
cron.schedule('0 8,18 * * *', async () => {
  console.log('[CRON] Running scheduled news fetch...');
  try {
    await fetchAllNews();
    console.log('[CRON] Fetch complete');
  } catch (err: any) {
    console.error('[CRON] Fetch failed:', err.message);
  }
}, { timezone: 'Asia/Kolkata' });

// Weekly full refresh: Sunday at 9 AM
cron.schedule('0 9 * * 0', async () => {
  console.log('[CRON] Running weekly full refresh...');
  try {
    await fetchAllNews();
    console.log('[CRON] Weekly refresh complete');
  } catch (err: any) {
    console.error('[CRON] Weekly refresh failed:', err.message);
  }
}, { timezone: 'Asia/Kolkata' });

app.listen(PORT, () => {
  console.log(`CA Portal API running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log('Auto-fetch scheduled: daily at 8 AM & 6 PM IST');
});
