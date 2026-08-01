// Shared checklist items used across all client types
const preEngagement = [
  { id: 'PE01', area: 'Client Acceptance', procedure: 'Obtain understanding of client business, ownership, and management structure', reference: 'SA 210' },
  { id: 'PE02', area: 'Independence', procedure: 'Confirm independence of audit firm and engagement team members', reference: 'SA 200, Code of Ethics' },
  { id: 'PE03', area: 'Engagement Letter', procedure: 'Issue engagement letter outlining scope, responsibilities, and fees', reference: 'SA 210' },
  { id: 'PE04', area: 'Previous Auditor', procedure: 'Communicate with previous auditor (if applicable) per ICAI guidelines', reference: 'SA 210, ICAI Guidelines' },
  { id: 'PE05', area: 'Team Planning', procedure: 'Identify engagement team, specialist requirements, and budgeted hours', reference: 'SA 220, SA 300' },
];

const planning = [
  { id: 'PL01', area: 'Risk Assessment', procedure: 'Perform risk assessment procedures — inquiries, analytics, observation', reference: 'SA 315' },
  { id: 'PL02', area: 'Materiality', procedure: 'Determine overall materiality and performance materiality', reference: 'SA 320' },
  { id: 'PL03', area: 'Fraud Risk', procedure: 'Assess risk of material misstatement due to fraud; discuss among team', reference: 'SA 240' },
  { id: 'PL04', area: 'Laws & Regulations', procedure: 'Obtain understanding of applicable laws and regulations', reference: 'SA 250' },
  { id: 'PL05', area: 'Internal Control', procedure: 'Evaluate design and implementation of internal controls relevant to audit', reference: 'SA 315' },
  { id: 'PL06', area: 'Related Parties', procedure: 'Identify related parties and related party transactions', reference: 'SA 550' },
  { id: 'PL07', area: 'Going Concern', procedure: 'Assess management\'s going concern evaluation', reference: 'SA 570' },
  { id: 'PL08', area: 'Audit Programme', procedure: 'Prepare detailed audit programme addressing assessed risks', reference: 'SA 300, SA 330' },
];

const generalProcedures = [
  { id: 'GP01', area: 'Fixed Assets', procedure: 'Verify additions, deletions; physical verification; depreciation as per Schedule II of Companies Act', reference: 'SA 500, Ind AS 16, CARO (i)' },
  { id: 'GP02', area: 'Inventory', procedure: 'Attend physical inventory count; test valuation (lower of cost and NRV); slow-moving/obsolete provision', reference: 'SA 501, Ind AS 2, CARO (ii)' },
  { id: 'GP03', area: 'Trade Receivables', procedure: 'Send balance confirmations; test subsequent receipts; evaluate ECL provision per Ind AS 109', reference: 'SA 505, Ind AS 109' },
  { id: 'GP04', area: 'Cash & Bank', procedure: 'Obtain bank confirmations directly; perform bank reconciliation; verify FD, OD, CC accounts', reference: 'SA 505' },
  { id: 'GP05', area: 'Loans & Advances', procedure: 'Verify terms, security, repayment schedule; test for compliance with Sec 185/186 of Companies Act', reference: 'SA 500, CARO (iii)(iv)' },
  { id: 'GP06', area: 'Trade Payables', procedure: 'Test subsequent payments; obtain supplier confirmations; verify MSME dues and disclosures', reference: 'SA 505, MSMED Act' },
  { id: 'GP07', area: 'Revenue', procedure: 'Test revenue recognition as per Ind AS 115 (5-step model); cut-off testing at year-end', reference: 'SA 500, Ind AS 115' },
  { id: 'GP08', area: 'Expenses', procedure: 'Analytical review (monthly trends, % of revenue); test material expense transactions', reference: 'SA 520' },
  { id: 'GP09', area: 'Payroll', procedure: 'Test payroll records; verify PF/ESI/TDS compliance; reconcile with Form 24Q/26Q', reference: 'SA 500' },
  { id: 'GP10', area: 'Statutory Dues', procedure: 'Verify deposit of GST, TDS, PF, ESI, Professional Tax; obtain certificates from authorities', reference: 'CARO (vii)' },
  { id: 'GP11', area: 'Borrowings', procedure: 'Obtain balance confirmations from banks/FIs; verify interest cost, security creation, end-use', reference: 'SA 505, CARO (ix)' },
  { id: 'GP12', area: 'Provisions & Contingencies', procedure: 'Evaluate provisions (warranty, legal, restructuring); review contingent liabilities disclosure', reference: 'Ind AS 37, SA 540' },
  { id: 'GP13', area: 'Income Tax', procedure: 'Verify current tax provision, deferred tax computation; MAT credit; TDS reconciliation', reference: 'Ind AS 12, SA 540' },
  { id: 'GP14', area: 'Related Party Transactions', procedure: 'Verify RPTs at arm\'s length; review board/audit committee approvals; disclosure per Ind AS 24', reference: 'Ind AS 24, CARO (xii), SA 550' },
  { id: 'GP15', area: 'Subsequent Events', procedure: 'Review events after balance sheet date up to audit report date for adjusting/non-adjusting items', reference: 'SA 560, Ind AS 10' },
];

const completion = [
  { id: 'CC01', area: 'Misstatements', procedure: 'Evaluate identified misstatements — individually and in aggregate — against materiality', reference: 'SA 450' },
  { id: 'CC02', area: 'Management Representations', procedure: 'Obtain written representation letter from management and TCWG', reference: 'SA 580' },
  { id: 'CC03', area: 'Going Concern', procedure: 'Conclude on appropriateness of going concern basis; consider material uncertainties', reference: 'SA 570' },
  { id: 'CC04', area: 'Audit Report', procedure: 'Form audit opinion; consider KAM reporting per SA 701; prepare CARO report', reference: 'SA 700, SA 701, SA 705, CARO' },
  { id: 'CC05', area: 'Audit Documentation', procedure: 'Complete and archive audit file; ensure all workpapers are signed off and cross-referenced', reference: 'SA 230' },
  { id: 'CC06', area: 'Communication with TCWG', procedure: 'Communicate significant findings, corrected/uncorrected misstatements to Those Charged with Governance', reference: 'SA 260, SA 265' },
  { id: 'CC07', area: 'Independence Confirmation', procedure: 'Obtain final independence confirmation from engagement team; evaluate any threats', reference: 'Code of Ethics' },
  { id: 'CC08', area: 'Quality Review', procedure: 'Engagement Quality Control Review (EQCR) if applicable; partner review and sign-off', reference: 'SA 220, SQC 1' },
];

// Type-specific additions
const manufacturing = [
  { id: 'MF01', area: 'Inventory Valuation', procedure: 'Test absorption of fixed and variable overheads into inventory; verify WIP valuation', reference: 'Ind AS 2' },
  { id: 'MF02', area: 'Cost Records', procedure: 'Verify maintenance of cost records per Section 148; review cost audit report', reference: 'CARO (vi), Companies (Cost Records & Audit) Rules' },
  { id: 'MF03', area: 'Fixed Assets', procedure: 'Component accounting for major assets; review capitalization of borrowing costs for qualifying assets', reference: 'Ind AS 16, Ind AS 23' },
  { id: 'MF04', area: 'Excise / Customs', procedure: 'Verify EPCG/advance license compliance; duty drawback and GST refunds', reference: 'Customs Act, FTP' },
  { id: 'MF05', area: 'Government Grants', procedure: 'Verify recognition and presentation of government grants (capital vs. revenue) per Ind AS 20', reference: 'Ind AS 20' },
];

const trading = [
  { id: 'TR01', area: 'Import/Export', procedure: 'Verify import bills of entry, export bills of lading; FEMA compliance for forex transactions', reference: 'FEMA, Customs Act' },
  { id: 'TR02', area: 'Inventory', procedure: 'Focus on high-value items; test NRV for seasonal/perishable goods', reference: 'Ind AS 2' },
  { id: 'TR03', area: 'Consignment Sales', procedure: 'Verify consignment stock reconciliation; test commission/charges', reference: 'Ind AS 115' },
];

const services = [
  { id: 'SV01', area: 'Revenue Recognition', procedure: 'Test timing of revenue for long-term contracts; verify unbilled revenue and WIP', reference: 'Ind AS 115' },
  { id: 'SV02', area: 'Unbilled Revenue', procedure: 'Verify existence and valuation of unbilled receivables; subsequent billing', reference: 'Ind AS 115, Ind AS 109' },
  { id: 'SV03', area: 'Foreign Currency', procedure: 'Test foreign currency transactions and translation; verify hedge accounting if applicable', reference: 'Ind AS 21, Ind AS 109' },
];

const ngo = [
  { id: 'NG01', area: 'Funds & Grants', procedure: 'Verify utilization of restricted funds per donor conditions; earmarked vs. corpus funds', reference: 'Ind AS 20, Trust Deed' },
  { id: 'NG02', area: 'FCRA Compliance', procedure: 'Verify FCRA registration, designated bank account, and utilization as per FCRA 2010', reference: 'FCRA 2010, FCRA Rules 2011' },
  { id: 'NG03', area: 'Income Tax', procedure: 'Verify compliance with Section 11/12/13 for charitable exemption; Form 10/10A', reference: 'Income Tax Act, Sec 11-13' },
  { id: 'NG04', area: 'Programme Expenses', procedure: 'Verify programme vs. administrative expense ratio; compliance with Income Tax limits on admin costs', reference: 'Sec 11, Trust Deed' },
];

const bank = [
  { id: 'BK01', area: 'NPA Classification', procedure: 'Verify asset classification (Standard vs. NPA) as per RBI IRAC norms; income recognition', reference: 'RBI Master Circular on IRAC' },
  { id: 'BK02', area: 'Provisioning', procedure: 'Test provision adequacy for NPAs (15%, 25%, 40%, 100% as applicable); provision for standard assets', reference: 'RBI Guidelines, Ind AS 109' },
  { id: 'BK03', area: 'SLR / CRR', procedure: 'Verify compliance with Statutory Liquidity Ratio and Cash Reserve Ratio; LAF/Marginal Standing Facility', reference: 'RBI Act, Banking Regulation Act' },
  { id: 'BK04', area: 'LFAR', procedure: 'Verify completeness of Long Form Audit Report (LFAR) as per RBI format', reference: 'RBI LFAR Guidelines, ICAI GN on Bank Audits' },
  { id: 'BK05', area: 'Treasury Operations', procedure: 'Verify investments (HTM, AFS, HFT classification); test valuation and profit/loss on sale', reference: 'RBI Master Circular, Ind AS 109' },
];

const nbfc = [
  { id: 'NB01', area: 'Registration', procedure: 'Verify valid NBFC registration under Section 45-IA of RBI Act; net owned fund requirements', reference: 'RBI Act Sec 45-IA, CARO (xv)' },
  { id: 'NB02', area: 'NPA / Provisioning', procedure: 'Test NPA classification (90-day norm); provisioning adequacy as per RBI direction', reference: 'RBI DNBR Circulars' },
  { id: 'NB03', area: 'ALM / Liquidity', procedure: 'Verify asset-liability management reporting; liquidity coverage as per RBI guidelines', reference: 'RBI ALM Guidelines' },
];

export const clientTypeMap: Record<string, { label: string; procedures: any[] }> = {
  manufacturing: { label: 'Manufacturing', procedures: manufacturing },
  trading: { label: 'Trading / Retail', procedures: trading },
  services: { label: 'Services / IT', procedures: services },
  ngo: { label: 'NGO / Trust / Section 8', procedures: ngo },
  bank: { label: 'Banking', procedures: bank },
  nbfc: { label: 'NBFC', procedures: nbfc },
};

export function generateChecklist(clientType: keyof typeof clientTypeMap, engagementType: string) {
  const typeProcedures = clientTypeMap[clientType]?.procedures || [] as any[];
  const engagementLabel = engagementType === 'statutory' ? 'Statutory Audit' : engagementType === 'tax' ? 'Tax Audit' : engagementType === 'internal' ? 'Internal Audit' : 'GST Audit';

  let sections = [
    { name: '1. Pre-Engagement', items: preEngagement },
    { name: '2. Audit Planning & Risk Assessment', items: planning },
    { name: '3. Substantive Procedures — General', items: generalProcedures },
  ];

  if (typeProcedures.length > 0) {
    sections.push({ name: `4. Substantive Procedures — ${clientTypeMap[clientType]?.label || 'Specific'}`, items: typeProcedures });
  }

  sections.push({ name: `${sections.length + 1}. Audit Completion & Reporting`, items: completion });

  return {
    clientType: clientTypeMap[clientType]?.label || clientType,
    engagementType: engagementLabel,
    sections,
    totalItems: sections.reduce((sum, s) => sum + s.items.length, 0),
  };
}

export const clientTypes = Object.keys(clientTypeMap).map(key => ({ id: key, label: clientTypeMap[key].label }));

export const engagementTypes = [
  { id: 'statutory', label: 'Statutory Audit' },
  { id: 'tax', label: 'Tax Audit' },
  { id: 'internal', label: 'Internal Audit' },
  { id: 'gst', label: 'GST Audit' },
];
