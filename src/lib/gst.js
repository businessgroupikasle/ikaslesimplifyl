// GST computation helpers shared by the homepage widget and the Tools page.

// Rate slabs after the GST 2.0 rationalisation (5% merit, 18% standard, 40% demerit).
export const GST_RATES = [5, 18, 40];

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * @param {number} amount   value entered by the user
 * @param {number} rate     GST % (e.g. 18)
 * @param {'exclusive'|'inclusive'} mode  whether `amount` excludes or includes GST
 * @param {boolean} interState  true → IGST, false → CGST + SGST
 */
export function calculateGst(amount, rate, mode = 'exclusive', interState = false) {
  const a = Number(amount) || 0;
  const r = Number(rate) || 0;
  const base = mode === 'inclusive' ? a / (1 + r / 100) : a;
  const tax = (base * r) / 100;
  return {
    base: round2(base),
    tax: round2(tax),
    total: round2(base + tax),
    igst: interState ? round2(tax) : 0,
    cgst: interState ? 0 : round2(tax / 2),
    sgst: interState ? 0 : round2(tax / 2),
  };
}

export function formatINR(n, { decimals = 2 } = {}) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(n) || 0);
}

// ---- Late fee & interest (GSTR-3B / GSTR-1) ----
// Late fee is ₹50/day (₹25 CGST + ₹25 SGST), or ₹20/day for nil returns,
// capped per return according to aggregate turnover.
export const TURNOVER_BRACKETS = [
  { id: 'small', label: 'Up to ₹1.5 Cr', cap: 2000 },
  { id: 'mid', label: '₹1.5 Cr – ₹5 Cr', cap: 5000 },
  { id: 'large', label: 'Above ₹5 Cr', cap: 10000 },
];
const NIL_RETURN_CAP = 500;
const INTEREST_RATE = 0.18; // 18% p.a. on late tax payment

export function calculateLateFee({ daysLate, isNil, bracketId, taxDue, includeInterest }) {
  const days = Math.max(0, Math.floor(Number(daysLate) || 0));
  const perDay = isNil ? 20 : 50;
  const cap = isNil
    ? NIL_RETURN_CAP
    : (TURNOVER_BRACKETS.find((b) => b.id === bracketId) || TURNOVER_BRACKETS[0]).cap;
  const uncapped = days * perDay;
  const lateFee = Math.min(uncapped, cap);
  const interest =
    includeInterest && !isNil ? round2(((Number(taxDue) || 0) * INTEREST_RATE * days) / 365) : 0;
  return {
    days,
    perDay,
    cap,
    lateFee,
    capped: uncapped > cap,
    interest,
    total: round2(lateFee + interest),
  };
}
