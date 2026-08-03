export interface CalendarEvent {
  id: number;
  month: string;
  day: number;
  event: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  financialYear: string;
  dueDate: string; // ISO date format YYYY-MM-DD
}

const MONTH_MAP: Record<string, number> = {
  April: 3, May: 4, June: 5, July: 6, August: 7, September: 8,
  October: 9, November: 10, December: 11, January: 0, February: 1, March: 2
};

export const rawComplianceEvents = [
  // April 2026
  { month: 'April', day: 7, event: 'TDS/TCS Payment (Mar 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS/TCS deducted in March 2026.' },
  { month: 'April', day: 11, event: 'GSTR-1 Monthly (Mar 2026)', category: 'GST', priority: 'high', description: 'Monthly GSTR-1 for March 2026.' },
  { month: 'April', day: 15, event: 'ESI & EPF Payment (Mar 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment for March 2026.' },
  { month: 'April', day: 20, event: 'GSTR-3B Monthly (Mar 2026)', category: 'GST', priority: 'high', description: 'Summary GST return for March 2026.' },
  { month: 'April', day: 30, event: 'Challan cum Statement for TDS u/s 194-IA, 194-IB, 194M', category: 'TDS', priority: 'medium', description: 'Due date for issuing TDS certificate.' },

  // May 2026
  { month: 'May', day: 7, event: 'TDS Payment (Apr 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in April 2026.' },
  { month: 'May', day: 11, event: 'GSTR-1 Monthly (Apr 2026)', category: 'GST', priority: 'high', description: 'Monthly outward supplies for April 2026.' },
  { month: 'May', day: 15, event: 'ESI & EPF Payment (Apr 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'May', day: 20, event: 'GSTR-3B (Apr 2026)', category: 'GST', priority: 'high', description: 'Summary GST return for April 2026.' },
  { month: 'May', day: 31, event: 'TDS Return Q4 (FY 2025-26)', category: 'TDS', priority: 'high', description: 'Quarterly TDS statement filing for Q4 of FY 2025-26.' },

  // June 2026
  { month: 'June', day: 7, event: 'TDS Payment (May 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in May 2026.' },
  { month: 'June', day: 11, event: 'GSTR-1 Monthly (May 2026)', category: 'GST', priority: 'high', description: 'Monthly outward supplies for May 2026.' },
  { month: 'June', day: 15, event: 'Advance Tax - 1st Installment (FY 2026-27)', category: 'Income Tax', priority: 'high', description: '15% of advance tax for FY 2026-27.' },
  { month: 'June', day: 15, event: 'Form 16 Issuance (FY 2025-26)', category: 'Income Tax', priority: 'high', description: 'Certificate for tax deducted at source on salary.' },
  { month: 'June', day: 20, event: 'GSTR-3B (May 2026)', category: 'GST', priority: 'high', description: 'Summary GST return for May 2026.' },
  { month: 'June', day: 30, event: 'DPT-3 Annual Return', category: 'Company Law', priority: 'medium', description: 'Return of deposits or outstanding loans/receipts for companies.' },

  // July 2026
  { month: 'July', day: 7, event: 'TDS Payment (Jun 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in June 2026.' },
  { month: 'July', day: 11, event: 'GSTR-1 Monthly (Jun 2026)', category: 'GST', priority: 'high', description: 'Monthly outward supplies for June 2026.' },
  { month: 'July', day: 15, event: 'ESI & EPF Payment (Jun 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'July', day: 20, event: 'GSTR-3B (Jun 2026)', category: 'GST', priority: 'high', description: 'Summary return for June 2026.' },
  { month: 'July', day: 31, event: 'ITR Filing (Non-audit cases) - FY 2025-26', category: 'Income Tax', priority: 'high', description: 'Income Tax Return filing for individuals & non-audit entities.' },
  { month: 'July', day: 31, event: 'TDS Return Q1 (FY 2026-27)', category: 'TDS', priority: 'high', description: 'Quarterly TDS return for April-June 2026 quarter.' },

  // August 2026
  { month: 'August', day: 7, event: 'TDS Payment (Jul 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in July 2026.' },
  { month: 'August', day: 11, event: 'GSTR-1 Monthly (Jul 2026)', category: 'GST', priority: 'high', description: 'Monthly outward supplies for July 2026.' },
  { month: 'August', day: 15, event: 'ESI & EPF Payment (Jul 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'August', day: 20, event: 'GSTR-3B (Jul 2026)', category: 'GST', priority: 'high', description: 'Summary return for July 2026.' },

  // September 2026
  { month: 'September', day: 7, event: 'TDS Payment (Aug 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in August 2026.' },
  { month: 'September', day: 15, event: 'Advance Tax - 2nd Installment (FY 2026-27)', category: 'Income Tax', priority: 'high', description: '45% of estimated advance tax liability.' },
  { month: 'September', day: 15, event: 'ESI & EPF Payment (Aug 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'September', day: 30, event: 'DIR-3 KYC (Annual)', category: 'Company Law', priority: 'high', description: 'Annual KYC of all company directors.' },
  { month: 'September', day: 30, event: 'AGM Deadline (FY 2025-26)', category: 'Company Law', priority: 'high', description: 'Last date to hold Annual General Meeting for FY 2025-26.' },

  // October 2026
  { month: 'October', day: 7, event: 'TDS Payment (Sep 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in September 2026.' },
  { month: 'October', day: 15, event: 'ESI & EPF Payment (Sep 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'October', day: 30, event: 'AOC-4 Filing (FY 2025-26)', category: 'Company Law', priority: 'high', description: 'Filing financial statements with ROC.' },
  { month: 'October', day: 31, event: 'Tax Audit Report (Form 3CA/3CD)', category: 'Income Tax', priority: 'high', description: 'Tax audit report filing for FY 2025-26.' },
  { month: 'October', day: 31, event: 'ITR Filing (Audit cases) - FY 2025-26', category: 'Income Tax', priority: 'high', description: 'Income Tax Return for tax audit cases.' },
  { month: 'October', day: 31, event: 'TDS Return Q2 (FY 2026-27)', category: 'TDS', priority: 'high', description: 'Quarterly TDS return for Jul-Sep 2026 quarter.' },

  // November 2026
  { month: 'November', day: 7, event: 'TDS Payment (Oct 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in October 2026.' },
  { month: 'November', day: 15, event: 'ESI & EPF Payment (Oct 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'November', day: 30, event: 'MGT-7/7A Filing (FY 2025-26)', category: 'Company Law', priority: 'high', description: 'Annual return filing with ROC.' },

  // December 2026
  { month: 'December', day: 7, event: 'TDS Payment (Nov 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in November 2026.' },
  { month: 'December', day: 15, event: 'Advance Tax - 3rd Installment (FY 2026-27)', category: 'Income Tax', priority: 'high', description: '75% of estimated advance tax liability.' },
  { month: 'December', day: 15, event: 'ESI & EPF Payment (Nov 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'December', day: 31, event: 'GSTR-9 & GSTR-9C (FY 2025-26)', category: 'GST', priority: 'high', description: 'Annual GST return and reconciliation statement.' },

  // January 2027
  { month: 'January', day: 7, event: 'TDS Payment (Dec 2026)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in December 2026.' },
  { month: 'January', day: 15, event: 'ESI & EPF Payment (Dec 2026)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'January', day: 31, event: 'TDS Return Q3 (FY 2026-27)', category: 'TDS', priority: 'high', description: 'Quarterly TDS statement for Oct-Dec quarter.' },

  // February 2027
  { month: 'February', day: 7, event: 'TDS Payment (Jan 2027)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in January 2027.' },
  { month: 'February', day: 15, event: 'ESI & EPF Payment (Jan 2027)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },

  // March 2027
  { month: 'March', day: 7, event: 'TDS Payment (Feb 2027)', category: 'TDS', priority: 'high', description: 'Deposit TDS deducted in February 2027.' },
  { month: 'March', day: 15, event: 'Advance Tax - 4th Installment (FY 2026-27)', category: 'Income Tax', priority: 'high', description: '100% of estimated advance tax liability.' },
  { month: 'March', day: 15, event: 'ESI & EPF Payment (Feb 2027)', category: 'Labour Law', priority: 'high', description: 'Monthly PF & ESI payment.' },
  { month: 'March', day: 31, event: 'Financial Year Closing FY 2026-27', category: 'General', priority: 'high', description: 'Final date for FY 2026-27 year-end closing & adjustments.' }
];

// Dynamically generate ISO due dates and assign correct financial year
export const complianceEvents: CalendarEvent[] = rawComplianceEvents.map((item, idx) => {
  const monthIdx = MONTH_MAP[item.month];
  // Months 0-2 (Jan, Feb, Mar) belong to 2027 for FY 2026-27
  const year = monthIdx <= 2 ? 2027 : 2026;
  const monthStr = String(monthIdx + 1).padStart(2, '0');
  const dayStr = String(item.day).padStart(2, '0');
  const dueDate = `${year}-${monthStr}-${dayStr}`;

  return {
    id: idx + 1,
    ...item,
    priority: item.priority as 'high' | 'medium' | 'low',
    financialYear: '2026-27',
    dueDate
  };
});

/**
 * Filter upcoming deadlines starting from today up to the end of the current financial year.
 */
export function getUpcomingDeadlines(referenceDate: Date = new Date()): CalendarEvent[] {
  const todayStr = referenceDate.toISOString().split('T')[0];
  
  return complianceEvents
    .filter(e => e.dueDate >= todayStr)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/**
 * Calculate human-readable days remaining from today to target due date.
 */
export function calculateDaysRemaining(dueDateStr: string, referenceDate: Date = new Date()): number {
  const target = new Date(dueDateStr + 'T00:00:00');
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const diffTime = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
