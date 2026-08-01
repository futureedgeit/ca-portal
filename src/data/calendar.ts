export const complianceEvents = [
  // July 2026
  { month: 'July', day: 7, event: 'TDS Payment (Jun 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in June 2026. Due date: 7th of next month.' },
  { month: 'July', day: 10, event: 'GSTR-7 (Jun)', category: 'GST', priority: 'medium', description: 'TDS return under GST for June 2026 (by deductor).' },
  { month: 'July', day: 10, event: 'GSTR-8 (Jun)', category: 'GST', priority: 'medium', description: 'TCS return for e-commerce operators.' },
  { month: 'July', day: 11, event: 'GSTR-1 Monthly (Jun)', category: 'GST', priority: 'high', description: 'Monthly outward supplies for turnover > Rs. 1.5 Cr.' },
  { month: 'July', day: 13, event: 'GSTR-5 (Jun)', category: 'GST', priority: 'low', description: 'Non-resident taxable person return.' },
  { month: 'July', day: 13, event: 'GSTR-6 (Jun)', category: 'GST', priority: 'low', description: 'Input Service Distributor return.' },
  { month: 'July', day: 15, event: 'ESI & EPF Payment (Jun)', category: 'Labour Law', priority: 'high', description: 'Monthly PF (15th) & ESI (15th) payment.' },
  { month: 'July', day: 20, event: 'GSTR-3B (Jun)', category: 'GST', priority: 'high', description: 'Summary return for June 2026.' },
  { month: 'July', day: 30, event: 'TDS Return Q1 (FY 2026-27)', category: 'TDS', priority: 'high', description: 'Quarterly TDS return for April-June 2026 quarter.' },
  { month: 'July', day: 31, event: 'ITR Filing (Non-audit) - FY 2025-26', category: 'Income Tax', priority: 'high', description: 'Last date for ITR-1, 2, 3, 4 for non-audit cases.' },

  // August 2026
  { month: 'August', day: 7, event: 'TDS Payment (Jul 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in July 2026.' },
  { month: 'August', day: 10, event: 'GSTR-7 (Jul)', category: 'GST', priority: 'medium', description: 'TDS return under GST.' },
  { month: 'August', day: 11, event: 'GSTR-1 Monthly (Jul)', category: 'GST', priority: 'high', description: 'Monthly outward supplies.' },
  { month: 'August', day: 14, event: 'Advance Tax - 1st Installment', category: 'Income Tax', priority: 'high', description: '15% of estimated tax liability for FY 2026-27.' },
  { month: 'August', day: 15, event: 'ESI & EPF Payment (Jul)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'August', day: 20, event: 'GSTR-3B (Jul)', category: 'GST', priority: 'high', description: 'Summary return for July.' },

  // September 2026
  { month: 'September', day: 7, event: 'TDS Payment (Aug 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in August.' },
  { month: 'September', day: 15, event: 'Advance Tax - 2nd Installment', category: 'Income Tax', priority: 'high', description: '45% of estimated tax liability.' },
  { month: 'September', day: 15, event: 'ESI & EPF Payment (Aug)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'September', day: 30, event: 'DIR-3 KYC (Annual)', category: 'Company Law', priority: 'high', description: 'Annual KYC of all directors.' },
  { month: 'September', day: 30, event: 'AGM Deadline (FY 25-26)', category: 'Company Law', priority: 'high', description: 'Last date to hold AGM for FY ending 31 Mar 2026.' },

  // October 2026
  { month: 'October', day: 7, event: 'TDS Payment (Sep 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in September.' },
  { month: 'October', day: 30, event: 'AOC-4 Filing (FY 25-26)', category: 'Company Law', priority: 'high', description: 'Financial statements filing with ROC (within 30 days of AGM).' },
  { month: 'October', day: 31, event: 'ITR Filing (Audit cases) - FY 25-26', category: 'Income Tax', priority: 'high', description: 'Due date for ITR for tax audit cases and companies.' },
  { month: 'October', day: 31, event: 'Tax Audit Report (Form 3CA/3CB/3CD)', category: 'Income Tax', priority: 'high', description: 'Tax audit report filing deadline.' },
  { month: 'October', day: 31, event: 'MSME-1 Half-Yearly (Apr-Sep)', category: 'Company Law', priority: 'medium', description: 'Half-yearly return of MSME outstanding dues.' },

  // November 2026
  { month: 'November', day: 7, event: 'TDS Payment (Oct 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in October.' },
  { month: 'November', day: 15, event: 'ESI & EPF Payment (Oct)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'November', day: 30, event: 'MGT-7/7A Filing (FY 25-26)', category: 'Company Law', priority: 'high', description: 'Annual return filing (within 60 days of AGM).' },

  // December 2026
  { month: 'December', day: 7, event: 'TDS Payment (Nov 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in November.' },
  { month: 'December', day: 15, event: 'Advance Tax - 3rd Installment', category: 'Income Tax', priority: 'high', description: '75% of estimated tax liability.' },
  { month: 'December', day: 15, event: 'ESI & EPF Payment (Nov)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'December', day: 31, event: 'GSTR-9 Annual Return (FY 25-26)', category: 'GST', priority: 'high', description: 'Annual GST return for all regular taxpayers.' },
  { month: 'December', day: 31, event: 'GSTR-9C Reconciliation (FY 25-26)', category: 'GST', priority: 'medium', description: 'GST audit reconciliation for turnover > Rs. 5 Cr.' },

  // January 2027
  { month: 'January', day: 7, event: 'TDS Payment (Dec 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in December.' },
  { month: 'January', day: 15, event: 'ESI & EPF Payment (Dec)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },

  // March 2027
  { month: 'March', day: 15, event: 'Advance Tax - 4th Installment', category: 'Income Tax', priority: 'high', description: '100% of estimated tax liability.' },
  { month: 'March', day: 31, event: 'FY 2026-27 Closing', category: 'General', priority: 'high', description: 'Financial year end — stock-taking, provisions, year-end adjustments.' },
];
