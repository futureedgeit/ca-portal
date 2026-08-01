import { useState } from 'react';
import { Calculator, IndianRupee, Percent, TrendingDown } from 'lucide-react';

function IncomeTaxCalculator() {
  const [income, setIncome] = useState('');
  const [regime, setRegime] = useState<'new' | 'old'>('new');

  const calculateTax = () => {
    const inc = parseFloat(income) || 0;

    if (regime === 'new') {
      if (inc <= 400000) return { tax: 0, effectiveRate: '0' };
      if (inc <= 800000) return { tax: (inc - 400000) * 0.05, effectiveRate: ((inc - 400000) * 0.05 / inc * 100).toFixed(2) };
      if (inc <= 1200000) return { tax: 20000 + (inc - 800000) * 0.10, effectiveRate: ((20000 + (inc - 800000) * 0.10) / inc * 100).toFixed(2) };
      if (inc <= 1600000) return { tax: 60000 + (inc - 1200000) * 0.15, effectiveRate: ((60000 + (inc - 1200000) * 0.15) / inc * 100).toFixed(2) };
      if (inc <= 2000000) return { tax: 120000 + (inc - 1600000) * 0.20, effectiveRate: ((120000 + (inc - 1600000) * 0.20) / inc * 100).toFixed(2) };
      if (inc <= 2400000) return { tax: 200000 + (inc - 2000000) * 0.25, effectiveRate: ((200000 + (inc - 2000000) * 0.25) / inc * 100).toFixed(2) };
      return { tax: 300000 + (inc - 2400000) * 0.30, effectiveRate: ((300000 + (inc - 2400000) * 0.30) / inc * 100).toFixed(2) };
    } else {
      if (inc <= 250000) return { tax: 0, effectiveRate: '0' };
      if (inc <= 500000) return { tax: (inc - 250000) * 0.05, effectiveRate: ((inc - 250000) * 0.05 / inc * 100).toFixed(2) };
      if (inc <= 1000000) return { tax: 12500 + (inc - 500000) * 0.20, effectiveRate: ((12500 + (inc - 500000) * 0.20) / inc * 100).toFixed(2) };
      return { tax: 112500 + (inc - 1000000) * 0.30, effectiveRate: ((112500 + (inc - 1000000) * 0.30) / inc * 100).toFixed(2) };
    }
  };

  const result = income ? calculateTax() : null;
  const cess = result ? result.tax * 0.04 : 0;
  const totalTax = result ? result.tax + cess : 0;
  const rebate = regime === 'new' && income && parseFloat(income) <= 1200000 ? Math.min(totalTax, 25000) : regime === 'old' && income && parseFloat(income) <= 500000 ? Math.min(totalTax, 12500) : 0;
  const netTax = totalTax - rebate;

  return (
    <div className="card space-y-4">
      <h3 className="text-lg font-semibold text-primary-500 flex items-center gap-2">
        <IndianRupee size={20} /> Income Tax Calculator (FY 2025-26)
      </h3>
      <div className="flex gap-3 mb-3">
        <button onClick={() => setRegime('new')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${regime === 'new' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>New Regime</button>
        <button onClick={() => setRegime('old')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${regime === 'old' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Old Regime</button>
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Annual Taxable Income (Rs.)</label>
        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Enter annual income..." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      {result && (
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Tax on Income</span><span className="font-semibold">Rs. {result.tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Health & Education Cess (4%)</span><span className="font-semibold">Rs. {cess.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Total Tax</span><span className="font-semibold">Rs. {totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
          {rebate > 0 && <div className="flex justify-between text-sm"><span className="text-green-600">Less: Rebate u/s 87A</span><span className="font-semibold text-green-600">- Rs. {rebate.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>}
          <div className="flex justify-between text-base pt-2 border-t border-gray-200"><span className="font-bold text-gray-800">Net Tax Payable</span><span className="font-bold text-primary-500">Rs. {netTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between text-xs"><span className="text-gray-400">Effective Tax Rate</span><span className="text-gray-400">{result.effectiveRate}%</span></div>
        </div>
      )}
    </div>
  );
}

function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('18');
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const calc = () => {
    const amt = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;
    if (mode === 'add') {
      const gst = amt * r / 100;
      return { base: amt, gst, total: amt + gst };
    } else {
      const base = amt / (1 + r / 100);
      return { base, gst: amt - base, total: amt };
    }
  };

  const result = amount ? calc() : null;

  return (
    <div className="card space-y-4">
      <h3 className="text-lg font-semibold text-primary-500 flex items-center gap-2">
        <Percent size={20} /> GST Calculator
      </h3>
      <div className="flex gap-3 mb-3">
        <button onClick={() => setMode('add')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'add' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Add GST</button>
        <button onClick={() => setMode('remove')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'remove' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Remove GST</button>
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">{mode === 'add' ? 'Base Amount (Rs.)' : 'Gross Amount (Rs.)'}</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">GST Rate</label>
        <div className="flex flex-wrap gap-2">
          {['0', '5', '12', '18', '28'].map((r) => (
            <button key={r} onClick={() => setRate(r)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${rate === r ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r}%</button>
          ))}
        </div>
      </div>
      {result && (
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Base Value</span><span className="font-semibold">Rs. {result.base.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">CGST ({parseFloat(rate)/2}%)</span><span className="font-semibold">Rs. {(result.gst / 2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">SGST ({parseFloat(rate)/2}%)</span><span className="font-semibold">Rs. {(result.gst / 2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
          <div className="flex justify-between text-base pt-2 border-t border-gray-200"><span className="font-bold text-gray-800">{mode === 'add' ? 'Total (incl. GST)' : 'Base (excl. GST)'}</span><span className="font-bold text-primary-500">Rs. {mode === 'add' ? result.total.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : result.base.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
        </div>
      )}
    </div>
  );
}

function DepreciationCalculator() {
  const [cost, setCost] = useState('');
  const [salvage, setSalvage] = useState('5');
  const [life, setLife] = useState('15');
  const [method, setMethod] = useState<'wdv' | 'slm'>('wdv');
  const [act, setAct] = useState<'companies' | 'it'>('companies');

  const rates: Record<'companies' | 'it', { class: string; rate: string }[]> = {
    companies: [
      { class: 'Building (Non-factory)', rate: '5%' },
      { class: 'Building (Factory)', rate: '10%' },
      { class: 'Furniture & Fittings', rate: '10%' },
      { class: 'Computers', rate: '40%' },
      { class: 'Plant & Machinery (General)', rate: '15%' },
      { class: 'Motor Vehicles', rate: '25%' },
      { class: 'Intangible Assets (Software)', rate: '25%' },
    ],
    it: [
      { class: 'Building (Residential)', rate: '5%' },
      { class: 'Building (Non-residential)', rate: '10%' },
      { class: 'Furniture & Fittings', rate: '10%' },
      { class: 'Computers & Software', rate: '40%' },
      { class: 'P&M (General) 15% Block', rate: '15%' },
      { class: 'Motor Vehicles', rate: '15%' },
      { class: 'P&M (30% Block)', rate: '30%' },
      { class: 'P&M (45% Block)', rate: '45%' },
    ],
  };

  const calcDepreciation = () => {
    const c = parseFloat(cost) || 0;
    const s = (parseFloat(salvage) || 0) / 100;
    const n = parseInt(life) || 1;

    if (method === 'slm') {
      const annual = (c - c * s) / n;
      return { annual, methodName: 'Straight Line Method (SLM)', rate: undefined };
    } else {
      const rate = 1 - Math.pow(s, 1 / n);
      const annual = c * rate;
      return { annual, methodName: 'Written Down Value (WDV)', rate: (rate * 100).toFixed(2) };
    }
  };

  const result = cost ? calcDepreciation() : null;

  return (
    <div className="card space-y-4">
      <h3 className="text-lg font-semibold text-primary-500 flex items-center gap-2">
        <TrendingDown size={20} /> Depreciation Calculator
      </h3>
      <div className="flex gap-3 mb-3">
        <button onClick={() => setAct('companies')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${act === 'companies' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Companies Act</button>
        <button onClick={() => setAct('it')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${act === 'it' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>Income Tax</button>
      </div>
      <div className="flex gap-3 mb-3">
        <button onClick={() => setMethod('wdv')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${method === 'wdv' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>WDV Method</button>
        <button onClick={() => setMethod('slm')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${method === 'slm' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>SLM Method</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Asset Cost (Rs.)</label>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="e.g. 500000" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Residual Value (%)</label>
          <input type="number" value={salvage} onChange={(e) => setSalvage(e.target.value)} placeholder="5" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Useful Life (Years)</label>
          <input type="number" value={life} onChange={(e) => setLife(e.target.value)} placeholder="15" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <span className="font-semibold">Quick Reference — {act === 'companies' ? 'Companies Act (Schedule II)' : 'Income Tax Act'} Rates:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {rates[act].map((r, i) => (
            <span key={i} className="tag tag-blue text-xs">{r.class}: {r.rate}</span>
          ))}
        </div>
      </div>

      {result && (
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">{result.methodName}</p>
          <div className="flex justify-between text-base pt-2 border-t border-gray-200">
            <span className="font-bold text-gray-800">Annual Depreciation</span>
            <span className="font-bold text-primary-500">Rs. {result.annual.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
          {result.rate && <div className="flex justify-between text-sm"><span className="text-gray-500">WDV Rate</span><span className="font-semibold">{result.rate}%</span></div>}
        </div>
      )}
    </div>
  );
}

export default function Calculators() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500 flex items-center gap-2">
          <Calculator size={28} /> Tax & Financial Calculators
        </h1>
        <p className="text-gray-500 mt-1">Interactive calculators for income tax, GST, depreciation, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeTaxCalculator />
        <GSTCalculator />
      </div>
      <DepreciationCalculator />
    </div>
  );
}
