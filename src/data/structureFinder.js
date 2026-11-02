// Business Structure Finder: a short weighted quiz recommending an entity type.

export const STRUCTURES = {
  proprietorship: {
    name: 'Sole Proprietorship',
    tagline: 'The fastest, lowest-cost way to start trading on your own.',
    liability: 'Unlimited',
    compliance: 1,
    funding: 'Not possible',
    pros: ['Minimal setup cost & paperwork', 'Full control of decisions', 'Simple income-tax filing'],
    watchOut: 'You are personally liable for all business debts.',
  },
  partnership: {
    name: 'Partnership Firm',
    tagline: 'A simple, deed-based setup for co-owners who trust each other.',
    liability: 'Unlimited',
    compliance: 2,
    funding: 'Very limited',
    pros: ['Easy to form with a partnership deed', 'Low compliance burden', 'Shared capital & skills'],
    watchOut: 'Partners are jointly liable for the firm’s debts.',
  },
  llp: {
    name: 'Limited Liability Partnership',
    tagline: 'Partnership flexibility with the protection of limited liability.',
    liability: 'Limited',
    compliance: 3,
    funding: 'Limited (no equity shares)',
    pros: ['Limited liability for partners', 'Lighter compliance than a company', 'No minimum capital'],
    watchOut: 'Not suited for raising VC or angel equity funding.',
  },
  opc: {
    name: 'One Person Company',
    tagline: 'Corporate identity and limited liability for a solo founder.',
    liability: 'Limited',
    compliance: 4,
    funding: 'Limited (convert to Pvt Ltd later)',
    pros: ['Separate legal entity', 'Limited liability for one owner', 'Easy upgrade to Pvt Ltd'],
    watchOut: 'Requires a nominee director and annual ROC filings.',
  },
  pvtltd: {
    name: 'Private Limited Company',
    tagline: 'The gold standard for startups planning to scale and raise capital.',
    liability: 'Limited',
    compliance: 5,
    funding: 'Excellent (equity, ESOPs)',
    pros: ['Preferred by investors & banks', 'Issue shares and ESOPs', 'Startup India eligible'],
    watchOut: 'Highest annual compliance: audits, AGMs and ROC filings.',
  },
};

export const QUESTIONS = [
  {
    id: 'founders',
    question: 'How many people will own the business?',
    options: [
      { label: 'Just me', hint: 'Solo founder', scores: { proprietorship: 3, opc: 3, pvtltd: 0, llp: -99, partnership: -99 } },
      { label: 'Two or more', hint: 'Co-founders / partners', scores: { partnership: 2, llp: 3, pvtltd: 3, proprietorship: -99, opc: -99 } },
    ],
  },
  {
    id: 'funding',
    question: 'Do you plan to raise money from investors?',
    options: [
      { label: 'Yes, definitely', hint: 'Angels, VCs, equity', scores: { pvtltd: 6, opc: 1, llp: -2, partnership: -3, proprietorship: -3 } },
      { label: 'Maybe later', hint: 'Keeping options open', scores: { pvtltd: 3, opc: 2, llp: 1 } },
      { label: 'No, self-funded', hint: 'Bootstrapped', scores: { proprietorship: 2, partnership: 2, llp: 2 } },
    ],
  },
  {
    id: 'liability',
    question: 'How important is protecting your personal assets?',
    options: [
      { label: 'Critical', hint: 'Limit my risk', scores: { pvtltd: 3, llp: 3, opc: 3, proprietorship: -2, partnership: -2 } },
      { label: 'Somewhat', hint: 'Nice to have', scores: { pvtltd: 1, llp: 2, opc: 1 } },
      { label: 'Not a concern', hint: 'Low-risk business', scores: { proprietorship: 2, partnership: 2 } },
    ],
  },
  {
    id: 'scale',
    question: 'What turnover do you expect in the first 2–3 years?',
    options: [
      { label: 'Under ₹20 Lakh', hint: 'Small / side business', scores: { proprietorship: 3, partnership: 2, llp: 1 } },
      { label: '₹20 Lakh – ₹2 Cr', hint: 'Steady growth', scores: { llp: 2, opc: 2, pvtltd: 1, partnership: 1 } },
      { label: 'Above ₹2 Cr', hint: 'High growth', scores: { pvtltd: 3, llp: 1, opc: -1 } },
    ],
  },
  {
    id: 'compliance',
    question: 'How much annual paperwork are you comfortable with?',
    options: [
      { label: 'Minimal', hint: 'Keep it simple', scores: { proprietorship: 3, partnership: 2, llp: 0, pvtltd: -2 } },
      { label: 'Moderate', hint: 'A few filings a year', scores: { llp: 3, opc: 2, partnership: 1 } },
      { label: 'Whatever it takes', hint: 'We’ll have experts', scores: { pvtltd: 2, opc: 1 } },
    ],
  },
];

/** answers: array of selected option indexes, one per question. Returns ranked results. */
export function scoreStructures(answers) {
  const totals = Object.fromEntries(Object.keys(STRUCTURES).map((k) => [k, 0]));
  answers.forEach((optIdx, qIdx) => {
    const opt = QUESTIONS[qIdx]?.options[optIdx];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.scores)) totals[k] += v;
  });
  const eligible = Object.entries(totals).filter(([, v]) => v > -50);
  const max = Math.max(...eligible.map(([, v]) => v), 1);
  return eligible
    .map(([id, score]) => ({ id, ...STRUCTURES[id], score, match: Math.max(8, Math.round((score / max) * 100)) }))
    .sort((a, b) => b.score - a.score);
}
