import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { indianAccountingStandards, asStandards, auditingStandards, caro, icds } from '../data/standards';

const tabs = [
  { id: 'indas', label: 'Ind AS' },
  { id: 'as', label: 'Accounting Stds' },
  { id: 'sa', label: 'Auditing Stds' },
  { id: 'caro', label: 'CARO 2020' },
  { id: 'icds', label: 'ICDS' },
];

export default function AccountingStandards() {
  const { section } = useParams();
  const [search, setSearch] = useState('');

  const filteredIndAS = indianAccountingStandards.filter(
    s => s.indAS.toLowerCase().includes(search.toLowerCase()) || s.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredSA = auditingStandards.filter(
    s => s.sa.toLowerCase().includes(search.toLowerCase()) || s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">Accounting & Auditing Standards</h1>
        <p className="text-gray-500 mt-1">Complete reference for Ind AS, AS, SA, CARO, and ICDS</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-0">
        {tabs.map((tab) => (
          <Link key={tab.id} to={`/accounting-standards/${tab.id}`} className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${section === tab.id ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'}`}>{tab.label}</Link>
        ))}
      </div>

      {section === 'indas' && (
        <div className="space-y-3">
          <input type="text" placeholder="Search Ind AS by number or title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <p className="text-sm text-gray-500">Indian Accounting Standards (Ind AS) converged with IFRS. Applicable in phases based on net worth, listing status, and turnover.</p>
          {filteredIndAS.map((std, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 tag tag-blue">{std.indAS}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800">{std.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Corresponding: {std.corresponding}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{std.keyRequirement}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredIndAS.length === 0 && <p className="text-center text-gray-400 py-12">No Ind AS found matching "{search}"</p>}
        </div>
      )}

      {section === 'as' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">Accounting Standards (AS) — Non-Ind AS Entities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {asStandards.map((std, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <span className="tag tag-purple text-xs mr-2">{std.as}</span>
                <span className="text-sm text-gray-700">{std.title}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">Note: AS 6 (Depreciation), AS 8 (R&D) have been withdrawn. Some AS superseded by corresponding Ind AS for applicable entities.</p>
        </div>
      )}

      {section === 'sa' && (
        <div className="space-y-3">
          <input type="text" placeholder="Search SA by number or title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <p className="text-sm text-gray-500">Standards on Auditing (SA) issued by ICAI. Aligned with International Standards on Auditing (ISA).</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSA.map((std, i) => (
              <div key={i} className="card flex items-start gap-3">
                <span className="flex-shrink-0 tag tag-green">{std.sa}</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{std.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{std.series}</p>
                </div>
              </div>
            ))}
            {filteredSA.length === 0 && <p className="text-center text-gray-400 py-12">No SA found matching "{search}"</p>}
          </div>
        </div>
      )}

      {section === 'caro' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-2">Companies (Auditor's Report) Order, 2020</h3>
          <p className="text-sm text-gray-500 mb-4">CARO 2020 applies to all companies including foreign companies. Exempt: banking, insurance, Section 8 companies, OPC, small companies.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50"><th className="text-left px-4 py-3 font-semibold text-gray-600">Clause</th><th className="text-left px-4 py-3 font-semibold text-gray-600">Area</th><th className="text-left px-4 py-3 font-semibold text-gray-600">Reporting Requirement</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {caro.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-3"><span className="tag tag-blue text-xs">{row.clause}</span></td><td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">{row.area}</td><td className="px-4 py-3 text-gray-600 text-xs leading-relaxed">{row.requirement}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === 'icds' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">Income Computation and Disclosure Standards (ICDS)</h3>
          <p className="text-sm text-gray-500 mb-4">Applicable for computing income under "Profits and Gains of Business or Profession" and "Income from Other Sources". Effective from AY 2017-18.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {icds.map((std, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                <span className="tag tag-yellow">{std.icds}</span>
                <span className="text-sm font-medium text-gray-800">{std.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
