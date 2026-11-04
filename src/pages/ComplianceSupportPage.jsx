import React from 'react';
import { FileCheck2 } from 'lucide-react';
import ServiceDetailLayout from '../components/ServiceDetailLayout';
import compImg from '../assets/compliance_team.jpg';

const CONFIG = {
  currentHref: '/compliance-support',
  preselectedService: 'Compliance Support',
  seo: {
    title: 'Annual ROC Compliance & Corporate Secretarial Support | Simplifyl',
    description:
      'Ensure your Private Limited company and LLP remain in good standing: AOC-4, MGT-7 annual filings, Director KYC (DIR-3), AGM documentation, and statutory compliance in India.',
    canonicalUrl: 'https://simplifyl.com/compliance-support',
  },
  icon: FileCheck2,
  image: compImg,
  imageAlt: 'Compliance team reviewing statutory filings',
  breadcrumb: 'Compliance Support',
  practice: 'Corporate Secretarial Practice',
  titleMain: 'Corporate Compliance &',
  titleAccent: 'Annual ROC Filings',
  intro:
    'Protect your directors from disqualification and eliminate compounding MCA late penalties. We manage complete secretarial compliance for Private Limited and LLP entities.',
  ctaLabel: 'Request Compliance Audit',
  highlights: [
    { value: 'AOC-4', label: 'Financial statements' },
    { value: 'MGT-7', label: 'Annual return' },
    { value: 'DIR-3', label: 'Director KYC' },
  ],
  overview: {
    title: 'What is',
    accent: 'Annual ROC Compliance?',
    paragraphs: [
      'Every registered Indian company and LLP must fulfil periodic secretarial requirements with the Registrar of Companies, regardless of business activity. Missing them brings compounding late fees and director disqualification risk.',
      'Simplifyl handles AOC-4, MGT-7/7A, Director KYC (DIR-3), LLP Forms 8 and 11, board and AGM minutes and INC-20A, so your company stays in good standing.',
    ],
    idealFor: ['Private Limited companies', 'LLPs', 'Directors & promoters'],
  },
  fees: {
    note: 'Pricing is set by your entity type and scope of work. MCA fees follow the prescribed slabs, and you receive a clear quote after a free consultation.',
    professionalFee: 'Annual retainer / customized scope',
    governmentFee: 'MCA filing fees as per authorized share capital slab',
    included: [
      'Annual AOC-4 & MGT-7/7A preparation',
      'Annual Director KYC (DIR-3 KYC)',
      'Board & AGM minutes documentation',
      'Statutory register maintenance',
    ],
  },
  scope: {
    eyebrow: 'Statutory scope',
    title: 'Mandatory Annual',
    accent: 'Filings We Handle',
    intro:
      'Every registered Indian corporate entity must fulfill periodic secretarial requirements regardless of business activity.',
    items: [
      {
        title: 'Form AOC-4 (Financial Statements Filing)',
        desc: 'Annual mandatory filing of balance sheet, profit and loss account, auditor’s report, and directors’ report with the ROC within 30 days of AGM.',
      },
      {
        title: 'Form MGT-7 / MGT-7A (Annual Return)',
        desc: 'Statutory annual return capturing shareholder lists, share transfers, promoter holding, and meeting details within 60 days of AGM.',
      },
      {
        title: 'Annual Director KYC (DIR-3 KYC)',
        desc: 'Mandatory verification for every individual allocated a DIN (Director Identification Number) to prevent deactivation and severe late penalties.',
      },
      {
        title: 'LLP Form 11 & Form 8 Filings',
        desc: 'Annual Statement of Account & Solvency (Form 8) and Annual Return of LLP (Form 11) filed with the Registrar of Companies.',
      },
      {
        title: 'Board & AGM Secretarial Minutes',
        desc: 'Preparation of statutory notices, board meeting minutes, AGM resolutions, and maintaining statutory registers under Companies Act norms.',
      },
      {
        title: 'Commencement of Business (INC-20A)',
        desc: 'Filing verification of paid-up capital and bank account within 180 days of incorporation to allow commencement of commercial operations.',
      },
    ],
  },
  steps: {
    eyebrow: 'Statutory timeline',
    title: 'Your Annual',
    accent: 'Compliance Journey',
    intro: 'The key milestones a company moves through, with the deadlines we track for you.',
    label: 'MILESTONE',
    items: [
      { num: '01', title: 'Commencement (INC-20A)', desc: 'Within 180 days of incorporation, verify paid-up capital and bank account.' },
      { num: '02', title: 'Board & AGM Minutes', desc: 'Notices, board minutes and AGM resolutions with statutory registers maintained.' },
      { num: '03', title: 'Form AOC-4', desc: 'Financial statements filed with the ROC within 30 days of the AGM.' },
      { num: '04', title: 'Form MGT-7 / 7A', desc: 'Annual return filed within 60 days of the AGM, alongside yearly Director KYC.' },
    ],
  },
  notice: {
    title: 'Late Fee Risks Under Companies Act, 2013',
    text: 'Delay in filing Form AOC-4 or MGT-7 incurs compounding statutory late fees with no maximum ceiling. In addition, persistent default risks director disqualification under Section 164(2).',
    stats: [
      { value: '₹100 / day', label: 'Late fee per form, with no maximum ceiling' },
      { value: 'Up to 5 years', label: 'Possible director disqualification under Section 164(2)' },
    ],
  },
  faqs: [
    {
      q: 'What is the deadline for filing Form AOC-4?',
      a: 'Form AOC-4, which carries the financial statements, must be filed with the ROC within 30 days of the AGM.',
    },
    {
      q: 'When is the annual return (MGT-7 / MGT-7A) due?',
      a: 'The annual return must be filed within 60 days of the AGM. It captures shareholder lists, share transfers, promoter holding and meeting details.',
    },
    {
      q: 'What is the penalty for filing late?',
      a: 'Delay in filing Form AOC-4 or MGT-7 attracts compounding late fees of ₹100 per day per form with no maximum ceiling. Persistent default can lead to director disqualification for up to 5 years under Section 164(2).',
    },
    {
      q: 'What is Director KYC (DIR-3 KYC)?',
      a: 'An annual verification for every individual allocated a Director Identification Number (DIN). It is required to prevent DIN deactivation and severe late penalties.',
    },
    {
      q: 'What is Form INC-20A?',
      a: 'It is the declaration for commencement of business, verifying paid-up capital and the bank account within 180 days of incorporation.',
    },
    {
      q: 'Do LLPs have different annual filings?',
      a: 'Yes. LLPs file Form 8 (Statement of Account & Solvency) and Form 11 (Annual Return of LLP) with the Registrar of Companies.',
    },
  ],
  finalCta: {
    eyebrow: 'Corporate Secretarial Desk',
    title: 'Maintain Active Standing & Avoid',
    accent: 'ROC Penalties',
    text: 'Visit our dedicated Contact Page to consult with our company secretaries, review statutory registers, and schedule annual MCA filings.',
  },
};

export default function ComplianceSupportPage() {
  return <ServiceDetailLayout config={CONFIG} />;
}
