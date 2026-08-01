export const companyTypes = [
  { type: 'Private Limited Company', minMembers: 2, maxMembers: 200, minCapital: 'No minimum (Companies Amendment Act 2015)', features: 'Restricts right to transfer shares; prohibits public invitation for securities' },
  { type: 'Public Limited Company', minMembers: 7, maxMembers: 'Unlimited', minCapital: 'No minimum (Companies Amendment Act 2015)', features: 'Can list on stock exchange; can invite public to subscribe shares' },
  { type: 'One Person Company (OPC)', minMembers: 1, maxMembers: 1, minCapital: 'No minimum', features: 'Only natural person, resident in India; must nominate a nominee; turnover <= Rs. 20 Cr / capital <= Rs. 2 Cr' },
  { type: 'Section 8 Company (NPO)', minMembers: '2 (Pvt) / 7 (Public)', maxMembers: 'As applicable', minCapital: 'No minimum', features: 'For charitable objects; profits applied for promoting objects; no dividend to members' },
  { type: 'Limited Liability Partnership (LLP)', minMembers: 2, maxMembers: 'Unlimited', minCapital: 'No minimum', features: 'Governed by LLP Act 2008; hybrid of company and partnership; limited liability for partners' },
  { type: 'Producer Company', minMembers: '10 (individuals) / 2 (institutions)', maxMembers: 'Unlimited', minCapital: 'Rs. 5 Lakhs', features: 'For primary producers (farmers, artisans); mutual assistance principles' },
];

export const annualFilings = [
  { form: 'AOC-4', description: 'Financial Statements (Balance Sheet, P&L, Cash Flow, Notes)', dueDate: 'Within 30 days of AGM', penalty: 'Rs. 100/day (no max for company; max Rs. 5L for officers)', section: 'Section 137' },
  { form: 'MGT-7 / MGT-7A', description: 'Annual Return (shareholding, directors, meetings, indebtedness)', dueDate: '60 days from AGM', penalty: 'Rs. 100/day (max Rs. 5L for company and officers)', section: 'Section 92' },
  { form: 'ADT-1', description: 'Appointment of Auditor (within 15 days of AGM)', dueDate: '15 days from AGM', penalty: 'Rs. 25,000 (company) + Rs. 5,000 (officer)', section: 'Section 139' },
  { form: 'DIR-3 KYC', description: 'KYC of Directors (Annual)', dueDate: '30th September each year', penalty: 'Rs. 5,000 (one-time)', section: 'Rule 12A' },
  { form: 'DPT-3', description: 'Return of Deposits / Outstanding Loans', dueDate: '30th June each year', penalty: 'Rs. 25,000-3,00,000', section: 'Rule 16' },
  { form: 'MSME-1', description: 'Half-yearly return of outstanding dues to MSME', dueDate: '31 Oct (Apr-Sep) / 30 Apr (Oct-Mar)', penalty: 'Rs. 25,000 (company)', section: 'MSMED Act Order' },
  { form: 'MGT-14', description: 'Filing of resolutions (board/shareholder) for specified matters', dueDate: '30 days from passing resolution', penalty: 'Rs. 1,00,000 minimum', section: 'Section 117' },
];

export const meetings = [
  { meeting: 'First Board Meeting', timeline: 'Within 30 days of incorporation', frequency: 'Once', quorum: '1/3rd or 2 directors, whichever is higher' },
  { meeting: 'Board Meetings', timeline: 'At least 4 meetings per calendar year (max gap 120 days)', frequency: 'Quarterly', quorum: '1/3rd or 2 directors, whichever is higher' },
  { meeting: 'OPC Board Meeting', timeline: 'One meeting in each half-year (gap > 90 days)', frequency: '2 meetings/year', quorum: 'Sole director can participate' },
  { meeting: 'Annual General Meeting (AGM)', timeline: 'Within 6 months from FY end (30 Sep). First AGM within 9 months.', frequency: 'Yearly', quorum: 'Pvt: 2 members; Public: 5 or more as per AoA' },
  { meeting: 'Extraordinary General Meeting (EGM)', timeline: 'As required (within 21 days of requisition)', frequency: 'As needed', quorum: 'Same as AGM quorum' },
];

export const csrRules = [
  { criteria: 'Net Worth >= Rs. 500 Cr', obligation: '2% of average net profits of preceding 3 years' },
  { criteria: 'Turnover >= Rs. 1,000 Cr', obligation: '2% of average net profits of preceding 3 years' },
  { criteria: 'Net Profit >= Rs. 5 Cr', obligation: '2% of average net profits of preceding 3 years' },
];
