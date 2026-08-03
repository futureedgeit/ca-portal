import { useState, useEffect, useMemo } from 'react';
import { CalendarDays, Filter, AlertCircle, RefreshCw, Clock, History } from 'lucide-react';
import { complianceEvents as staticEvents, calculateDaysRemaining } from '../data/calendar';
import { ComplianceItem } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const months = ['All', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
const categories = ['All', 'Income Tax', 'GST', 'TDS', 'Company Law', 'Labour Law', 'General'];
const priorities = ['All', 'high', 'medium', 'low'];
const priorityStyles: Record<string, string> = { high: 'border-l-4 border-l-red-400 bg-red-50/50', medium: 'border-l-4 border-l-yellow-400 bg-yellow-50/50', low: 'border-l-4 border-l-gray-300 bg-gray-50/50' };
const priorityBadges: Record<string, string> = { high: 'tag-red', medium: 'tag-yellow', low: 'tag-blue' };

export default function ComplianceCalendar() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
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
      .catch(() => setEvents(staticEvents.map((e, idx) => ({ id: idx, month: e.month, day: e.day, event: e.event, category: e.category, priority: (e as any).priority || 'medium', description: e.description, dueDate: (e as any).dueDate } as any))))
      .finally(() => setLoading(false));
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const categorizeEvent = (e: any) => {
    let eventDateStr = e.dueDate;
    if (!eventDateStr) {
      const monthMap: Record<string, number> = { April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12, January: 1, February: 2, March: 3 };
      const mNum = monthMap[e.month] || 7;
      const year = mNum <= 3 ? 2027 : 2026;
      eventDateStr = `${year}-${String(mNum).padStart(2, '0')}-${String(e.day).padStart(2, '0')}`;
    }
    return eventDateStr >= todayStr ? 'upcoming' : 'past';
  };

  const filteredEvents = useMemo(() => events.filter(e => {
    const tabStatus = categorizeEvent(e);
    if (tabStatus !== activeTab) return false;
    if (selectedMonth !== 'All' && e.month !== selectedMonth) return false;
    if (selectedCategory !== 'All' && e.category !== selectedCategory) return false;
    if (selectedPriority !== 'All' && e.priority !== selectedPriority) return false;
    return true;
  }).sort((a, b) => {
    const dateA = (a as any).dueDate || `${a.month}-${a.day}`;
    const dateB = (b as any).dueDate || `${b.month}-${b.day}`;
    return activeTab === 'upcoming' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
  }), [events, activeTab, selectedMonth, selectedCategory, selectedPriority, todayStr]);

  const tabCounts = useMemo(() => {
    let upcoming = 0;
    let past = 0;
    events.forEach(e => {
      if (categorizeEvent(e) === 'upcoming') upcoming++;
      else past++;
    });
    return { upcoming, past };
  }, [events, todayStr]);

  const priorityCounts = useMemo(() => {
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
      <div>
        <h1 className="text-3xl font-bold text-primary-500 flex items-center gap-2">
          <CalendarDays size={28} /> Compliance Calendar
        </h1>
        <p className="text-gray-500 mt-1">Track all statutory due dates for FY 2026-27</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock size={16} /> Upcoming ({tabCounts.upcoming})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'past'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History size={16} /> Past ({tabCounts.past})
          </button>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 shadow-sm"
        >
          <Filter size={16} /> Filters {showFilters ? '(Hide)' : '(Show)'}
        </button>
      </div>

      {showFilters && (
        <div className="card space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Month</label>
            <div className="flex flex-wrap gap-2">
              {months.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedMonth === m ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === c ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Priority</label>
            <div className="flex flex-wrap gap-2">
              {priorities.map(p => (
                <button
                  key={p}
                  onClick={() => setSelectedPriority(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedPriority === p ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p === 'All' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-500">{filteredEvents.length} {activeTab} events</span>
        {priorityCounts.high > 0 && <span className="tag tag-red">{priorityCounts.high} High</span>}
        {priorityCounts.medium > 0 && <span className="tag tag-yellow">{priorityCounts.medium} Medium</span>}
        {priorityCounts.low > 0 && <span className="tag tag-blue">{priorityCounts.low} Low</span>}
      </div>

      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <AlertCircle size={40} className="mx-auto mb-3 opacity-50" />
            <p>No {activeTab} events found for the selected filters.</p>
          </div>
        ) : (
          filteredEvents.map((event: any, i) => {
            const daysRemaining = event.dueDate ? calculateDaysRemaining(event.dueDate) : null;
            return (
              <div key={i} className={`card p-0 overflow-hidden ${priorityStyles[event.priority] || priorityStyles.medium}`}>
                <div className="flex items-start gap-4 px-6 py-4">
                  <div className="flex-shrink-0 w-14 text-center">
                    <p className="text-2xl font-bold text-primary-500">{event.day}</p>
                    <p className="text-xs text-gray-400 font-medium">{event.month}</p>
                    {activeTab === 'upcoming' && daysRemaining !== null && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-bold bg-primary-50 text-primary-600 rounded">
                        {daysRemaining}d left
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-gray-800">{event.event}</h4>
                      <span className={`tag ${priorityBadges[event.priority] || 'tag-yellow'} text-xs`}>{event.priority}</span>
                      <span className="tag tag-purple text-xs">{event.category}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{event.description}</p>
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

