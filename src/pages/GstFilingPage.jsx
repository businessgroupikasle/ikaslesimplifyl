import React from 'react';
import { FileText } from 'lucide-react';
import ServiceDetailLayout from '../components/ServiceDetailLayout';
import gstImg from '../assets/article_gst.jpg';

const CONFIG = {
  currentHref: '/gst-filing',
  preselectedService: 'GST Filing',
  seo: {
    title: 'GST Filing Services & Registration Online | Simplifyl',
    description:
      'Get expert GST filing assistance in India: new GST registration, monthly GSTR-1 & GSTR-3B filings, annual GSTR-9 returns, 2B ITC reconciliation, and notice support.',
    canonicalUrl: 'https://simplifyl.com/gst-filing',
  },
  icon: FileText,
  image: gstImg,
  imageAlt: 'Tax professional preparing GST return documents',
  breadcrumb: 'GST Filing',
  practice: 'Goods & Services Tax Practice',
  titleMain: 'GST Filing &',
  titleAccent: 'Registration Services',
  intro:
    'Avoid penalty notices, optimize your Input Tax Credit, and maintain an exemplary GST compliance rating with our expert tax filing assistance.',
  ctaLabel: 'Request GST Consultation',
  highlights: [
    { value: 'GSTR-1', label: 'Monthly returns' },
    { value: '2A / 2B', label: 'ITC reconciliation' },
    { value: 'GSTR-9', label: 'Annual return' },
  ],
  overview: {
    title: 'What is',
    accent: 'GST Filing & Registration?',
    paragraphs: [
      'Every GST-registered business must report its sales, claim Input Tax Credit and pay tax through periodic returns on the GST portal. Missed or inaccurate filings lead to penalty notices.',
      'Simplifyl manages registration, monthly and quarterly GSTR-1 and GSTR-3B, 2A/2B reconciliation, annual GSTR-9/9C and notice replies, tailored for manufacturers, traders, e-commerce sellers and service exporters.',
    ],
    idealFor: ['Traders & retailers', 'Service providers', 'E-commerce sellers'],
  },
  fees: {
    note: 'Professional fees are configured to your turnover and invoice volume. Share your requirement and we will send a clear quote before we begin.',
    professionalFee: 'Configurable by turnover / volume',
    governmentFee: 'Nil (Statutory late fee at actuals if overdue)',
    included: [
      'Monthly GSTR-1 & GSTR-3B filings',
      '2A / 2B Input Tax Credit reconciliation',
      'HSN summary & invoice validation',
      'Quarterly compliance review',
    ],
  },
  scope: {
    eyebrow: 'What we provide',
    title: 'End-to-End GST',
    accent: 'Advisory & Filings',
    intro: 'Tailored for manufacturers, traders, e-commerce sellers, and service exporters.',
    items: [
      {
        title: 'New GST Registration',
        desc: 'End-to-end registration on the GST common portal with ARN generation and GSTIN certificate issuance.',
      },
      {
        title: 'GSTR-1 Monthly / Quarterly Filing',
        desc: 'Preparation and filing of outward supplies, B2B invoice reporting, export declarations, and HSN summary tables.',
      },
      {
        title: 'GSTR-3B Summary Return',
        desc: 'Calculation of monthly output liability, optimization of eligible Input Tax Credit (ITC), and challan generation.',
      },
      {
        title: 'Automated 2A/2B Reconciliation',
        desc: 'Matching supplier invoice uploads against purchase books to recover missed credits and identify defaulting vendors.',
      },
      {
        title: 'GSTR-9 Annual Return & 9C',
        desc: 'Annual consolidated compliance, balance sheet reconciliation, and statutory disclosure reports.',
      },
      {
        title: 'GST Notice Response & Amendments',
        desc: 'Drafting legal replies for ASMT-10 scrutiny, DRC-01 notices, and processing core/non-core field amendments.',
      },
    ],
  },
  steps: {
    eyebrow: 'Workflow',
    title: 'How We Manage Your',
    accent: 'Monthly Filings',
    intro: 'A simple four-stage routine that keeps every return accurate and on time.',
    label: 'STEP',
    items: [
      { num: '01', title: 'Data Upload', desc: 'Securely upload sales, purchase register, and invoice summaries.' },
      { num: '02', title: 'Tax Audit & Reconciliation', desc: 'Our tax specialist audits ITC eligibility and reconciles GSTR-2B.' },
      { num: '03', title: 'Review & Tax Challan', desc: 'You receive computation summary and tax challan for validation.' },
      { num: '04', title: 'Filing & ARN Acknowledgement', desc: 'Official portal submission with ARN confirmation delivered.' },
    ],
  },
  documents: {
    eyebrow: 'Checklist',
    title: 'Documents Required for',
    accent: 'GST Filing',
    intro: 'Keep these ready and we will take care of the rest.',
    note: 'Document requirements may differ according to your entity type (Pvt Ltd, LLP, Proprietorship).',
    items: [
      'PAN Card of Business entity and Directors / Proprietor',
      'Aadhaar Card of Primary Authorized Signatory',
      'Principal Place of Business Proof (Electricity Bill, Rent Agreement & Owner NOC)',
      'Cancelled Cheque / Bank Statement with IFSC and Account details',
      'Constitutional documents (Partnership Deed, MOA/AOA, or Incorporation Certificate)',
    ],
  },
  faqs: [
    {
      q: 'Which GST returns do you file?',
      a: 'We prepare and file GSTR-1 (outward supplies, monthly or quarterly), GSTR-3B (summary return with tax payment) and the annual GSTR-9 with the reconciliation statement GSTR-9C.',
    },
    {
      q: 'What is 2A/2B reconciliation and why does it matter?',
      a: 'We match supplier invoices uploaded on the GST portal (GSTR-2A/2B) against your purchase books. This helps you recover missed Input Tax Credit and identify vendors who default.',
    },
    {
      q: 'Can you help if I receive a GST notice?',
      a: 'Yes. We draft legal replies to ASMT-10 scrutiny notices and DRC-01 notices, and process core and non-core field amendments.',
    },
    {
      q: 'Which documents do I need for a new GST registration?',
      a: 'PAN of the business and its directors or proprietor, Aadhaar of the authorised signatory, principal place of business proof, a cancelled cheque or bank statement, and constitutional documents. Requirements vary by entity type.',
    },
    {
      q: 'How is my data handled during monthly filings?',
      a: 'You securely upload your sales, purchase register and invoice summaries. Our specialist audits ITC eligibility, shares the computation and tax challan for your validation, and files only after your review. All documents are handled confidentially.',
    },
  ],
  finalCta: {
    eyebrow: 'Expert Tax Assistance',
    title: 'Need Professional Assistance for',
    accent: 'GST Filing?',
    text: 'Visit our dedicated Contact Page to consult with our GST advisory team, share your business requirements, and review filing deadlines.',
  },
};

export default function GstFilingPage() {
  return <ServiceDetailLayout config={CONFIG} />;
}
