import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

import IncomeTax from './pages/IncomeTax';
import GST from './pages/GST';
import CompanyLaw from './pages/CompanyLaw';
import AccountingStandards from './pages/AccountingStandards';

import ComplianceCalendar from './pages/ComplianceCalendar';
import Calculators from './pages/Calculators';
import NewsUpdates from './pages/NewsUpdates';
import FormRepository from './pages/FormRepository';
import AuditChecklist from './pages/AuditChecklist';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Income Tax */}
        <Route path="/income-tax" element={<Navigate to="/income-tax/slabs" replace />} />
        <Route path="/income-tax/:section" element={<IncomeTax />} />

        {/* GST */}
        <Route path="/gst" element={<Navigate to="/gst/rates" replace />} />
        <Route path="/gst/:section" element={<GST />} />

        {/* Company Law */}
        <Route path="/company-law" element={<Navigate to="/company-law/types" replace />} />
        <Route path="/company-law/:section" element={<CompanyLaw />} />

        {/* Accounting Standards */}
        <Route path="/accounting-standards" element={<Navigate to="/accounting-standards/indas" replace />} />
        <Route path="/accounting-standards/:section" element={<AccountingStandards />} />

        <Route path="/compliance-calendar" element={<ComplianceCalendar />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/news" element={<NewsUpdates />} />
        <Route path="/forms" element={<FormRepository />} />
        <Route path="/audit-checklist" element={<AuditChecklist />} />
      </Routes>
    </Layout>
  );
}
