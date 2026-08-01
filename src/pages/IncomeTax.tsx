import { useParams, Link } from 'react-router-dom';
import { taxSlabs, taxRebates, deductions, tdsRates, itrForms, advanceTax } from '../data/incometax';

const tabs = [
  { id: 'slabs', label: 'Tax Slabs' },
  { id: 'deductions', label: 'Deductions' },
  { id: 'tds', label: 'TDS Rates' },
  { id: 'itr', label: 'ITR Forms' },
  { id: 'advance-tax', label: 'Advance Tax' },
];

export default function IncomeTax() {
  const { section } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">Income Tax</h1>
        <p className="text-gray-500 mt-1">Tax slabs, deductions, TDS rates, ITR forms, and advance tax for FY 2025-26 (AY 2026-27)</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-0">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={`/income-tax/${tab.id}`}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              section === tab.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Tax Slabs */}
      {section === 'slabs' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">New Tax Regime (Default — FY 2025-26)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Income Slab</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {taxSlabs.newRegime.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                      <td className="px-4 py-3"><span className="tag tag-blue">{row.rate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">Old Tax Regime</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Income Slab</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {taxSlabs.oldRegime.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                      <td className="px-4 py-3"><span className="tag tag-blue">{row.rate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">Senior Citizens (60+ years) — Old Regime</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Income Slab</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {taxSlabs.oldRegimeSenior.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{row.slab}</td>
                      <td className="px-4 py-3"><span className="tag tag-blue">{row.rate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">Rebate under Section 87A</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Regime</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Threshold</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Rebate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {taxRebates.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800 font-medium">{row.regime}</td>
                      <td className="px-4 py-3 text-gray-700">{row.income}</td>
                      <td className="px-4 py-3 text-green-700 font-medium">{row.rebate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Deductions */}
      {section === 'deductions' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">Chapter VI-A Deductions (Old Regime Only)</h3>
          <p className="text-sm text-gray-500 mb-4">
            Note: Most deductions are not available under the New Tax Regime. Section 80CCD(2) (employer NPS) is available under both regimes.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Section</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Limit</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deductions.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="tag tag-purple">{row.section}</span></td>
                    <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{row.limit}</td>
                    <td className="px-4 py-3 text-gray-600 leading-relaxed">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TDS Rates */}
      {section === 'tds' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">TDS Rate Chart (FY 2025-26)</h3>
          <p className="text-sm text-gray-500 mb-4">
            Applicable TDS rates for various payments. Non-deduction/deduction at lower rate possible with certificate under Section 197.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Section</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nature of Payment</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Threshold</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Rate</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tdsRates.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="tag tag-blue">{row.section}</span></td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row.nature}</td>
                    <td className="px-4 py-3 text-gray-700">{row.threshold}</td>
                    <td className="px-4 py-3"><span className="tag tag-green">{row.rate}</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs leading-relaxed max-w-xs">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ITR Forms */}
      {section === 'itr' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-4">ITR Forms for AY 2026-27</h3>
          <p className="text-sm text-gray-500 mb-4">
            Choose the correct ITR form based on your income sources and residential status.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Form</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Applicable To</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Not Applicable</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {itrForms.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="tag tag-purple">{row.form}</span></td>
                    <td className="px-4 py-3 text-gray-700 leading-relaxed max-w-xs">{row.applicableTo}</td>
                    <td className="px-4 py-3 text-gray-500 leading-relaxed max-w-xs">{row.notApplicable}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{row.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Advance Tax */}
      {section === 'advance-tax' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">Advance Tax Due Dates (FY 2026-27)</h3>
            <p className="text-sm text-gray-500 mb-4">
              Applicable if estimated tax liability exceeds Rs. 10,000 in a financial year. Senior citizens (60+ years) without business income are exempt.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Installment</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Due Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Cumulative %</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {advanceTax.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800 font-medium">{row.installment}</td>
                      <td className="px-4 py-3 text-gray-700">{row.dueDate}</td>
                      <td className="px-4 py-3"><span className="tag tag-green">{row.percentage}</span></td>
                      <td className="px-4 py-3 text-gray-700">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Penalties for Non-Payment</h4>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li><strong>Section 234B:</strong> Interest @ 1% per month on shortfall if advance tax paid is less than 90% of assessed tax</li>
              <li><strong>Section 234C:</strong> Interest for deferment of individual installments — 1% per month for 3 months for first three installments, 1% for last installment</li>
              <li>Presumptive taxation (Section 44AD/44ADA): Single installment — 100% by 15th March</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
