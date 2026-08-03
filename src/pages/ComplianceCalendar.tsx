import { useState, useEffect, useMemo } from 'react';
import { CalendarDays, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { complianceEvents as staticEvents } from '../data/calendar';
import { ComplianceItem } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const months = ['All', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
const categories = ['All', 'Income Tax', 'GST', 'TDS', 'Company Law', 'Labour Law', 'General'];
const priorities = ['All', 'high', 'medium', 'low'];
const priorityStyles: Record<string, string> = { high: 'border-l-4 border-l-red-400 bg-red-50/50', medium: 'border-l-4 border-l-yellow-400 bg-yellow-50/50', low: 'border-l-4 border-l-gray-300 bg-gray-50/50' };
const priorityBadges: Record<string, string> = { high: 'tag-red', medium: 'tag-yellow', low: 'tag-blue' };

export default function ComplianceCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState<ComplianceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/compliance`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setEvents(data);
        else throw new Error('Empty');
      })
      .catch(() => setEvents(staticEvents.map((e, idx) => ({ id: idx, month: e.month, day: e.day, event: e.event, category: e.category, priority: (e as any).priority || 'medium', description: e.description }))))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => events.filter(e => {
    if (selectedMonth !== 'All' && e.month !== selectedMonth) return false;
    if (selectedCategory !== 'All' && e.category !== selectedCategory) return false;
    if (selectedPriority !== 'All' && e.priority !== selectedPriority) return false;
    return true;
  }), [events, selectedMonth, selectedCategory, selectedPriority]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { high: 0, medium: 0, low: 0 };
    filteredEvents.forEach(e => { c[e.priority] = (c[e.priority] || 0) + 1; });
    return c;
  }, [filteredEvents]);

  if (loading) return (
    <div className="text-center py-20 text-gray-400">
      <RefreshCw size={40} className="mx-auto mb-3 animate-spin opacity-50" />
      <p>Loading compliance calendar...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-primary-500 flex items-center gap-2"><CalendarDays size={28} /> Compliance Calendar</h1><p className="text-gray-500 mt-1">Track all statutory due dates for FY 2026-27</p></div>
      <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"><Filter size={16} /> Filters {showFilters ? '(Hide)' : '(Show)'}</button>
      {showFilters && (
        <div className="card space-y-4">
          <div><label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Month</label><div className="flex flex-wrap gap-2">{months.map(m => <button key={m} onClick={() => setSelectedMonth(m)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedMonth === m ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{m}</button>)}</div></div>
          <div><label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Category</label><div className="flex flex-wrap gap-2">{categories.map(c => <button key={c} onClick={() => setSelectedCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === c ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>)}</div></div>
          <div><label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Priority</label><div className="flex flex-wrap gap-2">{priorities.map(p => <button key={p} onClick={() => setSelectedPriority(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedPriority === p ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p === 'All' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}</button>)}</div></div>
        </div>
      )}
      <div className="flex items-center gap-4 text-sm"><span className="text-gray-500">{filteredEvents.length} events</span>{counts.high > 0 && <span className="tag tag-red">{counts.high} High</span>}{counts.medium > 0 && <span className="tag tag-yellow">{counts.medium} Medium</span>}{counts.low > 0 && <span className="tag tag-blue">{counts.low} Low</span>}</div>
      <div className="space-y-3">
        {filteredEvents.length === 0 ? <div className="text-center py-16 text-gray-400"><AlertCircle size={40} className="mx-auto mb-3 opacity-50" /><p>No events found for selected filters.</p></div> : filteredEvents.map((event, i) => (
          <div key={i} className={`card p-0 overflow-hidden ${priorityStyles[event.priority] || priorityStyles.medium}`}>
            <div className="flex items-start gap-4 px-6 py-4">
              <div className="flex-shrink-0 w-14 text-center"><p className="text-2xl font-bold text-primary-500">{event.day}</p><p className="text-xs text-gray-400 font-medium">{event.month}</p></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1"><h4 className="font-semibold text-gray-800">{event.event}</h4><span className={`tag ${priorityBadges[event.priority] || 'tag-yellow'} text-xs`}>{event.priority}</span><span className="tag tag-purple text-xs">{event.category}</span></div>
                <p className="text-sm text-gray-500 leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
