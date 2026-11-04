import React from 'react';
import { Building2 } from 'lucide-react';
import ServiceDetailLayout from '../components/ServiceDetailLayout';
import bizImg from '../assets/article_business.jpg';

const CONFIG = {
  currentHref: '/business-registration',
  preselectedService: 'Business Registration',
  seo: {
    title: 'Business Registration Services | Private Limited, LLP, OPC | Simplifyl',
    description:
      'Register your business in India with expert assistance: Private Limited company incorporation, LLP registration, One Person Company (OPC), and MSME Udyam setup.',
    canonicalUrl: 'https://simplifyl.com/business-registration',
  },
  icon: Building2,
  image: bizImg,
  imageAlt: 'Founders meeting a consultant about company incorporation',
  breadcrumb: 'Business Registrations',
  practice: 'Corporate Incorporation Practice',
  titleMain: 'Business & Company',
  titleAccent: 'Registration Services',
  intro:
    'Set up your business with full regulatory compliance. We handle naming reservation (RUN), SPICe+ drafting, PAN/TAN generation, and Certificate of Incorporation issuance.',
  ctaLabel: 'Start Incorporation Consultation',
  highlights: [
    { value: '4', label: 'Entity options' },
    { value: 'SPICe+', label: 'MCA filing' },
    { value: 'PAN / TAN', label: 'Generated for you' },
  ],
  overview: {
    title: 'What is',
    accent: 'Business Registration?',
    paragraphs: [
      'Registering your business gives it a legal identity, credibility with banks and customers, and access to government schemes. The right structure depends on your capital, founders and risk exposure.',
      'Simplifyl handles name reservation (RUN), SPICe+ drafting and filing, PAN/TAN generation and the Certificate of Incorporation for Private Limited, LLP, OPC, Partnership, Proprietorship and MSME setups.',
    ],
    idealFor: ['First-time founders', 'Startups', 'Family businesses'],
  },
  fees: {
    note: 'Packages depend on the entity you choose. Government and name approval fees are paid at actuals, and you receive a clear quote after a free consultation.',
    professionalFee: 'Consultation-based package',
    governmentFee: 'MCA & Name approval fees at actuals by State',
    included: [
      'RUN Name reservation filing',
      'Digital Signature Certificates (DSC)',
      'Drafting MOA & AOA charters',
      'PAN, TAN & Certificate of Incorporation',
    ],
  },
  scope: {
    eyebrow: 'Entity options',
    title: 'Choose the Right',
    accent: 'Entity Structure',
    intro:
      'Our consultants evaluate your capital needs, founder shareholding, and risk exposure to recommend the optimal legal form.',
    items: [
      {
        title: 'Private Limited Company (Pvt Ltd)',
        badge: 'Most Popular',
        desc: 'The gold standard for startups and scaling businesses seeking limited liability, foreign investment, and venture capital.',
        features: [
          '2+ Directors & Shareholders',
          'Distinct Legal Entity & Perpetual Succession',
          'Eligible for Startup India 80-IAC Tax Exemption',
        ],
      },
      {
        title: 'Limited Liability Partnership (LLP)',
        badge: 'Low Compliance',
        desc: 'Blends limited liability protection with internal partnership operational flexibility. Lower annual audit requirements for early revenue stages.',
        features: ['2+ Designated Partners', 'No Minimum Capital Requirement', 'Governed by Mutual LLP Agreement'],
      },
      {
        title: 'One Person Company (OPC)',
        badge: 'Solo Founder',
        desc: 'Allows a single entrepreneur to operate an incorporated corporate company with limited liability while appointing a nominee.',
        features: ['1 Sole Director & Shareholder', 'Nominee Director Required', 'Limited Liability for Solo Ventures'],
      },
      {
        title: 'MSME / Udyam & Startup India',
        badge: 'Govt Benefits',
        desc: 'Official registration with the Ministry of MSME granting priority bank lending, collateral-free credit, and 50% discount on government trademark fees.',
        features: [
          'Lifetime Valid Udyam Certificate',
          'DPIIT Recognition for Startups',
          'Exemption from Public Tender EMD Fees',
        ],
      },
    ],
  },
  steps: {
    eyebrow: 'The process',
    title: 'From Name Reservation to',
    accent: 'Incorporation',
    intro: 'The core stages we manage with the Ministry of Corporate Affairs on your behalf.',
    label: 'STAGE',
    items: [
      { num: '01', title: 'Name Reservation (RUN)', desc: 'Checking availability and reserving your proposed company name.' },
      { num: '02', title: 'SPICe+ Drafting', desc: 'Preparing and filing the incorporation forms and charter documents.' },
      { num: '03', title: 'PAN / TAN Generation', desc: 'Tax identifiers generated alongside your incorporation application.' },
      { num: '04', title: 'Certificate of Incorporation', desc: 'Final certificate issued by the Registrar of Companies.' },
    ],
  },
  documents: {
    eyebrow: 'Documentation',
    title: 'What You Need for',
    accent: 'Company Incorporation',
    intro: 'Have these documents handy to keep your registration moving without delays.',
    note: 'Incorporation approvals are granted solely by the Registrar of Companies (MCA). Simplifyl manages end-to-end documentation, filing, and defect resolution.',
    items: [
      'PAN Card of all Directors / Partners / Shareholders',
      'Voter ID / Passport / Driving License (Government Identity Proof)',
      'Latest Bank Statement / Utility Bill (Address Proof not older than 2 months)',
      'Passport-size photographs of all proposed promoters',
      'Registered Office Proof (Electricity Bill + NOC signed by Property Owner)',
    ],
  },
  faqs: [
    {
      q: 'Which structure is best for a startup seeking investment?',
      a: 'A Private Limited Company is the most popular choice for startups and scaling businesses seeking limited liability, foreign investment and venture capital.',
    },
    {
      q: 'Can a single founder incorporate a company?',
      a: 'Yes, through a One Person Company (OPC). It has one sole director and shareholder, with a nominee director appointed, and offers limited liability for solo ventures.',
    },
    {
      q: 'Is there a minimum capital requirement for an LLP?',
      a: 'No. An LLP needs at least two designated partners, has no minimum capital requirement and is governed by a mutual LLP agreement.',
    },
    {
      q: 'Who approves the incorporation?',
      a: 'Incorporation approvals are granted solely by the Registrar of Companies (MCA). Simplifyl manages end-to-end documentation, filing and defect resolution.',
    },
    {
      q: 'What does MSME / Udyam registration give me?',
      a: 'A lifetime-valid Udyam certificate with benefits such as priority bank lending, collateral-free credit and exemption from public tender EMD fees, along with DPIIT recognition for startups.',
    },
  ],
  finalCta: {
    eyebrow: 'Company Incorporation Desk',
    title: 'Ready to Register Your',
    accent: 'Business Entity?',
    text: 'Visit our dedicated Contact Page to consult with our company formation specialists, verify business names, and initiate SPICe+ MCA filing.',
  },
};

export default function BusinessRegistrationPage() {
  return <ServiceDetailLayout config={CONFIG} />;
}
