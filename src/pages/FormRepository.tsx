import { useState, useMemo } from 'react';
import { FileText, Download, Search, ExternalLink, Clock } from 'lucide-react';
import { forms, formCategories } from '../data/forms';

export default function FormRepository() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => forms.filter(f => {
    if (category !== 'All' && f.category !== category) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [search, category]);

  // Helper to generate a direct link or a Google search if the URL is generic
  const getFormLink = (form: typeof forms[number]) => {
    try {
      const url = new URL(form.link);
      // If the URL has no specific path (just domain), create a Google search link
      if (url.pathname === '/' || url.pathname === '') {
        const query = `${form.name} ${form.category} form`;
        return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
      return form.link;
    } catch {
      return form.link;
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500 flex items-center gap-2">
          <FileText size={28} /> Form Repository
        </h1>
        <p className="text-gray-500 mt-1">Quick access to all regulatory forms — MCA, Income Tax, GST, TDS, RBI, SEBI, and Labour Law</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search forms by name or description..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="All">All Categories</option>
          {formCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <p className="text-sm text-gray-500">Showing {filtered.length} of {forms.length} forms</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(form => (
          <div key={form.id} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="tag tag-blue text-xs">{form.category}</span>
                {form.dueDate && (
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} /> {form.dueDate}</span>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{form.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{form.description}</p>
            </div>
            <a href={getFormLink(form)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
              <Download size={14} /> Download / View <ExternalLink size={12} />
            </a>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-16 text-gray-400">
            <FileText size={40} className="mx-auto mb-3 opacity-50" />
            <p>No forms found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
