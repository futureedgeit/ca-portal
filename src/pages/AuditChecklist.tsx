import { useState } from 'react';
import { ClipboardCheck, CheckCircle2, Printer } from 'lucide-react';
import { generateChecklist, clientTypes, engagementTypes } from '../data/audit-checklist';

export default function AuditChecklist() {
  const [clientType, setClientType] = useState('');
  const [engagementType, setEngagementType] = useState('');
  const [checklist, setChecklist] = useState<any>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleGenerate = () => {
    if (!clientType || !engagementType) return;
    const cl = generateChecklist(clientType, engagementType);
    setChecklist(cl);
    setCompleted({});
  };

  const toggleItem = (id: string) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getProgress = () => {
    if (!checklist) return 0;
    const total = checklist.totalItems;
    const done = Object.values(completed).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500 flex items-center gap-2">
          <ClipboardCheck size={28} /> Audit Checklist Generator
        </h1>
        <p className="text-gray-500 mt-1">Generate tailored audit checklists based on client type and engagement nature. All items referenced to applicable SAs.</p>
      </div>

      {/* Generator Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-primary-500 mb-4">Generate Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Client Type</label>
            <select value={clientType} onChange={e => setClientType(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">-- Select Client Type --</option>
              {clientTypes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Engagement Type</label>
            <select value={engagementType} onChange={e => setEngagementType(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">-- Select Engagement --</option>
              {engagementTypes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleGenerate} disabled={!clientType || !engagementType} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          Generate Checklist
        </button>
      </div>

      {/* Generated Checklist */}
      {checklist && (
        <div className="space-y-4" id="checklist-print">
          <div className="card bg-primary-500 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{checklist.clientType} — {checklist.engagementType}</h2>
                <p className="text-white/70 text-sm mt-1">{checklist.totalItems} procedures across {checklist.sections.length} sections</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/15 rounded-full px-4 py-2 text-sm font-semibold">
                  {getProgress()}% Complete ({Object.values(completed).filter(Boolean).length}/{checklist.totalItems})
                </div>
                <button onClick={handlePrint} className="bg-white text-primary-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-accent-400 h-full rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }} />
            </div>
          </div>

          {checklist.sections.map((section: any, si: number) => (
            <div key={si} className="card">
              <h3 className="text-lg font-semibold text-primary-500 mb-4 pb-2 border-b border-gray-100">{section.name}</h3>
              <div className="space-y-2">
                {section.items.map((item: any) => {
                  const isDone = completed[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${
                        isDone ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                        isDone ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {isDone && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-xs text-gray-400 font-mono">{item.id}</span>
                          <span className="tag tag-purple text-xs">{item.area}</span>
                          <span className="text-xs text-gray-400 ml-auto">{item.reference}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDone ? 'text-green-800 line-through' : 'text-gray-700'}`}>{item.procedure}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {!checklist && (
        <div className="text-center py-16 text-gray-400">
          <ClipboardCheck size={48} className="mx-auto mb-3 opacity-30" />
          <p>Select a client type and engagement type above to generate a tailored audit checklist.</p>
          <p className="text-sm mt-1">Supported: Manufacturing, Trading, Services, NGO/Trust, Banking, NBFC</p>
        </div>
      )}
    </div>
  );
}
