export const taxSlabs = {
  oldRegime: [
    { slab: 'Up to Rs. 2,50,000', rate: 'Nil' },
    { slab: 'Rs. 2,50,001 - Rs. 5,00,000', rate: '5%' },
    { slab: 'Rs. 5,00,001 - Rs. 10,00,000', rate: '20%' },
    { slab: 'Above Rs. 10,00,000', rate: '30%' },
  ],
  oldRegimeSenior: [
    { slab: 'Up to Rs. 3,00,000', rate: 'Nil' },
    { slab: 'Rs. 3,00,001 - Rs. 5,00,000', rate: '5%' },
    { slab: 'Rs. 5,00,001 - Rs. 10,00,000', rate: '20%' },
    { slab: 'Above Rs. 10,00,000', rate: '30%' },
  ],
  newRegime: [
    { slab: 'Up to Rs. 4,00,000', rate: 'Nil' },
    { slab: 'Rs. 4,00,001 - Rs. 8,00,000', rate: '5%' },
    { slab: 'Rs. 8,00,001 - Rs. 12,00,000', rate: '10%' },
    { slab: 'Rs. 12,00,001 - Rs. 16,00,000', rate: '15%' },
    { slab: 'Rs. 16,00,001 - Rs. 20,00,000', rate: '20%' },
    { slab: 'Rs. 20,00,001 - Rs. 24,00,000', rate: '25%' },
    { slab: 'Above Rs. 24,00,000', rate: '30%' },
  ],
};

export const taxRebates = [
  { regime: 'Old Regime', income: 'Up to Rs. 5,00,000', rebate: 'Rs. 12,500 (Sec 87A)' },
  { regime: 'New Regime', income: 'Up to Rs. 7,00,000', rebate: 'Rs. 25,000 (Sec 87A)' },
  { regime: 'New Regime', income: 'Up to Rs. 12,00,000', rebate: 'Marginal relief available for income slightly above Rs. 12L' },
];

export const deductions = [
  { section: '80C', limit: 'Rs. 1,50,000', description: 'PPF, EPF, LIC, ELSS, NSC, Tuition Fees, Home Loan Principal, Sukanya Samriddhi, SCSS, 5-Year FD' },
  { section: '80CCC', limit: 'Part of 80C', description: 'Annuity plan of LIC or other insurer for pension' },
  { section: '80CCD(1)', limit: 'Part of 80C', description: 'Employee contribution to NPS (up to 10% of salary / 20% of GTI for self-employed)' },
  { section: '80CCD(1B)', limit: 'Rs. 50,000', description: 'Additional NPS contribution (over and above 80C limit)' },
  { section: '80CCD(2)', limit: 'Up to 10% of salary', description: 'Employer contribution to NPS (not part of 80C)' },
  { section: '80D', limit: 'Rs. 25,000-1,00,000', description: 'Health insurance premium (self, family, parents). Higher limit for senior citizens' },
  { section: '80DD', limit: 'Rs. 75,000-1,25,000', description: 'Medical treatment of dependent with disability' },
  { section: '80DDB', limit: 'Rs. 40,000-1,00,000', description: 'Medical treatment of specified diseases' },
  { section: '80E', limit: 'No limit (8 years)', description: 'Interest on education loan (no cap on amount, 8-year deduction window)' },
  { section: '80EE', limit: 'Rs. 50,000', description: 'Interest on home loan for first-time buyers (loan sanctioned in FY 2016-17)' },
  { section: '80EEA', limit: 'Rs. 1,50,000', description: 'Interest on affordable housing loan (stamp value up to Rs. 45L)' },
  { section: '80EEB', limit: 'Rs. 1,50,000', description: 'Interest on electric vehicle loan' },
  { section: '80G', limit: '50%-100% of donation', description: 'Donations to specified funds and charitable institutions' },
  { section: '80GG', limit: 'Rs. 5,000/month or 25%', description: 'Rent paid when HRA not received' },
  { section: '80GGA', limit: '100%', description: 'Donations for scientific research/rural development (non-business assessees)' },
  { section: '80GGC', limit: '100%', description: 'Donations to political parties (non-cash only)' },
  { section: '80TTA', limit: 'Rs. 10,000', description: 'Interest on savings bank account (individual/HUF below 60)' },
  { section: '80TTB', limit: 'Rs. 50,000', description: 'Interest income for senior citizens (deposits with banks, PO, co-op)' },
  { section: '80U', limit: 'Rs. 75,000-1,25,000', description: 'Self-disability deduction' },
];

export const tdsRates = [
  { section: '192', nature: 'Salary', threshold: 'As per slab', rate: 'Slab rate', remarks: 'Employer to deduct monthly' },
  { section: '193', nature: 'Interest on Securities', threshold: 'Rs. 10,000', rate: '10%', remarks: 'No TDS on listed debenture interest (dematerialized)' },
  { section: '194', nature: 'Dividend', threshold: 'Rs. 5,000', rate: '10%', remarks: 'On dividend exceeding Rs. 5000 by any mode other than dividend warrants' },
  { section: '194A', nature: 'Interest (other than securities)', threshold: 'Rs. 40,000 (Bank)/5,000 (Others)', rate: '10%', remarks: 'Senior citizen threshold: Rs. 50,000' },
  { section: '194B', nature: 'Lottery/Crossword Puzzle', threshold: 'Aggregate > Rs. 10,000', rate: '30%', remarks: 'No threshold for single transaction; includes surcharge and cess' },
  { section: '194C', nature: 'Contractors', threshold: 'Single Rs. 30,000 / Aggregate Rs. 1,00,000', rate: '1% (Ind) / 2% (Co)', remarks: 'Transporters can opt for no TDS with PAN declaration' },
  { section: '194D', nature: 'Insurance Commission', threshold: 'Rs. 15,000', rate: '5%', remarks: 'Applicable for domestic companies only' },
  { section: '194H', nature: 'Commission/Brokerage', threshold: 'Rs. 15,000', rate: '5%', remarks: 'Excludes insurance commission covered under 194D' },
  { section: '194I', nature: 'Rent', threshold: 'Rs. 2,40,000 p.a.', rate: '2% (P&M) / 10% (Others)', remarks: 'Plant & Machinery at 2%, land/building/furniture at 10%' },
  { section: '194J', nature: 'Professional/Technical Fees', threshold: 'Rs. 30,000', rate: '2% (Tech) / 10% (Others)', remarks: 'Technical services at 2%, others at 10%' },
  { section: '194Q', nature: 'Purchase of Goods', threshold: 'Rs. 50,00,000', rate: '0.10%', remarks: 'Applicable for buyer with turnover > Rs. 10 Cr in preceding FY' },
];

export const itrForms = [
  { form: 'ITR-1 (SAHAJ)', applicableTo: 'Resident individuals with income up to Rs. 50L from salary, one house property, other sources', notApplicable: 'Capital gains, business income, foreign assets, DTV', dueDate: '31 July' },
  { form: 'ITR-2', applicableTo: 'Individuals/HUF not having business/profession income', notApplicable: 'Business or profession income', dueDate: '31 July' },
  { form: 'ITR-3', applicableTo: 'Individuals/HUF having income from business or profession', notApplicable: 'Not eligible for ITR-1, 2, or 4', dueDate: '31 July / 31 Oct (audit)' },
  { form: 'ITR-4 (SUGAM)', applicableTo: 'Resident individuals/HUF/Firms with presumptive income up to Rs. 50L', notApplicable: 'Capital gains > limit, foreign assets, DTV', dueDate: '31 July' },
  { form: 'ITR-5', applicableTo: 'Firms, LLPs, AOPs, BOIs, Artificial Juridical Persons', notApplicable: 'Individuals, HUF, Companies', dueDate: '31 July / 31 Oct (audit)' },
  { form: 'ITR-6', applicableTo: 'Companies other than those claiming exemption under Section 11', notApplicable: 'Charitable/religious trusts (use ITR-7)', dueDate: '31 October' },
  { form: 'ITR-7', applicableTo: 'Persons including companies required to furnish return under sections 139(4A)-(4D)', notApplicable: 'Other than specified exempt entities', dueDate: '31 October' },
];

export const advanceTax = [
  { installment: '1st', dueDate: '15 June', percentage: '15%', amount: '15% of tax liability' },
  { installment: '2nd', dueDate: '15 September', percentage: '45%', amount: '45% minus first installment' },
  { installment: '3rd', dueDate: '15 December', percentage: '75%', amount: '75% minus earlier installments' },
  { installment: '4th', dueDate: '15 March', percentage: '100%', amount: '100% minus earlier installments' },
];
