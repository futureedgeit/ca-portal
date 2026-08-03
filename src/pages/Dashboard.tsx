import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Calculator, FileText, CalendarDays, Newspaper, FileCheck, Building2,
  TrendingUp, AlertCircle, Clock, ArrowRight, Bell, LucideIcon
} from 'lucide-react';
import { statsCards, quickLinks } from '../data/dashboard';
import { complianceEvents, getUpcomingDeadlines, calculateDaysRemaining } from '../data/calendar';
import { NewsItem, ComplianceItem } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
};

const priorityBadge: Record<string, string> = {
  high: 'tag-red',
  medium: 'tag-yellow',
  low: 'tag-blue'
};

const iconMap: Record<string, LucideIcon> = {
  Calculator, FileText, CalendarDays, Newspaper, FileCheck, Building2
};

export default function Dashboard() {
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(r => r.ok && r.json())
      .then(d => { if (d?.status === 'ok') setBackendOnline(true); else throw new Error(); })
      .catch(() => setBackendOnline(false));

    fetch(`${API_BASE}/compliance/upcoming`)
      .then(r => r.json())
      .then(data => setDeadlines(Array.isArray(data) && data.length > 0 ? data : getUpcomingDeadlines().slice(0, 6)))
      .catch(() => setDeadlines(getUpcomingDeadlines().slice(0, 6)));

    fetch(`${API_BASE}/news?limit=4`)
      .then(r => r.json())
      .then(data => setNewsItems(data.items?.slice(0, 4) || []))
      .catch(() => {});
  }, []);

  const getDaysLeft = (month: string, day: number) => {
    const months: Record<string, number> = { July: 6, August: 7, September: 8, October: 9, November: 10, December: 11, January: 0, February: 1, March: 2 };
    const now = new Date();
    const target = new Date(2027, months[month] ?? 6, day);
    return Math.max(1, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const categoryTag = (cat: string) => {
    const map: Record<string, string> = { 'Income Tax': 'tag-blue', 'GST': 'tag-green', 'Company Law': 'tag-purple', 'SEBI': 'tag-yellow', 'Auditing': 'tag-red', 'Finance': 'tag-blue' };
    return map[cat] || 'tag-blue';
  };

  return (
    <div className="space-y-8">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <div key={i} className={`card border-l-4 ${colorMap[stat.color] || 'bg-blue-50'}`}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-500 flex items-center gap-2"><Clock size={20} /> Upcoming Deadlines</h2>
            <Link to="/compliance-calendar" className="text-sm text-accent-500 hover:text-accent-600 flex items-center gap-1">View Calendar <ArrowRight size={14} /></Link>
          </div>
          <div className="card divide-y divide-gray-100 p-0 overflow-hidden">
            {deadlines.length > 0 ? deadlines.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-primary-500">
                    {item.dueDate ? calculateDaysRemaining(item.dueDate) : getDaysLeft(item.month, item.day)}d
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.event}</p>
                    <p className="text-xs text-gray-400">{item.day} {item.month} {item.dueDate ? item.dueDate.split('-')[0] : '2026'}</p>
                  </div>
                </div>
                <span className={`tag ${priorityBadge[item.priority] || 'tag-yellow'}`}>{item.category}</span>
              </div>
            )) : <p className="text-center py-8 text-gray-400 text-sm">Loading deadlines...</p>}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary-500 flex items-center gap-2"><TrendingUp size={20} /> Quick Access</h2>
          <div className="card space-y-2 p-0">
            {quickLinks.map((link, i) => {
              const Icon = iconMap[link.icon] || FileText;
              return (
                <Link key={i} to={link.to} className="flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors text-gray-700 hover:text-primary-500">
                  <Icon size={18} /><span className="text-sm font-medium">{link.label}</span><ArrowRight size={14} className="ml-auto text-gray-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary-500 flex items-center gap-2"><Bell size={20} /> Latest Notifications & Circulars</h2>
          <Link to="/news" className="text-sm text-accent-500 hover:text-accent-600 flex items-center gap-1">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsItems.length > 0 ? newsItems.map((item, i) => (
            <div key={i} className="card flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center"><AlertCircle size={20} className="text-primary-500" /></div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`tag text-xs ${categoryTag(item.category)}`}>{item.category}</span>
                  <span className="text-xs text-gray-400">{item.published_date}</span>
                </div>
                <p className="font-medium text-gray-800 text-sm leading-snug">{item.title}</p>
                <p className="text-xs text-gray-400 mt-1">{item.source}</p>
              </div>
            </div>
          )) : <p className="col-span-2 text-center py-6 text-gray-400 text-sm">Loading updates... (ensure API is running on port 3001)</p>}
        </div>
      </div>
    </div>
  );
}
