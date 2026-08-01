export const formCategories = [
  'MCA (Company Law)',
  'Income Tax',
  'GST',
  'TDS',
  'RBI / FEMA',
  'SEBI / LODR',
  'Labour Law (PF/ESI)',
];

export const forms = [
  // MCA Forms (now on V3 portal)
  { id: 1, name: 'AOC-4', description: 'Filing of Financial Statements (Balance Sheet, P&L, Cash Flow, Notes to Accounts). Login to MCA V3 portal to file.', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: 'Within 30 days of AGM' },
  { id: 2, name: 'AOC-4 XBRL', description: 'Filing of Financial Statements in XBRL format (applicable to specified companies)', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: 'Within 30 days of AGM' },
  { id: 3, name: 'MGT-7', description: 'Annual Return (shareholding, directors, meetings, indebtedness details)', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: 'Within 60 days of AGM' },
  { id: 4, name: 'MGT-7A', description: 'Abridged Annual Return for OPC and Small Companies', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: 'Within 60 days of AGM' },
  { id: 5, name: 'ADT-1', description: 'Appointment of Auditor (within 15 days of AGM)', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '15 days from AGM' },
  { id: 6, name: 'ADT-3', description: 'Resignation of Auditor', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30 days from resignation' },
  { id: 7, name: 'DIR-3 KYC', description: 'Annual KYC of Directors (DIN holders)', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30th September yearly' },
  { id: 8, name: 'DIR-12', description: 'Appointment / Resignation / Change in Designation of Directors & KMP', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30 days from event' },
  { id: 9, name: 'DPT-3', description: 'Return of Deposits / Outstanding Loans not considered as Deposits', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30th June yearly' },
  { id: 10, name: 'MGT-14', description: 'Filing of Resolutions and Agreements with ROC', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30 days from resolution' },
  { id: 11, name: 'MSME-1', description: 'Half-Yearly Return of Outstanding Dues to Micro & Small Enterprises', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '31 Oct / 30 Apr' },
  { id: 12, name: 'INC-22', description: 'Notice of Change in Registered Office Address', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '15 days from change' },
  { id: 13, name: 'PAS-3', description: 'Return of Allotment of Shares', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30 days from allotment' },
  { id: 14, name: 'SH-7', description: 'Notice to ROC for Alteration of Share Capital', category: 'MCA (Company Law)', link: 'https://www.mca.gov.in/', dueDate: '30 days from alteration' },

  // Income Tax Forms
  { id: 20, name: 'ITR-1 (SAHAJ)', description: 'ITR for resident individuals with income up to Rs. 50L from salary, one house property, other sources', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 July' },
  { id: 21, name: 'ITR-2', description: 'ITR for individuals/HUF not having business/profession income', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 July' },
  { id: 22, name: 'ITR-3', description: 'ITR for individuals/HUF having income from business or profession', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 July / 31 Oct' },
  { id: 23, name: 'ITR-4 (SUGAM)', description: 'ITR for presumptive income taxpayers (Section 44AD, 44ADA, 44AE)', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 July' },
  { id: 24, name: 'ITR-5', description: 'ITR for firms, LLPs, AOPs, BOIs', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 July / 31 Oct' },
  { id: 25, name: 'ITR-6', description: 'ITR for companies (other than those claiming Section 11 exemption)', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 October' },
  { id: 26, name: 'ITR-7', description: 'ITR for trusts, political parties, institutions claiming exemption under Section 11/12', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '31 October' },
  { id: 27, name: 'Form 3CA', description: 'Tax Audit Report (audit under any other Act before Income Tax audit) — Available in ITBA portal', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '30 September' },
  { id: 28, name: 'Form 3CB', description: 'Tax Audit Report (audit only under Income Tax Act) — Available in ITBA portal', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '30 September' },
  { id: 29, name: 'Form 3CD', description: 'Tax Audit Report — Statement of Particulars (annexure to 3CA/3CB)', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: '30 September' },
  { id: 30, name: 'Form 15CA', description: 'Remittance to Non-Resident — Undertaking and Certificate of Accountant', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: 'Before remittance' },
  { id: 31, name: 'Form 15CB', description: 'Certificate of Accountant for Foreign Remittances', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: 'Before remittance' },
  { id: 32, name: 'Form 10-IC', description: 'Option to be taxed under Section 115BAA (22% corporate rate)', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: 'Before ITR due date' },
  { id: 33, name: 'Form 10-ID', description: 'Option to be taxed under Section 115BAB (15% for new manufacturing companies)', category: 'Income Tax', link: 'https://www.incometax.gov.in/', dueDate: 'Before ITR due date' },

  // TDS Forms
  { id: 60, name: 'Form 24Q', description: 'Quarterly TDS Return — Salary Payments. File via TRACES or ITBA portal.', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: 'Qtr: 31 Jul / 31 Oct / 31 Jan / 31 May' },
  { id: 61, name: 'Form 26Q', description: 'Quarterly TDS Return — Non-Salary Payments (Residents)', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: 'Qtr: 31 Jul / 31 Oct / 31 Jan / 31 May' },
  { id: 62, name: 'Form 27Q', description: 'Quarterly TDS Return — Payments to Non-Residents', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: 'Qtr: 31 Jul / 31 Oct / 31 Jan / 31 May' },
  { id: 63, name: 'Form 26AS', description: 'Annual Tax Credit Statement (TDS/TCS/Tax Paid) — View on TRACES portal', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: 'Auto-generated' },
  { id: 64, name: 'Form 16', description: 'TDS Certificate for Salary (Part A by Employer; Part B by Employer)', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: '15 June of next FY' },
  { id: 65, name: 'Form 16A', description: 'TDS Certificate for Non-Salary Payments — Download from TRACES', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: '15 days from 26Q/27Q due date' },
  { id: 66, name: 'Form 27C', description: 'Declaration for Non-Deduction of TCS on Goods (Section 206C)', category: 'TDS', link: 'https://www.incometax.gov.in/', dueDate: 'Before transaction' },

  // RBI/FEMA Forms
  { id: 80, name: 'FC-GPR', description: 'Filing for Issue of Shares to Non-Residents (FDI)', category: 'RBI / FEMA', link: 'https://firms.rbi.org.in/', dueDate: '30 days from allotment' },
  { id: 81, name: 'FC-TRS', description: 'Transfer of Shares between Resident and Non-Resident', category: 'RBI / FEMA', link: 'https://firms.rbi.org.in/', dueDate: '60 days from transfer' },
  { id: 82, name: 'FLA Return', description: 'Foreign Liabilities and Assets Annual Return', category: 'RBI / FEMA', link: 'https://firms.rbi.org.in/', dueDate: '15 July' },
  { id: 83, name: 'APR (Form ECB-2)', description: 'Monthly Return for External Commercial Borrowings', category: 'RBI / FEMA', link: 'https://firms.rbi.org.in/', dueDate: '7th of every month' },
  { id: 84, name: 'Form ODI', description: 'Overseas Direct Investment Reporting', category: 'RBI / FEMA', link: 'https://firms.rbi.org.in/', dueDate: 'As applicable' },

  // SEBI Forms
  { id: 90, name: 'SEBI LODR Reg 31', description: 'Shareholding Pattern Disclosure (Quarterly)', category: 'SEBI / LODR', link: 'https://www.sebi.gov.in/filings.html', dueDate: '21 days from quarter end' },
  { id: 91, name: 'SEBI LODR Reg 33', description: 'Financial Results (Quarterly / Annual)', category: 'SEBI / LODR', link: 'https://www.sebi.gov.in/filings.html', dueDate: '45 days from quarter end (60 for annual)' },
  { id: 92, name: 'SEBI LODR Reg 34', description: 'Annual Report (Including Notice of AGM)', category: 'SEBI / LODR', link: 'https://www.sebi.gov.in/filings.html', dueDate: 'Not later than day of dispatch to shareholders' },
  { id: 93, name: 'SEBI LODR Reg 24A', description: 'Secretarial Compliance Report', category: 'SEBI / LODR', link: 'https://www.sebi.gov.in/filings.html', dueDate: '60 days from FY end' },
  { id: 94, name: 'SEBI PIT Reg 7(2)', description: 'Continuous Disclosures — Insider Trading', category: 'SEBI / LODR', link: 'https://www.sebi.gov.in/filings.html', dueDate: '2 trading days from transaction' },

  // Labour Law Forms
  { id: 100, name: 'PF Return (ECR)', description: 'Electronic Challan-cum-Return for EPF contributions (monthly)', category: 'Labour Law (PF/ESI)', link: 'https://unifiedportal-epfo.epfindia.gov.in/', dueDate: '15th of every month' },
  { id: 101, name: 'ESI Return', description: 'Monthly ESI Contribution Return', category: 'Labour Law (PF/ESI)', link: 'https://www.esic.gov.in/', dueDate: '15th of every month' },
  { id: 102, name: 'Form 5 (PF)', description: 'Return of Employees Qualifying for PF Membership (new joiners)', category: 'Labour Law (PF/ESI)', link: 'https://unifiedportal-epfo.epfindia.gov.in/', dueDate: '15th of every month' },
  { id: 103, name: 'Form 10 (PF)', description: 'Return of Members Leaving Service (resignations/terminations)', category: 'Labour Law (PF/ESI)', link: 'https://unifiedportal-epfo.epfindia.gov.in/', dueDate: '15th of every month' },
];
