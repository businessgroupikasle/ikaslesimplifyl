import rahulImg from '../assets/client_rahul.jpg';
import articleGstImg from '../assets/article_gst.jpg';
import articleBizImg from '../assets/article_business.jpg';
import articleTmImg from '../assets/article_trademark.jpg';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Process', href: '#process' },
  { name: 'Insights', href: '#insights' },
  { name: 'Contact', href: '#contact' },
];

export const TRUST_INDICATORS = [
  { id: 1, title: '100% Compliance Focus', icon: 'ShieldCheck' },
  { id: 2, title: 'Experienced Professionals', icon: 'Users' },
  { id: 3, title: 'Fast & Hassle-Free Process', icon: 'Zap' },
  { id: 4, title: 'Pan India Support', icon: 'MapPin' },
];

export const SERVICES = [
  {
    id: 'gst-filing',
    title: 'GST Filing',
    description: 'Accurate and timely GST filing with expert support.',
    icon: 'FileText',
    badge: 'Popular',
    details: 'End-to-end GST support: Monthly and quarterly return filings (GSTR-1, GSTR-3B, GSTR-9 annual return), input tax credit (ITC) reconciliation, e-way bill generation, LUT filing for zero-rated exports, and timely responses to department notices.',
    keyPoints: [
      'GSTR-1, 3B, 9 & 9C preparation & filing',
      'Automated ITC mismatch reconciliation (2A/2B)',
      'GST registration & amendment services',
      'Notice drafting & hearing assistance'
    ]
  },
  {
    id: 'business-registrations',
    title: 'Business Registrations',
    description: 'Private, LLP, Proprietorship and more.',
    icon: 'Building2',
    badge: 'Fast Track',
    details: 'Complete corporate entity setup with Ministry of Corporate Affairs (MCA). From digital signatures and name reservation (RUN) to SPICe+ Part A & B incorporation, PAN/TAN generation, bank account opening assistance, and commencement certificate.',
    keyPoints: [
      'Private Limited & One Person Company (OPC)',
      'Limited Liability Partnership (LLP)',
      'Sole Proprietorship & Partnership Deeds',
      'Drafting MOA, AOA, and Board Resolutions'
    ]
  },
  {
    id: 'trademark-support',
    title: 'Trademark Support',
    description: 'Protect your brand with strong legal backing.',
    icon: 'ShieldCheck',
    badge: 'IP Protection',
    details: 'Fortify your brand identity across India. Comprehensive public trademark registry search to identify phonetic and visual conflicts, application filing across appropriate Nice classes, drafting replies to examination objections, and hearing representation.',
    keyPoints: [
      'Comprehensive TM class classification & search',
      'Filing Form TM-A with IP India',
      'Examination report objection handling',
      'Trademark renewal & trademark watch'
    ]
  },
  {
    id: 'compliance-support',
    title: 'Compliance Support',
    description: 'ROC, Annual Filings, & Regulatory Support.',
    icon: 'FileCheck2',
    badge: 'Annual Care',
    details: 'Prevent statutory penalties and director disqualifications with proactive annual ROC compliance. We manage mandatory Board and AGM minutes, AOC-4 financial statement filing, MGT-7 annual return, DIR-3 KYC, and statutory register maintenance.',
    keyPoints: [
      'Annual ROC filings (AOC-4, MGT-7, MGT-7A)',
      'Director KYC (DIR-3 KYC) & appointment/resignation',
      'Statutory audit coordination & bookkeeping',
      'Maintenance of statutory records & registers'
    ]
  },
  {
    id: 'allied-services',
    title: 'Allied Services',
    description: 'PAN, TAN, DSC, Udyam and more.',
    icon: 'Layers',
    badge: 'Essential',
    details: 'Crucial auxiliary government licenses and registrations needed to run operations legally and smoothly. Fast-track issue of Class-3 Digital Signature Certificates (DSC), MSME / Udyam registration for priority lending, Import Export Code (IEC), and local trade licenses.',
    keyPoints: [
      'Class 3 Digital Signatures (DSC) with e-token',
      'Udyam MSME certificate with priority benefits',
      'Import Export Code (IEC) from DGFT',
      'Professional Tax, Shops & Establishment Act'
    ]
  },
  {
    id: 'consultation',
    title: 'Consultation',
    description: 'Get expert advice for your business needs.',
    icon: 'Headphones',
    badge: 'Advisory',
    details: 'Direct consultation sessions with seasoned Chartered Accountants, Company Secretaries, and Legal Advisors. Get actionable strategic advice on optimal entity structure, capital structuring, tax saving opportunities, and cross-border regulatory compliance.',
    keyPoints: [
      'Tailored business structure evaluation',
      'Direct & indirect tax optimization strategies',
      'Startup India recognition & angel tax guidance',
      'Contract review and statutory risk audit'
    ]
  },
];

export const ABOUT_BENEFITS = [
  {
    id: 1,
    title: 'Expert Guidance',
    description: 'From professionals with real-world experience.',
    icon: 'UserCheck',
  },
  {
    id: 2,
    title: 'Transparent Process',
    description: 'No hidden charges. No surprises.',
    icon: 'FileCheck',
  },
  {
    id: 3,
    title: 'Dedicated Support',
    description: 'Always here when you need us.',
    icon: 'ShieldCheck',
  },
  {
    id: 4,
    title: 'Business Focused',
    description: 'Your growth is our priority.',
    icon: 'TrendingUp',
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: 'Experienced Team',
    description: 'Skilled professionals with years of industry experience.',
    icon: 'Users',
  },
  {
    id: 2,
    title: 'Quick Turnaround',
    description: 'Save time with our streamlined process.',
    icon: 'Clock',
  },
  {
    id: 3,
    title: '100% Accuracy',
    description: 'We ensure error-free filings and registrations.',
    icon: 'CheckCircle2',
  },
  {
    id: 4,
    title: 'Affordable Pricing',
    description: 'Quality service at transparent costs.',
    icon: 'BadgePercent',
  },
];

export const IMPACT_STATS = [
  { value: '5000+', label: 'Happy Clients', highlight: true },
  { value: '99%', label: 'Accuracy Rate', highlight: false },
  { value: '2000+', label: 'Registrations Processed', highlight: false },
  { value: '100%', label: 'Compliance Focus', highlight: false },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Understand your needs and requirements.',
  },
  {
    step: '02',
    title: 'Documentation',
    description: 'Collect and verify your documents.',
  },
  {
    step: '03',
    title: 'Processing',
    description: 'We handle the filings and registrations.',
  },
  {
    step: '04',
    title: 'Review',
    description: 'Ensure accuracy and compliance.',
  },
  {
    step: '05',
    title: 'Delivery',
    description: 'Get your certificates and updates.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Simplifyl made our GST filing and registration process so easy. Their team is professional, responsive and always helpful.',
    name: 'Rahul S.',
    role: 'Business Owner',
    company: 'Apex Retail Tech',
    image: rahulImg,
    verified: true,
  },
  {
    id: 2,
    quote: 'Incorporating our Private Limited firm took less than a week without a single hiccup. Truly exceptional transparency, proactive updates and expert guidance throughout.',
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    company: 'Klarity Analytics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verified: true,
  },
  {
    id: 3,
    quote: 'Their trademark support gave our brand ironclad legal security. The team answered all our queries patiently and kept us updated on every examination milestone.',
    name: 'Vikram Malhotra',
    role: 'Managing Director',
    company: 'Nexus Ventures',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verified: true,
  },
];

export const ARTICLES = [
  {
    id: 1,
    date: 'APR 12, 2025',
    title: 'GST Filing Checklist for Small Businesses',
    summary: 'A step-by-step monthly audit checklist to prevent penalty notices, streamline invoice reconciliation, and maximize Input Tax Credit claims.',
    readTime: '4 min read',
    image: articleGstImg,
    category: 'GST & Taxation',
    content: 'Navigating GST compliance in India requires rigorous attention to invoice timing, HSN classification, and timely reconciliation between GSTR-2B and purchase registers. In this comprehensive guide, we unpack the monthly compliance checklist that every SME and startup must maintain to avoid interest penalties and preserve input tax credits.'
  },
  {
    id: 2,
    date: 'APR 08, 2025',
    title: 'How to Register a Business in India',
    summary: 'Comparing Private Limited vs LLP vs Sole Proprietorship to pick the right legal structure for your startup journey.',
    readTime: '6 min read',
    image: articleBizImg,
    category: 'Company Registration',
    content: 'Choosing between a Private Limited Company, an LLP, and a Sole Proprietorship is one of the most critical structural decisions for any new entrepreneur. Factors including investor fundraising, liability limitation, annual compliance cost, and tax rates dictate which entity will best serve your 5-year growth vision.'
  },
  {
    id: 3,
    date: 'APR 01, 2025',
    title: 'Trademark Basics for Startups',
    summary: 'Why securing your logo, brand name, and intellectual property early saves millions in future trademark infringement disputes.',
    readTime: '5 min read',
    image: articleTmImg,
    category: 'IP & Trademarks',
    content: 'A trademark is your brand\'s most defensible asset. From conducting an exhaustive preliminary trademark search to navigating Madrid Protocol international filings, this guide explores how young brands can secure nationwide legal monopoly over their names, logos, and taglines.'
  },
];
