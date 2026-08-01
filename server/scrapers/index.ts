import db from '../database.js';

interface NewsScrapedItem {
  title: string;
  summary: string;
  category: string;
  source: string;
  impact: string;
  link: string;
  published_date: string;
}

function logFetch(source: string, status: string, itemsFetched: number, errorMessage?: string) {
  db.prepare('INSERT INTO fetch_logs (source, status, items_fetched, error_message) VALUES (?,?,?,?)')
    .run(source, status, itemsFetched, errorMessage || null);
}

function insertNews(item: NewsScrapedItem): boolean {
  const existing = db.prepare('SELECT id FROM news WHERE title = ? AND source = ?').get(item.title, item.source);
  if (existing) return false;
  db.prepare('INSERT INTO news (title, summary, category, source, impact, link, published_date) VALUES (?,?,?,?,?,?,?)')
    .run(item.title, item.summary, item.category, item.source, item.impact, item.link, item.published_date);
  return true;
}

// ============================================================
// Google News RSS — reliable, free, no API key needed
// ============================================================

async function fetchFromGoogleNews(sourceName: string, searchQuery: string, category: string, impact: string) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'CA-Portal/1.0 (Research Tool)' },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();

    const items: NewsScrapedItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match: RegExpExecArray | null;
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      let title = (itemXml.match(/<title>(?:<!\[CDATA\[)?([^\]]*)/)?.[1] || '').trim();
      const link = (itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '').trim();
      const pubDate = (itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '').trim();

      // Robust description extraction — handle CDATA and nested HTML
      let desc = '';
      const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/);
      if (descMatch) {
        desc = descMatch[1]
          .replace(/<!\[CDATA\[/g, '')
          .replace(/\]\]>/g, '')
          .replace(/<[^>]*>/g, ' ')  // strip all HTML tags, replace with space
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ')
          .trim();
      }
      // Fallback: use title as summary if description is too short
      if (!desc || desc.length < 20) desc = title;
      const srcMatch = (itemXml.match(/<source[^>]*>(.*?)<\/source>/)?.[1] || '').trim();

      // Clean Google News title (remove trailing source name)
      title = title.replace(/\s*-\s*\S+$/, '').trim();

      if (title && title.length > 15) {
        items.push({
          title,
          summary: desc?.substring(0, 500) || title,
          category,
          source: srcMatch || sourceName,
          impact,
          link: link || '',
          published_date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        });
      }
    }

    let inserted = 0;
    for (const item of items) {
      if (insertNews(item)) inserted++;
    }
    logFetch(sourceName, 'success', inserted);
    return { source: sourceName, inserted, total: items.length };
  } catch (err: any) {
    logFetch(sourceName, 'failed', 0, err.message);
    return { source: sourceName, error: err.message };
  }
}

// ============================================================
// Run all fetchers
// ============================================================
export async function fetchAllNews() {
  console.log('[FETCH] Starting fetch from all sources (Google News RSS)...');

  const sources = [
    fetchFromGoogleNews('CBDT', 'CBDT "income tax" circular notification India', 'Income Tax', 'Taxpayers & Professionals'),
    fetchFromGoogleNews('CBIC-GST', 'CBIC GST notification council circular India', 'GST', 'All GST registrants'),
    fetchFromGoogleNews('MCA-CompanyLaw', 'MCA "companies act" ROC circular notification India', 'Company Law', 'All companies'),
    fetchFromGoogleNews('RBI-Finance', 'RBI "monetary policy" circular notification repo rate', 'Finance', 'All businesses'),
    fetchFromGoogleNews('SEBI', 'SEBI LODR circular notification regulation India', 'SEBI', 'Listed companies'),
    fetchFromGoogleNews('ICAI', 'ICAI "chartered accountant" notification standard guidance', 'Auditing', 'CAs & Audit Professionals'),
  ];

  const results = await Promise.allSettled(sources);

  const summary = results.map((r) => {
    if (r.status === 'fulfilled') return r.value;
    return (r as PromiseRejectionResult).reason;
  });

  console.log('[FETCH] Complete:', summary.map((s: any) => `${s.source}: ${s.inserted || 0}/${s.total || 0}${s.error ? ' ERR:' + s.error : ''}`).join(' | '));
  return summary;
}
