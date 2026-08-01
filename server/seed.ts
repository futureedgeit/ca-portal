import db from './database.js';

// Skip if already seeded
const existing = db.prepare('SELECT COUNT(*) as count FROM compliance_dates').get() as { count: number };
if (existing && existing.count > 0) {
  console.log('Database already seeded (' + existing.count + ' compliance dates). Skipping seed.');
  console.log('Use admin panel at http://localhost:3001/admin to manage data.');
  process.exit(0);
}

console.log('Seeding database...');

const complianceDates = [
  ['July', 7, 'TDS Payment (Jun 2026)', 'TDS', 'high', 'Deposit TDS deducted in June 2026'],
  ['July', 11, 'GSTR-1 Monthly (Jun)', 'GST', 'high', 'Monthly outward supplies for turnover > Rs. 1.5 Cr'],
  ['July', 15, 'ESI & EPF Payment (Jun)', 'Labour Law', 'high', 'Monthly PF & ESI payment'],
  ['July', 20, 'GSTR-3B (Jun)', 'GST', 'high', 'Summary return for June 2026'],
  ['July', 30, 'TDS Return Q1 (FY 2026-27)', 'TDS', 'high', 'Quarterly TDS return for Apr-Jun 2026'],
  ['July', 31, 'ITR Filing (Non-audit cases)', 'Income Tax', 'high', 'Last date for ITR-1,2,3,4 for non-audit'],
  ['August', 14, 'Advance Tax - 1st Installment', 'Income Tax', 'high', '15% of estimated tax liability'],
  ['August', 20, 'GSTR-3B (Jul)', 'GST', 'high', 'Summary return for July 2026'],
  ['September', 15, 'Advance Tax - 2nd Installment', 'Income Tax', 'high', '45% of estimated tax liability'],
  ['September', 30, 'AGM Deadline (FY 25-26)', 'Company Law', 'high', 'Last date to hold AGM'],
  ['September', 30, 'DIR-3 KYC (Annual)', 'Company Law', 'high', 'Annual KYC of all directors'],
  ['October', 30, 'AOC-4 Filing (FY 25-26)', 'Company Law', 'high', 'Financial statements filing with ROC'],
  ['October', 31, 'ITR Filing (Audit cases)', 'Income Tax', 'high', 'Due date for ITR for tax audit cases'],
  ['October', 31, 'Tax Audit Report (3CA/3CB/3CD)', 'Income Tax', 'high', 'Tax audit report filing deadline'],
  ['November', 30, 'MGT-7/7A Filing', 'Company Law', 'high', 'Annual return filing'],
  ['December', 15, 'Advance Tax - 3rd Installment', 'Income Tax', 'high', '75% of estimated tax liability'],
  ['December', 31, 'GSTR-9 Annual Return', 'GST', 'high', 'Annual GST return'],
  ['March', 15, 'Advance Tax - 4th Installment', 'Income Tax', 'high', '100% of estimated tax liability'],
];

for (const row of complianceDates) {
  db.prepare('INSERT INTO compliance_dates (month, day, event, category, priority, description) VALUES (?,?,?,?,?,?)').run(...row);
}

const taxRates = [
  ['Income Tax', 'New Regime: 0-4L', 'Nil', 'Income up to Rs. 4,00,000', '2025-04-01'],
  ['Income Tax', 'New Regime: 4-8L', '5%', 'Income Rs. 4,00,001 - 8,00,000', '2025-04-01'],
  ['Income Tax', 'New Regime: 8-12L', '10%', 'Income Rs. 8,00,001 - 12,00,000', '2025-04-01'],
  ['Income Tax', 'New Regime: 12-16L', '15%', 'Income Rs. 12,00,001 - 16,00,000', '2025-04-01'],
  ['Income Tax', 'New Regime: 16-20L', '20%', 'Income Rs. 16,00,001 - 20,00,000', '2025-04-01'],
  ['Income Tax', 'New Regime: 20-24L', '25%', 'Income Rs. 20,00,001 - 24,00,000', '2025-04-01'],
  ['Income Tax', 'New Regime: Above 24L', '30%', 'Income above Rs. 24,00,000', '2025-04-01'],
  ['GST', 'Exempted/Nil Rated', '0%', 'Essential goods: fresh produce, milk, bread, books', '2017-07-01'],
  ['GST', 'Lower Rate', '5%', 'Sugar, tea, coffee, edible oil, LPG, insulin', '2017-07-01'],
  ['GST', 'Standard Lower', '12%', 'Butter, ghee, cheese, fruit juices, mobiles', '2017-07-01'],
  ['GST', 'Standard Rate', '18%', 'Biscuits, soaps, IT services, telecom', '2017-07-01'],
  ['GST', 'Highest Rate', '28%', 'Pan masala, automobiles, cement, ACs', '2017-07-01'],
  ['GST', 'Sin/Demerit Goods', '28% + Cess', 'Cigarettes, tobacco, aerated drinks', '2017-07-01'],
  ['TDS', '194C - Contractors', '1% / 2%', 'Individual/HUF: 1%, Others: 2%', '2025-04-01'],
  ['TDS', '194J - Professional Fees', '2% / 10%', 'Technical: 2%, Others: 10%', '2025-04-01'],
  ['TDS', '194I - Rent', '2% / 10%', 'P&M: 2%, Land/Building: 10%', '2025-04-01'],
];

for (const row of taxRates) {
  db.prepare('INSERT INTO tax_rates (category, sub_category, rate, description, effective_from) VALUES (?,?,?,?,?)').run(...row);
}

const seedNews = [
  ['CBDT Notifies New ITR Forms for AY 2026-27', 'The Central Board of Direct Taxes has notified the new ITR forms with enhanced reporting for crypto assets and foreign assets.', 'Income Tax', 'CBDT', 'All taxpayers', '2026-07-28'],
  ['GST Council Introduces Auto-Population of GSTR-3B', 'GSTR-3B will now be auto-populated from GSTR-1 to reduce reconciliation burden.', 'GST', 'CBIC', 'All GST registrants', '2026-07-25'],
  ['MCA Extends AGM Deadline for FY 2025-26', 'The Ministry of Corporate Affairs has extended AGM timeline by 30 days.', 'Company Law', 'MCA', 'All companies', '2026-07-22'],
  ['ICAI Issues Revised Guidance Note on Bank Audits', 'New GN incorporates RBI IRAC norms and updated LFAR formats.', 'Auditing', 'ICAI', 'Bank auditors', '2026-07-18'],
  ['RBI Raises Repo Rate by 25 bps to 6.75%', 'MPC cites persistent inflation as reason for rate hike.', 'Finance', 'RBI', 'All businesses', '2026-07-15'],
];

for (const row of seedNews) {
  db.prepare('INSERT INTO news (title, summary, category, source, impact, published_date) VALUES (?,?,?,?,?,?)').run(...row);
}

console.log('Database seeded successfully!');
console.log(`  - ${complianceDates.length} compliance dates`);
console.log(`  - ${taxRates.length} tax rates`);
console.log(`  - ${seedNews.length} seed news items`);

// Try fetching live news
console.log('\nFetching live news from Google News RSS...');
try {
  const { fetchAllNews } = await import('./scrapers/index.js');
  const results = await fetchAllNews();
  let total = 0;
  results.forEach((r: any) => { if (r.inserted) total += r.inserted; });
  console.log(`Total new articles: ${total}`);
} catch (err: any) {
  console.log('Live fetch error (non-fatal):', err.message);
}

process.exit(0);
