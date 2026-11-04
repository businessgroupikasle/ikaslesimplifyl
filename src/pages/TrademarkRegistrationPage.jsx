import React from 'react';
import { ShieldCheck } from 'lucide-react';
import ServiceDetailLayout from '../components/ServiceDetailLayout';
import tmImg from '../assets/article_trademark.jpg';

const CONFIG = {
  currentHref: '/trademark-registration',
  preselectedService: 'Trademark Registration',
  seo: {
    title: 'Trademark Registration Online India | Brand & Logo Protection | Simplifyl',
    description:
      'Protect your brand name, logo and identity with Simplifyl: trademark search, Form TM-A application filing, examination objection handling, and trademark renewal in India.',
    canonicalUrl: 'https://simplifyl.com/trademark-registration',
  },
  icon: ShieldCheck,
  image: tmImg,
  imageAlt: 'Trademark registration certificate and application documents',
  breadcrumb: 'Trademark Registration',
  practice: 'Intellectual Property Practice',
  titleMain: 'Trademark Registration',
  titleAccent: '& Brand Protection',
  intro:
    'Shield your brand identity, business name, and logo across India. Establish nationwide legal exclusivity and deter copycat competitors from day one.',
  ctaLabel: 'Request Trademark Search',
  highlights: [
    { value: '45', label: 'Nice classes searched' },
    { value: 'TM-A', label: 'Application filed' },
    { value: '10 yrs', label: 'Renewal cycle' },
  ],
  overview: {
    title: 'What is',
    accent: 'Trademark Registration?',
    paragraphs: [
      'A registered trademark gives you exclusive legal rights over your brand name, logo or tagline across India, and helps you deter copycat competitors from day one.',
      'Simplifyl manages the full journey: class audit and registry search, Form TM-A filing with IP India, examination objections, opposition support and renewal every 10 years.',
    ],
    idealFor: ['New brands', 'Growing D2C labels', 'Logo & name owners'],
  },
  fees: {
    note: 'Government fees are paid at actuals. Your final quote is shared after a free consultation, so you know the cost before we start.',
    professionalFee: 'Standard professional fee per mark',
    governmentFee: '₹4,500 (Individual/Startup) or ₹9,000 (Others) at actuals',
    included: [
      'Comprehensive trademark registry search',
      'Class classification & specification',
      'Filing Form TM-A with IP India',
      'Application tracking & ™ usage intimation',
    ],
  },
  scope: {
    eyebrow: 'Trademark Services',
    title: 'Comprehensive Brand Protection',
    accent: 'Lifecycle',
    intro: 'From pre-filing risk assessment to final certificate issuance and ongoing surveillance.',
    items: [
      {
        title: 'Trademark Search & Class Audit',
        desc: 'Rigorous investigation across 45 Nice classes on the official IP India registry to detect phonetic, visual, or semantic similarities before application.',
      },
      {
        title: 'Filing Form TM-A Application',
        desc: 'Preparation and filing of wordmark, device, or logo trademark applications with the Controller General of Patents, Designs and Trademarks.',
      },
      {
        title: '™ Symbol Legal Authorization',
        desc: 'Receive immediate government acknowledgement number and guidance allowing lawful commercial display of the ™ symbol on your products and branding.',
      },
      {
        title: 'Examination Objection Replies',
        desc: 'Drafting structured legal responses to Section 9 (Absolute Grounds) and Section 11 (Relative Grounds) objections issued by trademark examiners.',
      },
      {
        title: 'Opposition & Hearing Support',
        desc: 'Preparation of counter-statements to third-party opposition notices and advocate coordination for Registry show-cause hearings.',
      },
      {
        title: 'Trademark Renewal & Portfolio Watch',
        desc: 'Timely filing of renewal applications every 10 years to preserve legal monopoly and ongoing brand watch to flag infringing marks.',
      },
    ],
  },
  steps: {
    eyebrow: 'The process',
    title: 'The Trademark',
    accent: 'Lifecycle',
    intro: 'How an application moves from filing to official registration under the Trade Marks Act, 1999.',
    label: 'STEP',
    items: [
      { num: '01', title: 'Public Search Report', desc: 'Evaluating similarity risks and confirming Nice classification.' },
      { num: '02', title: 'Filing Form TM-A', desc: 'Official submission with application number allowing ™ symbol usage.' },
      { num: '03', title: 'Registry Examination', desc: 'Handling examination reports, formalities, and objection replies.' },
      { num: '04', title: 'Journal Publication & ®', desc: '4-month journal advertisement followed by final registration certificate.' },
    ],
  },
  notice: {
    text: 'Trademark registration is subject to statutory examination and third-party opposition periods mandated by the Trade Marks Registry. We guide you proactively through every query.',
  },
  faqs: [
    {
      q: 'How many classes do you search before filing?',
      a: 'We run a search across all 45 Nice classes on the official IP India registry to detect phonetic, visual or semantic similarities before an application is filed.',
    },
    {
      q: 'Can I use the ™ symbol after filing?',
      a: 'Yes. Once Form TM-A is filed you receive an application acknowledgement number, which allows lawful display of the ™ symbol on your products and branding.',
    },
    {
      q: 'What happens if the Registry raises an objection?',
      a: 'We draft structured replies to Section 9 (Absolute Grounds) and Section 11 (Relative Grounds) objections issued by trademark examiners, and support you through Registry hearings if required.',
    },
    {
      q: 'What is the journal publication stage?',
      a: 'After examination, the mark is advertised in the Trade Marks Journal for 4 months. Once that period is complete, the final registration certificate follows and you can use the ® symbol.',
    },
    {
      q: 'How long does a trademark registration last?',
      a: 'A trademark must be renewed every 10 years. We file renewal applications on time and keep an ongoing brand watch to flag infringing marks.',
    },
  ],
  finalCta: {
    eyebrow: 'Intellectual Property Desk',
    title: 'Protect Your Brand Identity',
    accent: 'today',
    text: 'Visit our dedicated Contact Page to consult with our trademark attorneys, conduct class audits, and file Form TM-A with IP India.',
  },
};

export default function TrademarkRegistrationPage() {
  return <ServiceDetailLayout config={CONFIG} />;
}
