import { FileText, Building2, ShieldCheck, FileCheck2 } from 'lucide-react';

// Single source of truth for business contact details. Previously these were
// hard-coded in ~15 places (and the legal pages used a different email/phone).
export const CONTACT = {
  phoneDisplay: '+91 78451 32962',
  phoneHref: 'tel:+917845132962',
  whatsappNumber: '917845132962',
  email: 'business@ikasle.in',
  address: '1639/ A, 2nd Floor, Hopes, Coimbatore, India- 641004',
  hours: ['Monday – Saturday: 9:30 AM – 6:30 PM IST', 'Sunday: Closed (Emergency Filings Monitored)'],
};

export const whatsappLink = (text = '') =>
  `https://wa.me/${CONTACT.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const SERVICES = [
  {
    key: 'gst',
    name: 'GST Filing',
    formValue: 'GST Filing',
    href: '/gst-filing',
    desc: 'Registration, returns (GSTR-1/3B/9), amendments & notice advisory.',
    icon: FileText,
  },
  {
    key: 'business',
    name: 'Business Registrations',
    formValue: 'Business Registration',
    href: '/business-registration',
    desc: 'Private Limited, LLP, OPC, Partnership, Proprietorship & MSME.',
    icon: Building2,
  },
  {
    key: 'trademark',
    name: 'Trademark Services',
    formValue: 'Trademark Registration',
    href: '/trademark-registration',
    desc: 'Search, trademark application, objection handling & renewals.',
    icon: ShieldCheck,
  },
  {
    key: 'compliance',
    name: 'Compliance Support',
    formValue: 'Compliance Support',
    href: '/compliance-support',
    desc: 'Annual ROC filings, Director KYC, minutes & secretarial audits.',
    icon: FileCheck2,
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.formValue), 'Other'];

/**
 * CTAs across the site pass free-form context ("Startups", "GST Documents",
 * "Statutory Corporate Compliance & ROC"...). Map that onto a valid <select>
 * option so the form is always pre-filled correctly.
 */
export function normalizeService(input) {
  if (!input || typeof input !== 'string') return SERVICE_OPTIONS[0];
  if (SERVICE_OPTIONS.includes(input)) return input;
  const s = input.toLowerCase();
  if (s.includes('gst') || s.includes('tax')) return 'GST Filing';
  if (s.includes('trademark') || s.includes('brand') || s.includes('intellectual')) return 'Trademark Registration';
  if (s.includes('compliance') || s.includes('roc') || s.includes('secretarial') || s.includes('private limited compan') || s.includes('limited liability'))
    return 'Compliance Support';
  if (s.includes('registration') || s.includes('incorporation') || s.includes('business') || s.includes('startup') || s.includes('entrepreneur'))
    return 'Business Registration';
  return 'Other';
}

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', children: SERVICES },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Disclaimer', href: '/disclaimer' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
];
