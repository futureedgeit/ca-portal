export const statsCards = [
  { label: 'Income Tax Slabs', value: 'New Regime', detail: 'FY 2026-27', color: 'blue' },
  { label: 'GST Rate', value: '5-Tier', detail: '0% to 28%', color: 'green' },
  { label: 'Due This Month', value: '4 Filings', detail: 'August 2026', color: 'yellow' },
  { label: 'Latest Notifications', value: '14 New', detail: 'This week', color: 'purple' },
];

export const upcomingDeadlines = [
  { date: '07 Aug 2026', event: 'TDS Payment (Jul)', category: 'TDS', priority: 'high', daysLeft: 7 },
  { date: '10 Aug 2026', event: 'GSTR-7 (TDS under GST)', category: 'GST', priority: 'medium', daysLeft: 10 },
  { date: '11 Aug 2026', event: 'GSTR-1 (Monthly - Jul)', category: 'GST', priority: 'high', daysLeft: 11 },
  { date: '14 Aug 2026', event: 'Advance Tax Installment 1', category: 'Income Tax', priority: 'high', daysLeft: 14 },
  { date: '20 Aug 2026', event: 'GSTR-3B (Jul)', category: 'GST', priority: 'high', daysLeft: 20 },
  { date: '30 Aug 2026', event: 'TDS Return (Q1)', category: 'TDS', priority: 'medium', daysLeft: 30 },
];

export const quickLinks = [
  { label: 'Income Tax Calculator', to: '/calculators', icon: 'Calculator' },
  { label: 'GST Rate Finder', to: '/gst', icon: 'FileText' },
  { label: 'Due Date Calendar', to: '/compliance-calendar', icon: 'CalendarDays' },
  { label: 'Latest Circulars', to: '/news', icon: 'Newspaper' },
  { label: 'ITR Filing Guide', to: '/income-tax', icon: 'FileCheck' },
  { label: 'ROC Compliance', to: '/company-law', icon: 'Building2' },
];

export const recentUpdates = [
  {
    date: '28 Jul 2026',
    title: 'CBDT notifies new ITR forms for AY 2026-27',
    category: 'Income Tax',
    source: 'CBDT Notification',
  },
  {
    date: '25 Jul 2026',
    title: 'GST Council introduces auto-population of GSTR-3B from GSTR-1',
    category: 'GST',
    source: 'CBIC Circular',
  },
  {
    date: '22 Jul 2026',
    title: 'MCA extends AGM deadline for FY 2025-26 by 30 days',
    category: 'Company Law',
    source: 'MCA Order',
  },
  {
    date: '18 Jul 2026',
    title: 'ICAI issues revised Guidance Note on Audit of Banks',
    category: 'Auditing',
    source: 'ICAI Announcement',
  },
  {
    date: '15 Jul 2026',
    title: 'RBI raises repo rate by 25 bps — impact on corporate borrowings',
    category: 'Finance',
    source: 'RBI Press Release',
  },
];
