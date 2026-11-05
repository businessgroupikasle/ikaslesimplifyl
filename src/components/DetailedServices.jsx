import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Building2, ShieldCheck, FileCheck2, 
  ChevronDown, ArrowRight, CheckCircle2, FileQuestion, HelpCircle 
} from 'lucide-react';
import { Link } from '../lib/router';
import gstImg from '../assets/article_gst.jpg';
import bizImg from '../assets/article_business.jpg';
import tmImg from '../assets/article_trademark.jpg';
import compImg from '../assets/compliance_team.jpg';

export default function DetailedServices({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('gst');
  const [expandedSection, setExpandedSection] = useState('services');

  const categories = {
    gst: {
      id: 'gst',
      title: 'GST Filing & Taxation Services',
      tagline: 'End-to-end statutory goods & services tax management',
      icon: FileText,
      image: gstImg,
      pageLink: '/gst-filing',
      description: 'Comprehensive GST support tailored for traders, manufacturers, service providers, and digital businesses. We handle initial GST registrations, periodic monthly and quarterly returns, ITC reconciliations, and responses to department notices.',
      servicesList: [
        'New GST Registration for Proprietors, Partnerships, & Companies',
        'Monthly GSTR-1 (Outward Supplies) & GSTR-3B (Summary Return) Filing',
        'GSTR-9 Annual Return & GSTR-9C Reconciliation Statement',
        'Input Tax Credit (ITC) 2A/2B Automated Reconciliation',
        'Core & Non-Core Field GST Amendments',
        'Voluntary Cancellation and Revocation of Cancelled GSTIN',
        'Drafting replies to ASMT-10, DRC-01, and Department Inquiries'
      ],
      benefits: [
        'Avoid late filing fees and compounding interest penalties',
        'Prevent working capital blockage by optimizing Input Tax Credit',
        'Maintain high GST compliance rating on the official portal',
        'Timely intimation of changing GST notifications and rate updates'
      ],
      documents: [
        'PAN Card of Business and Directors / Proprietor',
        'Aadhaar Card / Identification of Authorized Signatory',
        'Proof of Business Place (Electricity Bill / Rent Agreement & NOC)',
        'Cancelled Cheque / Bank Account Statement',
        'Board Resolution or Letter of Authorization'
      ],
      process: [
        'Step 1: Document sharing via encrypted workspace',
        'Step 2: Sales, purchase, and ITC data verification by tax specialist',
        'Step 3: Draft tax liability calculation and client approval',
        'Step 4: Government filing submission and challan acknowledgement dispatch'
      ],
      faqs: [
        {
          q: 'Who is required to obtain GST registration?',
          a: 'Businesses with turnover exceeding ₹40 Lakhs (₹20 Lakhs for special category states) for goods or ₹20 Lakhs (₹10 Lakhs for special category states) for services, as well as all e-commerce sellers and interstate suppliers regardless of turnover.'
        },
        {
          q: 'What is the due date for monthly GSTR-3B?',
          a: 'GSTR-3B is typically due by the 20th of the following month for regular monthly taxpayers, or staggered dates under the QRMP scheme.'
        }
      ]
    },
    business: {
      id: 'business',
      title: 'Business Incorporation & Entity Setup',
      tagline: 'Structured company registration with statutory authorities',
      icon: Building2,
      image: bizImg,
      pageLink: '/business-registration',
      description: 'Turn your enterprise idea into a legally recognized corporate entity. We assist in evaluating suitable structures, drafting constitutional charter documents, filing with the Registrar of Companies (ROC), and securing post-incorporation registrations.',
      servicesList: [
        'Private Limited Company Incorporation (SPICe+ Part A & B)',
        'Limited Liability Partnership (LLP) Registration (FiLLiP)',
        'One Person Company (OPC) for Solo Entrepreneurs',
        'Partnership Firm Registration & Drafting of Partnership Deed',
        'Sole Proprietorship Registration (Udyam & Shop Act)',
        'MSME / Udyam Certificate for Priority Lending Benefits',
        'Startup India Recognition & DPIIT Certificate Assistance'
      ],
      benefits: [
        'Limited liability protection safeguarding personal assets',
        'Greater credibility with enterprise vendors and commercial banks',
        'Clear shareholding structure enabling angel and VC investment',
        'Access to government subsidies, public tenders, and tax holidays'
      ],
      documents: [
        'PAN Card of all Directors and Shareholders',
        'Identity Proof (Voter ID / Passport / Driving License)',
        'Address Proof (Bank Statement / Electricity Bill not older than 2 months)',
        'Passport-sized photographs of Directors',
        'Registered Office Proof (Electricity Bill + NOC from property owner)'
      ],
      process: [
        'Step 1: Consultation on optimal entity type and name search check',
        'Step 2: Obtaining Digital Signature Certificates (DSC) and Director Identification',
        'Step 3: Drafting Memorandum (MOA) and Articles of Association (AOA)',
        'Step 4: Submission to MCA and issuance of Certificate of Incorporation (COI)'
      ],
      faqs: [
        {
          q: 'How long does Private Limited incorporation take?',
          a: 'Typically 5 to 10 business days subject to ROC approval and prompt submission of verified identity documents.'
        },
        {
          q: 'Is a physical commercial office mandatory for company registration?',
          a: 'No. You can register your company at a residential address provided you submit an electricity bill and NOC from the owner.'
        }
      ]
    },
    trademark: {
      id: 'trademark',
      title: 'Trademark & Intellectual Property',
      tagline: 'Protect your brand name, logo, and commercial identity',
      icon: ShieldCheck,
      image: tmImg,
      pageLink: '/trademark-registration',
      description: 'Shield your hard-earned reputation and brand value. We conduct rigorous trademark availability searches across the 45 Nice classes, draft formal applications (Form TM-A), and assist throughout examination, opposition, and renewal.',
      servicesList: [
        'Public Trademark Search & Class Identification Report',
        'Trademark Application Filing (Word Mark, Device Mark, Logo)',
        'Drafting Formal Legal Replies to Trademark Examination Objections',
        'Hearing Representation and Advocate Coordination',
        'Trademark Opposition Notice and Counter-Statement Drafting',
        'Trademark Renewal (Every 10 years) & Restoration',
        'Brand Protection Guidance and Cease-and-Desist Notices'
      ],
      benefits: [
        'Exclusive nationwide legal monopoly over your brand name',
        'Right to display the prestigious ® registered trademark symbol',
        'Deters counterfeiters and copycat competitors from hijacking your brand',
        'Valuable intangible corporate asset eligible for licensing or franchising'
      ],
      documents: [
        'Applicant Name, Address, and Nationality Details',
        'High-Resolution Brand Logo / Wordmark in JPEG/PNG format',
        'Brief description of goods and services being provided under the brand',
        'Date of first commercial use in India (or filed on Proposed to be Used basis)',
        'Power of Attorney / Form TM-48 signed by the applicant'
      ],
      process: [
        'Step 1: Exhaustive phonetic and semantic trademark search',
        'Step 2: Selection of appropriate Nice classes and applicant classification',
        'Step 3: Lodging Form TM-A with the Trademark Registry (IP India)',
        'Step 4: Immediate issuance of application number allowing use of ™ symbol'
      ],
      faqs: [
        {
          q: 'When can I start using the ™ symbol?',
          a: 'You can display ™ immediately after submitting the trademark application and receiving the official acknowledgement.'
        },
        {
          q: 'When can I use the ® symbol?',
          a: 'The ® symbol may legally be displayed only after the Trademark Registrar formally issues the Final Registration Certificate.'
        }
      ]
    },
    compliance: {
      id: 'compliance',
      title: 'Statutory Corporate Compliance & ROC',
      tagline: 'Active regulatory maintenance and secretarial protection',
      icon: FileCheck2,
      image: compImg,
      pageLink: '/compliance-support',
      description: 'Ensure your enterprise remains in active standing with the Ministry of Corporate Affairs (MCA) and tax authorities. We manage annual returns, secretarial documentation, director KYC, and board resolutions to prevent disqualification and penalties.',
      servicesList: [
        'Annual ROC Filing for Private Limited Companies (AOC-4 & MGT-7/7A)',
        'Annual LLP Returns Filing (Form 11 & Form 8)',
        'Annual Director KYC (DIR-3 KYC Web / e-Form)',
        'Drafting Minutes of Board Meetings and Annual General Meetings (AGM)',
        'Appointment, Resignation, and Change of Directors (DIR-12)',
        'Increase in Authorized Share Capital and Alteration of MOA (SH-7)',
        'Filing of Commencement of Business Certificate (Form INC-20A)'
      ],
      benefits: [
        'Protects directors against severe disqualification under Section 164',
        'Eliminates hefty daily compounding late penalties imposed by the MCA',
        'Keeps your company in Active status for banking and funding diligence',
        'Maintains orderly statutory registers and corporate records'
      ],
      documents: [
        'Audited Financial Statements (Balance Sheet & Profit/Loss Account)',
        'Directors’ Report with statutory disclosures',
        'Active Digital Signature Certificate (DSC) of Director and Auditor/CS',
        'Updated List of Shareholders and Share Transfers (if any)'
      ],
      process: [
        'Step 1: Review of annual books and statutory audit statements',
        'Step 2: Drafting annual governance documents (Notice, AGM Minutes, Director Report)',
        'Step 3: Preparation and digital signing of AOC-4 and MGT-7 forms',
        'Step 4: Official filing on MCA portal and archiving SRN challan receipts'
      ],
      faqs: [
        {
          q: 'What happens if a company fails to file annual ROC returns?',
          a: 'Late fees accumulate at ₹100 per day per form with no upper cap, directors risk disqualification for 5 years, and the ROC may initiate strike-off proceedings.'
        },
        {
          q: 'Is DIR-3 KYC mandatory for non-active directors?',
          a: 'Yes. Every individual holding a DIN must complete annual Director KYC regardless of whether they actively hold directorships.'
        }
      ]
    }
  };

  const current = categories[activeTab];

  return (
    <section className="py-10 lg:py-14 bg-white dark:bg-[#091822] border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FB] dark:bg-blue-950/60 border border-[#E3EFF8] dark:border-blue-800/60 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5]" />
            <span className="text-xs font-bold text-[#1C6FA5] dark:text-blue-300 tracking-wider uppercase">
              DETAILED BREAKDOWN
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10364E] dark:text-white tracking-tight">
            Detailed Service Specifications
          </h2>

          <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Review inclusions, documentation requirements, procedural steps, and tangible benefits for each core compliance practice.
          </p>
        </div>

        {/* Elevated Category Selector Tabs with Sliding Pill Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-2 bg-[#F5F7FA] dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 max-w-4xl mx-auto shadow-inner relative">
          {Object.keys(categories).map((key) => {
            const cat = categories[key];
            const Icon = cat.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setExpandedSection('services');
                }}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-extrabold transition-colors duration-200 z-10 ${
                  isActive ? 'text-white' : 'text-slate-600 dark:text-slate-300 hover:text-[#10364E] dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#10364E] via-[#144463] to-[#174E72] dark:from-blue-700 dark:via-blue-600 dark:to-[#174E72] rounded-xl shadow-md shadow-navy-950/20 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-slate-800 text-[#1C6FA5] dark:text-blue-300'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{cat.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Container with Multi-layer Shadow */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(16,54,78,0.06)] dark:shadow-none p-6 sm:p-10 relative overflow-hidden">
          
          {/* Subtle top brand aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* AnimatePresence for Active Tab Content Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Header of Active Service with Visual Image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-100 dark:border-slate-800 relative z-10">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FB] dark:bg-blue-950/60 border border-[#E3EFF8] dark:border-blue-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C6FA5] animate-pulse" />
                    <span className="text-xs font-bold text-[#1C6FA5] dark:text-blue-300 uppercase tracking-wider">
                      {current.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10364E] dark:text-white leading-tight">
                    {current.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                    {current.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <button
                      onClick={() => onOpenContact(current.title)}
                      className="btn-shimmer px-6 py-3 rounded-full bg-gradient-to-r from-[#10364E] to-[#174E72] hover:from-[#174E72] hover:to-[#1C6FA5] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-navy-950/20 active:scale-95 group"
                    >
                      <span>Enquire For This Practice</span>
                    </button>
                    <Link
                      to={current.pageLink}
                      className="px-5 py-3 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-[#F4F8FB] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#10364E] dark:text-slate-200 hover:text-[#1C6FA5] dark:hover:text-blue-300 hover:border-[#1C6FA5]/40 transition-colors"
                    >
                      Dedicated Service Page →
                    </Link>
                  </div>
                </div>

                {/* Active Service Photo Card with Floating Active Scope Badge */}
                <div className="lg:col-span-4">
                  <div className="rounded-2xl p-2 bg-gradient-to-tr from-slate-100 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-950/40 dark:to-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg group relative">
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative">
                      <img
                        src={current.image}
                        alt={current.title}
                        width="600"
                        height="375"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10364E]/70 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating perpetual levitation pill on photo */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white bg-[#10364E]/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-md"
                      >
                        <span className="text-[11px] font-bold truncate">
                          {current.title.split('&')[0].trim()}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-wider uppercase bg-[#1C6FA5] px-2 py-0.5 rounded-full shadow-xs">
                          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                          Live
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Accordions for Details with Buttery Smooth Transitions */}
              <div className="mt-8 space-y-4 relative z-10">
                
                {/* Accordion 1: Service List */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'services' ? '' : 'services')}
                    className={`w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-extrabold text-sm transition-colors duration-200 ${
                      expandedSection === 'services' ? 'bg-[#10364E] dark:bg-slate-800 text-white' : 'bg-[#F5F7FA] dark:bg-slate-800/70 text-[#10364E] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${expandedSection === 'services' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-[#1C6FA5] dark:text-blue-300 shadow-xs'}`}>
                        01
                      </div>
                      <span>Individual Services & Inclusions</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'services' ? 'rotate-180 text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {current.servicesList.map((srv, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 glass-hover transition-all duration-200">
                                <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] dark:text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-normal">{srv}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: Benefits */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'benefits' ? '' : 'benefits')}
                    className={`w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-extrabold text-sm transition-colors duration-200 ${
                      expandedSection === 'benefits' ? 'bg-[#10364E] dark:bg-slate-800 text-white' : 'bg-[#F5F7FA] dark:bg-slate-800/70 text-[#10364E] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${expandedSection === 'benefits' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-[#1C6FA5] dark:text-blue-300 shadow-xs'}`}>
                        02
                      </div>
                      <span>Key Benefits & Value Delivered</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'benefits' ? 'rotate-180 text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === 'benefits' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {current.benefits.map((bnf, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#F4F8FB]/60 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-800 glass-hover transition-all">
                                <CheckCircle2 className="w-4 h-4 text-[#1C6FA5] dark:text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-normal">{bnf}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 3: Documents Required */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'documents' ? '' : 'documents')}
                    className={`w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-extrabold text-sm transition-colors duration-200 ${
                      expandedSection === 'documents' ? 'bg-[#10364E] dark:bg-slate-800 text-white' : 'bg-[#F5F7FA] dark:bg-slate-800/70 text-[#10364E] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${expandedSection === 'documents' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-[#1C6FA5] dark:text-blue-300 shadow-xs'}`}>
                        03
                      </div>
                      <span>Required Documents & Checklists</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'documents' ? 'rotate-180 text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === 'documents' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            Note: Exact document requirements may vary slightly depending on applicant constitution, entity type, and regulatory amendments.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {current.documents.map((doc, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                                <span className="w-6 h-6 rounded-full bg-[#10364E] dark:bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-normal pt-0.5">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 4: Process Flow */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'process' ? '' : 'process')}
                    className={`w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-extrabold text-sm transition-colors duration-200 ${
                      expandedSection === 'process' ? 'bg-[#10364E] dark:bg-slate-800 text-white' : 'bg-[#F5F7FA] dark:bg-slate-800/70 text-[#10364E] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${expandedSection === 'process' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-[#1C6FA5] dark:text-blue-300 shadow-xs'}`}>
                        04
                      </div>
                      <span>Standard Process Flow</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'process' ? 'rotate-180 text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === 'process' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {current.process.map((step, i) => (
                              <div key={i} className="p-4 rounded-xl bg-gradient-to-b from-white to-[#F5F7FA] dark:from-slate-800 dark:to-slate-850 border border-slate-200/90 dark:border-slate-700 shadow-xs relative hover:-translate-y-1 glass-hover transition-all duration-200">
                                <span className="text-[10px] font-mono font-extrabold text-[#1C6FA5] dark:text-blue-400 bg-[#F4F8FB] dark:bg-slate-900 px-2 py-0.5 rounded-full">
                                  Phase 0{i + 1}
                                </span>
                                <p className="text-xs font-bold text-[#10364E] dark:text-slate-200 mt-2.5 leading-relaxed">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 5: FAQs */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'faqs' ? '' : 'faqs')}
                    className={`w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-extrabold text-sm transition-colors duration-200 ${
                      expandedSection === 'faqs' ? 'bg-[#10364E] dark:bg-slate-800 text-white' : 'bg-[#F5F7FA] dark:bg-slate-800/70 text-[#10364E] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${expandedSection === 'faqs' ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-[#1C6FA5] dark:text-blue-300 shadow-xs'}`}>
                        05
                      </div>
                      <span>Category Frequently Asked Questions</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'faqs' ? 'rotate-180 text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === 'faqs' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 space-y-3.5">
                          {current.faqs.map((faq, i) => (
                            <div key={i} className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 glass-hover transition-all">
                              <p className="text-xs font-extrabold text-[#10364E] dark:text-white">Q: {faq.q}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">A: {faq.a}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Bottom Callout */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Have specific questions regarding {current.title}? Our consultants are available to assist.
                </p>
                <button
                  onClick={() => onOpenContact(current.title)}
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#10364E] hover:bg-[#174E72] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span>Enquire For This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
