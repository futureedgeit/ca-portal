export const gstRates = [
  { rate: '0%', items: 'Fresh fruits, vegetables, milk, eggs, curd, natural honey, flour, bread, salt, bindi, sindoor, stamps, judicial papers, printed books, newspapers, handloom, jute', category: 'Exempted' },
  { rate: '0.25%', items: 'Rough diamonds, precious stones (unsorted)', category: 'Special Rate' },
  { rate: '3%', items: 'Gold, silver, platinum, imitation jewellery, precious stones (sorted), pearls', category: 'Special Rate' },
  { rate: '5%', items: 'Sugar, tea, coffee, edible oil, spices, frozen vegetables, pizza bread, rusk, sabudana, cashew nut, raisins, ice & snow, insulin, LPG, kerosene, coal, life-saving drugs, agarbatti, footwear up to Rs. 1000, apparel up to Rs. 1000, transport services (rail, air economy)', category: 'Lower Rate' },
  { rate: '12%', items: 'Butter, ghee, cheese, fruit juices, namkeen, packaged coconut water, mobiles, umbrella, sewing machine, playing cards, exercise books, ayurvedic medicines, animal fat, sausage, fruit jams, non-AC restaurants, business class air travel', category: 'Standard Lower' },
  { rate: '18%', items: 'Biscuits, cakes, pastries, corn flakes, pasta, jams, soups, ice cream, mineral water, hair oil, soaps, toothpaste, capital goods, CCTV, monitors (>32"), IT services, telecom services, AC restaurants, outdoor catering, construction services', category: 'Standard Rate' },
  { rate: '28%', items: 'Pan masala, aerated water, molasses, automobiles, motorcycles, yachts, aircraft, cement, paints, air conditioners, washing machines, dishwashers, vacuum cleaners, hair clippers, ATM vending machines, 5-star hotel accommodation, race club, gambling', category: 'Highest Rate' },
  { rate: '28% + Cess', items: 'Cigarettes, tobacco products, pan masala with gutka, aerated water with sugar, motor vehicles (luxury cars, SUVs), specified demerit goods', category: 'Sin/Demerit Goods' },
];

export const registrationThresholds = [
  { category: 'Normal Category States (Goods)', threshold: 'Rs. 40 Lakhs', notes: 'Aggregate turnover in the preceding FY' },
  { category: 'Special Category States (Goods)', threshold: 'Rs. 20 Lakhs', notes: 'Manipur, Mizoram, Nagaland, Tripura, etc.' },
  { category: 'Services', threshold: 'Rs. 20 Lakhs', notes: 'All states (Rs. 10 Lakhs for special category)' },
  { category: 'Exclusive Supply of Goods (Sec 23)', threshold: 'Rs. 40 Lakhs', notes: 'Introduced via Notification for specified goods' },
];

export const gstrReturns = [
  { form: 'GSTR-1', frequency: 'Monthly / Quarterly', dueDate: '11th of next month', description: 'Outward supplies (sales) details', whoFiles: 'All regular taxpayers', quarterlyFor: 'Turnover up to Rs. 1.5 Cr (QRMP scheme)' },
  { form: 'GSTR-2A', frequency: 'Auto-generated', dueDate: 'Dynamic', description: 'Auto-drafted inward supplies (purchases) for recipient', whoFiles: 'System-generated (view-only)', quarterlyFor: '' },
  { form: 'GSTR-2B', frequency: 'Auto-generated (Monthly)', dueDate: '14th of next month', description: 'Static ITC statement — eligible & ineligible ITC for the month', whoFiles: 'System-generated', quarterlyFor: '' },
  { form: 'GSTR-3B', frequency: 'Monthly / Quarterly', dueDate: '20th of next month', description: 'Summary return — outward & inward supplies, ITC claimed, tax paid', whoFiles: 'All regular taxpayers', quarterlyFor: 'Turnover up to Rs. 5 Cr (QRMP: 24th of next month of quarter)' },
  { form: 'GSTR-4', frequency: 'Annually', dueDate: '30th April', description: 'Composition dealers annual return', whoFiles: 'Composition scheme taxpayers', quarterlyFor: '' },
  { form: 'GSTR-5', frequency: 'Monthly', dueDate: '13th of next month', description: 'Non-resident taxable person return', whoFiles: 'Non-resident foreign taxpayers', quarterlyFor: '' },
  { form: 'GSTR-6', frequency: 'Monthly', dueDate: '13th of next month', description: 'Input Service Distributor (ISD) return', whoFiles: 'ISD registered persons', quarterlyFor: '' },
  { form: 'GSTR-7', frequency: 'Monthly', dueDate: '10th of next month', description: 'TDS deducted under GST', whoFiles: 'Government departments / notified persons', quarterlyFor: '' },
  { form: 'GSTR-8', frequency: 'Monthly', dueDate: '10th of next month', description: 'TCS collected by e-commerce operators', whoFiles: 'E-commerce operators', quarterlyFor: '' },
  { form: 'GSTR-9', frequency: 'Annually', dueDate: '31st December', description: 'Annual return consolidating all monthly/quarterly returns', whoFiles: 'All regular taxpayers (except composition, ISD, NRTP)', quarterlyFor: 'Turnover > Rs. 2 Cr mandatory; up to Rs. 2 Cr optional' },
  { form: 'GSTR-9C', frequency: 'Annually', dueDate: '31st December', description: 'Reconciliation statement + GSTR-9C audit certification', whoFiles: 'Taxpayers with turnover > Rs. 5 Cr', quarterlyFor: '' },
];

export const itcRules = [
  { condition: 'Possession of tax invoice/debit note', details: 'Must hold valid tax invoice or debit note issued by the supplier', timeLimit: 'Before filing GSTR-3B' },
  { condition: 'Receipt of goods/services', details: 'Must have actually received the goods or services', timeLimit: 'Within the tax period of claim' },
  { condition: 'Tax actually paid to government', details: 'Supplier must have filed GSTR-3B and paid tax to the government', timeLimit: 'GSTR-2B reflects in your portal' },
  { condition: 'Furnishing of valid return', details: 'Must have furnished GSTR-3B for the relevant period', timeLimit: 'Due date of September return or annual return, whichever is earlier' },
  { condition: 'Time limit for claiming ITC', details: 'ITC must be claimed within the earlier of: (a) November 30 of next FY, or (b) date of filing annual return', timeLimit: 'Section 16(4) of CGST Act' },
  { condition: 'Blocked credits (Section 17(5))', details: 'Motor vehicles, food & beverages, outdoor catering, beauty treatment, health services, membership fees, travel benefits to employees, works contract for construction of immovable property, goods lost/stolen/destroyed, personal consumption, free samples, gifts (> Rs. 50,000)', timeLimit: 'Never eligible for ITC' },
];

export const reverseCharge = [
  { service: 'Goods Transport Agency (GTA)', recipientLiable: 'Specified recipients (factory, society, body corporate, partnership, casual, registered)', rate: '5% (No ITC) or 12% (with ITC)', notes: 'If GTA does not charge GST @ 12%' },
  { service: 'Legal services by advocate/firm', recipientLiable: 'Business entity (registered under GST)', rate: '18%', notes: 'Provided to any business entity; individual advocate not liable to register' },
  { service: 'Services by director to company', recipientLiable: 'Company', rate: '18%', notes: 'Sitting fees, commission, etc. (except salary)' },
  { service: 'Import of services', recipientLiable: 'Importer (recipient in India)', rate: 'As applicable', notes: 'From a person outside India to a person in India' },
  { service: 'Renting of immovable property by government', recipientLiable: 'Registered person', rate: '18%', notes: 'Property owned by Central/State Govt or local authority' },
  { service: 'Supply of raw cotton', recipientLiable: 'Registered person', rate: '5%', notes: 'Agriculturist to registered person (Notification 43/2017-CT(R))' },
];
