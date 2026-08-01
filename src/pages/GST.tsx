import { useParams, Link } from 'react-router-dom';
import { gstRates, registrationThresholds, gstrReturns, itcRules, reverseCharge } from '../data/gst';

const tabs = [
  { id: 'rates', label: 'Rate Structure' },
  { id: 'returns', label: 'GSTR Returns' },
  { id: 'itc', label: 'Input Tax Credit' },
  { id: 'rcm', label: 'Reverse Charge' },
  { id: 'registration', label: 'Registration' },
];

export default function GST() {
  const { section } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">Goods & Services Tax (GST)</h1>
        <p className="text-gray-500 mt-1">Comprehensive GST resource: rates, returns, ITC, reverse charge mechanism, and registration</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-0">
        {tabs.map((tab) => (
          <Link key={tab.id} to={`/gst/${tab.id}`} className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${section === tab.id ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'}`}>{tab.label}</Link>
        ))}
      </div>

      {section === 'rates' && (
        <div className="space-y-4">
          {gstRates.map((block, i) => (
            <div key={i} className="card">
              <div className="flex items-center gap-3 mb-3">
                <span className="tag tag-green text-base px-3 py-1">{block.rate}</span>
                <span className="text-xs text-gray-400">({block.category})</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{block.items}</p>
            </div>
          ))}
        </div>
      )}

      {section === 'returns' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">GSTR Filing Calendar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Form</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Frequency</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Due Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Description</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Who Files</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gstrReturns.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="tag tag-blue">{row.form}</span></td>
                    <td className="px-4 py-3 text-gray-700">{row.frequency}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row.dueDate}</td>
                    <td className="px-4 py-3 text-gray-600 leading-relaxed max-w-xs">{row.description}</td>
                    <td className="px-4 py-3 text-gray-700">{row.whoFiles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === 'itc' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">Conditions for Claiming ITC (Section 16)</h3>
            <div className="space-y-3">
              {itcRules.map((rule, i) => (
                <div key={i} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center mt-0.5">{i + 1}</span>
                    <div>
                      <p className="font-medium text-gray-800">{rule.condition}</p>
                      <p className="text-sm text-gray-600 mt-1">{rule.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{rule.timeLimit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Blocked Credits — Section 17(5)</h4>
            <p className="text-sm text-red-700 leading-relaxed">{itcRules.find(r => r.condition.includes('Blocked'))?.details}</p>
          </div>
        </div>
      )}

      {section === 'rcm' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">Reverse Charge Mechanism (RCM)</h3>
          <p className="text-sm text-gray-500 mb-4">Under RCM, the recipient of goods/services is liable to pay GST instead of the supplier. Sections 9(3) and 9(4) of CGST Act.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Service / Supply</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Liable to Pay</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Rate</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reverseCharge.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium">{row.service}</td>
                    <td className="px-4 py-3 text-gray-700">{row.recipientLiable}</td>
                    <td className="px-4 py-3"><span className="tag tag-yellow">{row.rate}</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs leading-relaxed max-w-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === 'registration' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">GST Registration Thresholds</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Threshold</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrationThresholds.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium">{row.category}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">{row.threshold}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 space-y-2">
            <h4 className="font-semibold text-yellow-800">Mandatory Registration (No Threshold)</h4>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Inter-state supply of goods/services</li>
              <li>Casual taxable persons / Non-resident taxable persons</li>
              <li>Persons required to pay tax under RCM</li>
              <li>E-commerce operators / aggregators</li>
              <li>Persons supplying through e-commerce</li>
              <li>Input Service Distributors (ISD)</li>
              <li>Agents of a principal supplier</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
