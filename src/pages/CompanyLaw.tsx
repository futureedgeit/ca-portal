import { useParams, Link } from 'react-router';
import { companyTypes, annualFilings, meetings, csrRules } from '../data/companylaw';

const tabs = [
  { id: 'types', label: 'Company Types' },
  { id: 'filings', label: 'ROC Filings' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'csr', label: 'CSR Rules' },
];

export default function CompanyLaw() {
  const { section } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">Company Law & ROC Compliance</h1>
        <p className="text-gray-500 mt-1">Companies Act 2013: company types, annual filings, meetings, and CSR obligations</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-0">
        {tabs.map((tab) => (
          <Link key={tab.id} to={`/company-law/${tab.id}`} className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${section === tab.id ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'}`}>{tab.label}</Link>
        ))}
      </div>

      {section === 'types' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyTypes.map((type, i) => (
            <div key={i} className="card">
              <h3 className="text-lg font-semibold text-primary-500">{type.type}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Min Members:</span><span className="font-medium text-gray-800">{type.minMembers}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Max Members:</span><span className="font-medium text-gray-800">{type.maxMembers}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Min Capital:</span><span className="font-medium text-gray-800">{type.minCapital}</span></div>
                <div className="pt-2 border-t border-gray-100"><p className="text-gray-600 leading-relaxed">{type.features}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {section === 'filings' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">Annual ROC Filing Requirements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Form</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Description</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Due Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Penalty</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Section</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {annualFilings.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="tag tag-purple">{row.form}</span></td>
                    <td className="px-4 py-3 text-gray-700 leading-relaxed max-w-xs">{row.description}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row.dueDate}</td>
                    <td className="px-4 py-3 text-red-700 font-medium text-xs max-w-xs">{row.penalty}</td>
                    <td className="px-4 py-3 text-gray-500">{row.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800"><strong>Important:</strong> Additional fee of Rs. 100 per day per form applies for late filing of AOC-4 and MGT-7. Officers in default are personally liable.</p>
          </div>
        </div>
      )}

      {section === 'meetings' && (
        <div className="space-y-4">
          {meetings.map((meeting, i) => (
            <div key={i} className="card">
              <h3 className="text-lg font-semibold text-primary-500">{meeting.meeting}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                <div><p className="text-gray-400 text-xs uppercase">Timeline</p><p className="font-medium text-gray-800">{meeting.timeline}</p></div>
                <div><p className="text-gray-400 text-xs uppercase">Frequency</p><p className="font-medium text-gray-800">{meeting.frequency}</p></div>
                <div><p className="text-gray-400 text-xs uppercase">Quorum</p><p className="font-medium text-gray-800">{meeting.quorum}</p></div>
                <div><p className="text-gray-400 text-xs uppercase">Key Section</p><p className="font-medium text-gray-800">{meeting.meeting.includes('AGM') ? 'Sec 96' : meeting.meeting.includes('EGM') ? 'Sec 100' : 'Sec 173'}</p></div>
              </div>
            </div>
          ))}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-1">
            <h4 className="font-semibold text-blue-800 mb-2">Key Points</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Board meetings can be held through video conferencing (VC)</li>
              <li>Notice of board meeting: at least 7 days</li>
              <li>AGM notice: at least 21 clear days</li>
              <li>AGM must be held during business hours (9 AM to 6 PM), not on public holiday</li>
              <li>Penalty for not holding board meetings: Rs. 25,000 on company + Rs. 1,000/day per officer</li>
            </ul>
          </div>
        </div>
      )}

      {section === 'csr' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">CSR Applicability (Section 135)</h3>
            <p className="text-sm text-gray-600 mb-4">CSR provisions apply to companies meeting ANY of the following criteria in the preceding FY:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50"><th className="text-left px-4 py-3 font-semibold text-gray-600">Criteria</th><th className="text-left px-4 py-3 font-semibold text-gray-600">CSR Obligation</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {csrRules.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-3 text-gray-800 font-medium">{row.criteria}</td><td className="px-4 py-3 text-green-700 font-medium">{row.obligation}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 space-y-2">
            <h4 className="font-semibold text-yellow-800">CSR Key Requirements</h4>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Constitute CSR Committee with at least 3 directors (including 1 independent)</li>
              <li>CSR Policy must be formulated and disclosed on company website</li>
              <li>Unspent CSR (non-ongoing) → transfer to Schedule VII fund within 6 months</li>
              <li>Unspent CSR (ongoing projects) → transfer to Unspent CSR Account within 30 days</li>
              <li>Penalty: Rs. 1,00,000 minimum (up to 3x CSR amount) on company + Rs. 50,000 minimum on officers</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
