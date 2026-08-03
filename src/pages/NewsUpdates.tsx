import { useState, useEffect, FormEvent } from 'react';
import { newsItems as staticNews } from '../data/news';
import { Newspaper, Search, ExternalLink, Tag, RefreshCw } from 'lucide-react';
import { NewsItem } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const categories = ['All', 'Income Tax', 'GST', 'Company Law', 'SEBI', 'Auditing', 'Finance'];

export default function NewsUpdates() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'loading' | 'api' | 'offline'>('loading');
  const [retrying, setRetrying] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setRetrying(false);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      if (searchQuery) params.set('search', searchQuery);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${API_BASE}/news?${params}`, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        setNews(data.items || []);
        setTotal(data.total || data.items?.length || 0);
        setDataSource('api');
      } else {
        throw new Error('API unavailable');
      }
    } catch {
      let filtered = staticNews;
      if (selectedCategory !== 'All') filtered = filtered.filter(i => i.category === selectedCategory);
      if (searchQuery) filtered = filtered.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      setNews(filtered.map((n, idx) => ({ ...n, published_date: n.date, id: idx, link: '' })));
      setTotal(filtered.length);
      setDataSource('offline');
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, [selectedCategory]);

  useEffect(() => {
    if (dataSource !== 'offline') return;
    const interval = setInterval(() => {
      setRetrying(true);
      fetch(`${API_BASE}/health`).then(r => {
        if (r.ok) { setRetrying(false); fetchNews(); }
      }).catch(() => setRetrying(false));
    }, 30000);
    return () => clearInterval(interval);
  }, [dataSource]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchNews();
  };

  const formatDate = (d: string) => {
    if (!d) return { day: '--', month: '---', year: '----' };
    const parts = d.split(' ');
    if (parts.length === 3) {
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) throw new Error('Invalid');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return { day: dt.getDate(), month: months[dt.getMonth()], year: dt.getFullYear() };
    } catch { return { day: '--', month: '---', year: '----' }; }
  };

  const categoryTag = (cat: string) => {
    const map: Record<string, string> = { 'Income Tax': 'tag-blue', 'GST': 'tag-green', 'Company Law': 'tag-purple', 'SEBI': 'tag-yellow', 'Auditing': 'tag-red', 'Finance': 'tag-blue' };
    return map[cat] || 'tag-blue';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-500 flex items-center gap-2">
            <Newspaper size={28} /> News & Updates
          </h1>
          <p className="text-gray-500 mt-1">Latest notifications, circulars, and updates from CBDT, CBIC, MCA, SEBI, RBI, and ICAI</p>
        </div>
        <div className="flex items-center gap-3">
          {dataSource === 'offline' && (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
              Backend Offline — showing saved data
            </span>
          )}
          {retrying && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Reconnecting...</span>
          )}
          {dataSource === 'api' && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Live</span>
          )}
          <button onClick={fetchNews} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-500" title="Refresh">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search news by keyword..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
          {categories.map((c) => (<option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>))}
        </select>
      </form>

      <p className="text-sm text-gray-500">
        Showing {news.length} of {total} updates{selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </p>

      {/* News Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <RefreshCw size={40} className="mx-auto mb-3 animate-spin opacity-50" />
            <p>Loading latest updates...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Newspaper size={40} className="mx-auto mb-3 opacity-50" />
            <p>No updates found. Try a different search or category.</p>
          </div>
        ) : (
          news.map((item, i) => {
            const date = formatDate(item.published_date);
            return (
              <div key={item.id || i} className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-center pt-1">
                    <div className="bg-primary-50 rounded-lg p-2">
                      <p className="text-lg font-bold text-primary-500">{date.day}</p>
                      <p className="text-[10px] text-gray-400">{date.month} {date.year}</p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`tag text-xs ${categoryTag(item.category)}`}>{item.category}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Tag size={10} /> {item.source}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 leading-snug mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400"><strong className="text-gray-500">Impact:</strong> {item.impact || 'All stakeholders'}</span>
                      {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-500 hover:text-accent-600 flex items-center gap-1 font-medium">Read Source <ExternalLink size={12} /></a>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
