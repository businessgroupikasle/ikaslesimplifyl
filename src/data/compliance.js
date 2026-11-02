// Recurring statutory due dates for Indian businesses.
// These are the standard dates; the government frequently extends them, so the
// UI always shows a "verify before filing" note alongside this data.

export const CATEGORIES = {
  gst: {
    label: 'GST',
    dot: 'bg-blue-500',
    pill: 'bg-blue-50 text-blue-700 border-blue-200',
    bar: 'from-blue-500 to-blue-600',
  },
  tax: {
    label: 'Income Tax & TDS',
    dot: 'bg-amber-500',
    pill: 'bg-amber-50 text-amber-800 border-amber-200',
    bar: 'from-amber-400 to-amber-500',
  },
  roc: {
    label: 'ROC / Company',
    dot: 'bg-indigo-500',
    pill: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    bar: 'from-indigo-500 to-indigo-600',
  },
  llp: {
    label: 'LLP',
    dot: 'bg-teal-500',
    pill: 'bg-teal-50 text-teal-700 border-teal-200',
    bar: 'from-teal-400 to-teal-500',
  },
  payroll: {
    label: 'Payroll (PF / ESI)',
    dot: 'bg-emerald-500',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    bar: 'from-emerald-400 to-emerald-500',
  },
};

const QUARTER_START_MONTHS = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct

// Each rule returns the day-of-month it falls on for a given month (0-11), or null.
const RULES = [
  // ---- Monthly ----
  {
    id: 'tds-deposit',
    title: 'TDS / TCS Deposit',
    form: 'Challan ITNS 281',
    category: 'tax',
    appliesTo: 'All deductors',
    desc: 'Deposit tax deducted or collected in the previous month. Deductions made in March are due by 30 April.',
    day: (m) => (m === 3 ? 30 : 7),
  },
  {
    id: 'gstr1-monthly',
    title: 'GSTR-1 (Monthly)',
    form: 'GSTR-1',
    category: 'gst',
    appliesTo: 'Monthly GST filers',
    desc: 'Statement of outward supplies (sales invoices) for the previous month.',
    day: () => 11,
  },
  {
    id: 'pf-esi',
    title: 'PF & ESI Contribution',
    form: 'ECR / ESIC Challan',
    category: 'payroll',
    appliesTo: 'Employers registered under EPF / ESIC',
    desc: 'Deposit employer and employee contributions for the previous month’s wages.',
    day: () => 15,
  },
  {
    id: 'gstr3b-monthly',
    title: 'GSTR-3B (Monthly)',
    form: 'GSTR-3B',
    category: 'gst',
    appliesTo: 'Monthly GST filers',
    desc: 'Summary return with tax payment and Input Tax Credit claim for the previous month.',
    day: () => 20,
  },

  // ---- Quarterly ----
  {
    id: 'gstr1-qrmp',
    title: 'GSTR-1 (Quarterly – QRMP)',
    form: 'GSTR-1',
    category: 'gst',
    appliesTo: 'QRMP scheme taxpayers',
    desc: 'Quarterly statement of outward supplies for the previous quarter.',
    day: (m) => (QUARTER_START_MONTHS.includes(m) ? 13 : null),
  },
  {
    id: 'cmp08',
    title: 'CMP-08 Composition Payment',
    form: 'CMP-08',
    category: 'gst',
    appliesTo: 'Composition scheme dealers',
    desc: 'Quarterly self-assessed tax statement and payment for the previous quarter.',
    day: (m) => (QUARTER_START_MONTHS.includes(m) ? 18 : null),
  },
  {
    id: 'gstr3b-qrmp',
    title: 'GSTR-3B (Quarterly – QRMP)',
    form: 'GSTR-3B',
    category: 'gst',
    appliesTo: 'QRMP scheme taxpayers',
    desc: 'Quarterly summary return. Due on the 22nd or 24th depending on your state.',
    day: (m) => (QUARTER_START_MONTHS.includes(m) ? 22 : null),
  },
  {
    id: 'tds-return',
    title: 'Quarterly TDS Return',
    form: 'Form 24Q / 26Q',
    category: 'tax',
    appliesTo: 'All deductors',
    desc: 'Quarterly statement of tax deducted at source for the previous quarter.',
    day: (m) => ({ 0: 31, 4: 31, 6: 31, 9: 31 }[m] ?? null),
  },
  {
    id: 'advance-tax',
    title: 'Advance Tax Instalment',
    form: 'Challan ITNS 280',
    category: 'tax',
    appliesTo: 'Taxpayers with liability above ₹10,000',
    desc: 'Instalments of 15%, 45%, 75% and 100% of estimated annual tax.',
    day: (m) => ({ 2: 15, 5: 15, 8: 15, 11: 15 }[m] ?? null),
  },

  // ---- Half-yearly / Annual ----
  {
    id: 'msme1',
    title: 'MSME-1 Half-Yearly Return',
    form: 'MSME Form I',
    category: 'roc',
    appliesTo: 'Companies with MSME dues over 45 days',
    desc: 'Report outstanding payments to micro and small enterprise suppliers.',
    day: (m) => ({ 3: 30, 9: 31 }[m] ?? null),
  },
  {
    id: 'gstr4',
    title: 'GSTR-4 Annual Return',
    form: 'GSTR-4',
    category: 'gst',
    appliesTo: 'Composition scheme dealers',
    desc: 'Annual return for composition taxpayers for the previous financial year.',
    day: (m) => (m === 3 ? 30 : null),
  },
  {
    id: 'llp-form11',
    title: 'LLP Annual Return',
    form: 'Form 11',
    category: 'llp',
    appliesTo: 'All LLPs',
    desc: 'Annual return with partner and contribution details for the previous financial year.',
    day: (m) => (m === 4 ? 30 : null),
  },
  {
    id: 'dpt3',
    title: 'Return of Deposits',
    form: 'DPT-3',
    category: 'roc',
    appliesTo: 'Companies (excluding Govt. companies)',
    desc: 'Annual return of deposits and outstanding loans as on 31 March.',
    day: (m) => (m === 5 ? 30 : null),
  },
  {
    id: 'itr-nonaudit',
    title: 'Income Tax Return (Non-Audit)',
    form: 'ITR-1 to ITR-4',
    category: 'tax',
    appliesTo: 'Individuals, HUFs & firms not requiring audit',
    desc: 'Annual income tax return for the previous financial year.',
    day: (m) => (m === 6 ? 31 : null),
  },
  {
    id: 'dir3-kyc',
    title: 'Director KYC',
    form: 'DIR-3 KYC',
    category: 'roc',
    appliesTo: 'Every individual holding a DIN',
    desc: 'Annual KYC to keep your Director Identification Number active. Late fee ₹5,000.',
    day: (m) => (m === 8 ? 30 : null),
  },
  {
    id: 'tax-audit',
    title: 'Tax Audit Report',
    form: 'Form 3CA / 3CB-3CD',
    category: 'tax',
    appliesTo: 'Businesses above the audit threshold',
    desc: 'Chartered Accountant’s tax audit report under Section 44AB.',
    day: (m) => (m === 8 ? 30 : null),
  },
  {
    id: 'agm',
    title: 'Annual General Meeting',
    form: 'AGM',
    category: 'roc',
    appliesTo: 'All companies (except OPC)',
    desc: 'Last date to hold the AGM to adopt financial statements.',
    day: (m) => (m === 8 ? 30 : null),
  },
  {
    id: 'adt1',
    title: 'Auditor Appointment',
    form: 'ADT-1',
    category: 'roc',
    appliesTo: 'All companies',
    desc: 'Intimation of auditor appointment, within 15 days of the AGM.',
    day: (m) => (m === 9 ? 14 : null),
  },
  {
    id: 'aoc4',
    title: 'Financial Statements Filing',
    form: 'AOC-4',
    category: 'roc',
    appliesTo: 'All companies',
    desc: 'File the balance sheet and P&L with the ROC within 30 days of the AGM.',
    day: (m) => (m === 9 ? 30 : null),
  },
  {
    id: 'llp-form8',
    title: 'LLP Statement of Accounts',
    form: 'Form 8',
    category: 'llp',
    appliesTo: 'All LLPs',
    desc: 'Statement of Account & Solvency for the previous financial year.',
    day: (m) => (m === 9 ? 30 : null),
  },
  {
    id: 'itr-audit',
    title: 'Income Tax Return (Audit Cases)',
    form: 'ITR-5 / ITR-6',
    category: 'tax',
    appliesTo: 'Companies & businesses requiring audit',
    desc: 'Annual return for entities whose accounts must be audited.',
    day: (m) => (m === 9 ? 31 : null),
  },
  {
    id: 'mgt7',
    title: 'Company Annual Return',
    form: 'MGT-7 / MGT-7A',
    category: 'roc',
    appliesTo: 'All companies',
    desc: 'Annual return with shareholding and director details, within 60 days of the AGM.',
    day: (m) => (m === 10 ? 29 : null),
  },
  {
    id: 'gstr9',
    title: 'GST Annual Return',
    form: 'GSTR-9 / 9C',
    category: 'gst',
    appliesTo: 'Regular GST taxpayers (above ₹2 Cr for mandatory filing)',
    desc: 'Consolidated annual return and reconciliation statement for the previous financial year.',
    day: (m) => (m === 11 ? 31 : null),
  },
];

/** All deadlines falling in a given month, sorted by day. */
export function getDeadlinesForMonth(year, month) {
  return RULES.map((rule) => {
    const day = rule.day(month);
    if (!day) return null;
    const { day: _ignored, ...rest } = rule;
    return { ...rest, key: `${rule.id}-${year}-${month}`, date: new Date(year, month, day) };
  })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date);
}

/** The next `count` deadlines on or after `from`. */
export function getUpcomingDeadlines(count = 5, from = new Date()) {
  const start = startOfDay(from);
  const out = [];
  for (let i = 0; i < 14 && out.length < count; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    for (const item of getDeadlinesForMonth(d.getFullYear(), d.getMonth())) {
      if (item.date >= start) out.push(item);
      if (out.length >= count) break;
    }
  }
  return out;
}

export function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function daysUntil(date, from = new Date()) {
  return Math.round((startOfDay(date) - startOfDay(from)) / 86400000);
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatShortDate(date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}
