// Blog content. Keep this file free of asset imports so it can be read anywhere
// (images are looked up by key in ./blogImages.js).
//
// Block types used by the article renderer:
//   { type: 'p', text }        paragraph
//   { type: 'h2', text }       section heading (also feeds the "In this article" list)
//   { type: 'ul', items }      bullet list
//   { type: 'ol', items }      numbered list
//   { type: 'callout', text }  highlighted takeaway box

export const BLOG_CATEGORIES = [
  'GST & Taxation',
  'Company Registration',
  'IP & Trademarks',
  'ROC Compliance',
];

export const BLOG_POSTS = [
  {
    id: 4,
    slug: 'annual-roc-compliance-calendar-private-limited-company',
    title: 'Annual ROC Compliance Calendar for a Private Limited Company',
    summary:
      'The filings every company owes the Registrar of Companies each year, the deadlines that follow the AGM, and what late filing really costs.',
    category: 'ROC Compliance',
    isoDate: '2026-10-28',
    image: 'compliance',
    content: [
      {
        type: 'p',
        text: 'Every registered company must meet a set of annual filings with the Registrar of Companies (ROC), whether or not it earned any revenue. Missing them leads to late fees that keep building and can put directors at risk. Here is a simple calendar for a private limited company.',
      },
      { type: 'h2', text: 'The key milestones' },
      {
        type: 'ol',
        items: [
          'Within 180 days of incorporation: file Form INC-20A, the declaration for commencement of business, after the paid-up capital is received and the bank account is opened.',
          'Every year: hold the board meetings and the Annual General Meeting (AGM), and record the minutes and resolutions.',
          'Within 30 days of the AGM: file Form AOC-4 with the financial statements.',
          'Within 60 days of the AGM: file the annual return in Form MGT-7 (or MGT-7A where it applies).',
          'Throughout the year: keep each director’s DIN KYC (DIR-3 KYC) up to date so the Director Identification Number is not deactivated.',
        ],
      },
      { type: 'h2', text: 'LLPs have their own filings' },
      {
        type: 'p',
        text: 'Limited Liability Partnerships do not file AOC-4 or MGT-7. Instead they file Form 8 (Statement of Account and Solvency) and Form 11 (Annual Return of LLP) with the Registrar of Companies.',
      },
      { type: 'h2', text: 'What late filing costs' },
      {
        type: 'p',
        text: 'For Form AOC-4 and MGT-7, additional fees of ₹100 per day per form apply with no upper ceiling. Continued default can also lead to disqualification of directors for up to five years under Section 164(2) of the Companies Act, 2013.',
      },
      { type: 'h2', text: 'A practical routine' },
      {
        type: 'ul',
        items: [
          'Fix your AGM date early and work backwards from it.',
          'Close the books and get the accounts approved before the AGM.',
          'Keep statutory registers and minutes up to date through the year.',
          'Track every due date in a shared calendar, or hand it to a company secretary.',
        ],
      },
      {
        type: 'callout',
        text: 'Takeaway: the AGM date drives your calendar. Once it is fixed, the AOC-4 and MGT-7 deadlines follow automatically.',
      },
    ],
  },
  {
    id: 5,
    slug: 'gst-notices-asmt-10-and-drc-01-explained',
    title: 'GST Notices Explained: ASMT-10 and DRC-01',
    summary:
      'What the two most common GST notices mean, why they are issued, and a step-by-step way to prepare a clean, on-time reply.',
    category: 'GST & Taxation',
    isoDate: '2026-10-14',
    image: 'desk',
    content: [
      {
        type: 'p',
        text: 'Receiving a GST notice can be stressful, but many notices are routine requests to explain a mismatch. Understanding what each one is asking helps you respond calmly and on time.',
      },
      { type: 'h2', text: 'Two notices you may see' },
      {
        type: 'ul',
        items: [
          'ASMT-10: issued after scrutiny of a return when the officer finds discrepancies. It asks you to explain the difference or correct it.',
          'DRC-01: a show-cause or demand notice that summarises the tax, interest or penalty the department believes is payable.',
        ],
      },
      { type: 'h2', text: 'How to respond' },
      {
        type: 'ol',
        items: [
          'Read the notice fully and note the reply deadline.',
          'Identify the specific returns, tax periods and amounts in question.',
          'Reconcile your books and invoices with GSTR-1, GSTR-3B and GSTR-2B for those periods.',
          'Prepare a clear written reply with supporting documents such as invoices, challans and bank entries.',
          'Submit the reply on the GST portal within the time allowed and keep the acknowledgement.',
        ],
      },
      { type: 'h2', text: 'Common causes of notices' },
      {
        type: 'ul',
        items: [
          'Mismatch between GSTR-1 and GSTR-3B.',
          'Input Tax Credit claimed that does not appear in GSTR-2B.',
          'Late or missing returns.',
          'Incorrect HSN codes or tax rates on invoices.',
        ],
      },
      { type: 'h2', text: 'Prevention is cheaper' },
      {
        type: 'p',
        text: 'Monthly reconciliation and filing on time remove most of these triggers. If a notice does arrive, early professional help usually makes the reply simpler and stronger.',
      },
      {
        type: 'callout',
        text: 'Takeaway: never ignore a notice. Responding within the stated time with clean documentation resolves most cases.',
      },
    ],
  },
  {
    id: 6,
    slug: 'trademark-objections-section-9-and-section-11',
    title: 'Trademark Objections: Understanding Section 9 and Section 11',
    summary:
      'An examination report is not a rejection. Learn the two kinds of objection and how a well-built reply moves your application forward.',
    category: 'IP & Trademarks',
    isoDate: '2026-09-30',
    image: 'meeting',
    content: [
      {
        type: 'p',
        text: 'After you file a trademark application, the Registry examines it and may issue an examination report with objections. An objection is not a rejection. It is a request to explain or amend, and a good reply can move the application forward.',
      },
      { type: 'h2', text: 'Two kinds of objection' },
      {
        type: 'ul',
        items: [
          'Section 9 (absolute grounds): the problem lies in the mark itself, for example it is descriptive, generic or not distinctive enough.',
          'Section 11 (relative grounds): the problem lies in a conflict with an earlier mark that is identical or deceptively similar.',
        ],
      },
      { type: 'h2', text: 'How a strong reply is built' },
      {
        type: 'ol',
        items: [
          'Study the report and identify each ground that has been raised.',
          'For Section 9, show that the mark is distinctive, or has become distinctive through use, with evidence such as sales, advertising and customer recognition.',
          'For Section 11, compare the marks and the goods or services, and explain why confusion is unlikely.',
          'Attach supporting documents and file the written reply within the period stated in the report.',
          'Be ready for a hearing if the examiner is not convinced by the written reply.',
        ],
      },
      { type: 'h2', text: 'If the mark is accepted' },
      {
        type: 'p',
        text: 'An accepted mark moves on to publication in the Trade Marks Journal, where third parties have four months to oppose. If nobody does, or an opposition fails, the mark proceeds to registration.',
      },
      { type: 'h2', text: 'Avoid objections upfront' },
      {
        type: 'ul',
        items: [
          'Run a full search before filing.',
          'Choose a distinctive name rather than a descriptive one.',
          'File in the correct class with a precise description of your goods or services.',
        ],
      },
      {
        type: 'callout',
        text: 'Takeaway: an objection is the Registry asking questions. Clear arguments and solid evidence can turn many of them into approvals.',
      },
    ],
  },
  {
    id: 1,
    slug: 'gst-filing-checklist-for-small-businesses',
    title: 'GST Filing Checklist for Small Businesses',
    summary:
      'A step-by-step monthly audit checklist to prevent penalty notices, streamline invoice reconciliation, and maximize Input Tax Credit claims.',
    category: 'GST & Taxation',
    isoDate: '2025-04-12',
    image: 'gst',
    content: [
      {
        type: 'p',
        text: 'Goods and Services Tax compliance is a rhythm of small, repeatable tasks. Businesses that follow the same checklist every month rarely face penalty notices, and they keep their Input Tax Credit (ITC) intact. Use this list as a monthly routine for your team or your tax consultant.',
      },
      { type: 'h2', text: 'Your monthly GST checklist' },
      {
        type: 'ul',
        items: [
          'Reconcile your purchase register with GSTR-2B before claiming any Input Tax Credit.',
          'Review outward invoices for the correct GSTIN, invoice date, place of supply and HSN/SAC codes.',
          'Prepare and file GSTR-1 for outward supplies, monthly or quarterly depending on your scheme.',
          'Calculate your tax liability, adjust eligible ITC and file GSTR-3B with payment by the due date.',
          'Save the challan, ARN acknowledgement and working papers for every return.',
        ],
      },
      { type: 'h2', text: 'Why reconciliation matters' },
      {
        type: 'p',
        text: 'ITC can generally be claimed only on invoices that appear in your GSTR-2B. When a supplier has not filed, or has reported an invoice incorrectly, the credit does not show up and your cash outflow rises. A regular 2A/2B reconciliation helps you chase suppliers early, recover missed credit and identify vendors who repeatedly default.',
      },
      { type: 'h2', text: 'Periodic and annual tasks' },
      {
        type: 'ul',
        items: [
          'File the annual return GSTR-9, and the reconciliation statement GSTR-9C where it applies to you.',
          'Keep your Letter of Undertaking (LUT) and export documentation current if you supply goods or services abroad.',
          'Generate e-way bills for movement of goods wherever the rules require them.',
          'Review your registration details and file amendments when your address, partners or directors change.',
        ],
      },
      { type: 'h2', text: 'Avoiding penalty notices' },
      {
        type: 'p',
        text: 'Late or inaccurate filings attract interest and late fees, and mismatches between returns can trigger scrutiny notices such as ASMT-10. Treat every notice as time-sensitive: collect the supporting invoices, reconcile the difference and reply within the period mentioned in the notice.',
      },
      {
        type: 'callout',
        text: 'Takeaway: reconcile first, file second. A ten-minute check of GSTR-2B before every GSTR-3B protects both your credit and your compliance record.',
      },
    ],
  },
  {
    id: 2,
    slug: 'how-to-register-a-business-in-india',
    title: 'How to Register a Business in India',
    summary:
      'Comparing Private Limited vs LLP vs Sole Proprietorship to pick the right legal structure for your startup journey.',
    category: 'Company Registration',
    isoDate: '2025-04-08',
    image: 'biz',
    content: [
      {
        type: 'p',
        text: 'Choosing the legal structure is the first big decision for any founder. It affects personal liability, fundraising, compliance workload and tax. Here is how the common options compare, and what the incorporation process looks like.',
      },
      { type: 'h2', text: 'The main business structures in India' },
      {
        type: 'ul',
        items: [
          'Private Limited Company: a separate legal entity with limited liability, suited to startups and businesses seeking investment. It needs at least two directors and two shareholders.',
          'Limited Liability Partnership (LLP): limited liability with partnership-style flexibility. It needs at least two designated partners and has no minimum capital requirement.',
          'One Person Company (OPC): lets a single founder incorporate with limited liability. A nominee must be appointed.',
          'Sole proprietorship: the simplest to start, but the business and the owner are legally the same person, so liability is unlimited.',
          'Partnership firm: governed by a partnership deed, with partners sharing liability.',
        ],
      },
      { type: 'h2', text: 'How to choose' },
      {
        type: 'ul',
        items: [
          'Planning to raise venture capital or foreign investment? A Private Limited Company is the usual route.',
          'Want limited liability with lighter compliance? Consider an LLP.',
          'Building alone? An OPC gives you a company structure without co-founders.',
          'Testing an idea with minimal paperwork? A proprietorship or partnership can be enough to begin.',
        ],
      },
      { type: 'h2', text: 'The incorporation process' },
      {
        type: 'ol',
        items: [
          'Reserve the company name through the RUN service on the MCA portal.',
          'Obtain Digital Signature Certificates (DSC) for the proposed directors.',
          'Prepare and file the SPICe+ incorporation form along with the MOA and AOA.',
          'PAN and TAN are generated together with the incorporation application.',
          'Receive the Certificate of Incorporation issued by the Registrar of Companies.',
        ],
      },
      { type: 'h2', text: 'Registrations that follow' },
      {
        type: 'ul',
        items: [
          'Open a current account in the name of the company or firm.',
          'Register under GST if your turnover or business model requires it.',
          'Apply for Udyam (MSME) registration to access lending and scheme benefits.',
          'Consider DPIIT recognition if you qualify as a startup.',
          'Protect your brand with a trademark application.',
        ],
      },
      {
        type: 'callout',
        text: 'Takeaway: pick the structure for where the business will be in five years, not just where it starts.',
      },
    ],
  },
  {
    id: 3,
    slug: 'trademark-basics-for-startups',
    title: 'Trademark Basics for Startups',
    summary:
      'Why securing your logo, brand name, and intellectual property early saves millions in future trademark infringement disputes.',
    category: 'IP & Trademarks',
    isoDate: '2025-04-01',
    image: 'tm',
    content: [
      {
        type: 'p',
        text: 'Your brand name, logo and tagline are often the most valuable assets a young business owns. A registered trademark gives you exclusive rights over them across India and a legal basis to act against copycats.',
      },
      { type: 'h2', text: 'What can be registered' },
      {
        type: 'ul',
        items: [
          'Brand or business names (word marks).',
          'Logos and symbols (device marks).',
          'Taglines and slogans.',
          'A combination of words and a logo.',
        ],
      },
      { type: 'h2', text: 'Step 1: search before you file' },
      {
        type: 'p',
        text: 'A trademark search checks the IP India registry for identical or similar marks, whether similar in appearance, sound or meaning, across the 45 Nice classes. Filing without a search is a common reason applications meet objections or opposition.',
      },
      { type: 'h2', text: 'Step 2: file Form TM-A' },
      {
        type: 'p',
        text: 'The application is filed in the right class for your goods or services. Once it is filed you receive an application number and may use the ™ symbol with your brand.',
      },
      { type: 'h2', text: 'Step 3: examination, publication and registration' },
      {
        type: 'ul',
        items: [
          'The Registry examines the application and may raise objections that need a written reply.',
          'Accepted marks are advertised in the Trade Marks Journal for four months so third parties can oppose.',
          'If there is no successful opposition, the registration certificate is issued and you can use the ® symbol.',
        ],
      },
      { type: 'h2', text: 'Renewal and ongoing protection' },
      {
        type: 'p',
        text: 'A registration lasts ten years and can be renewed for further ten-year periods. Keep watching the register for similar marks that could harm your brand. Brands that plan to sell abroad can later look at international protection through the Madrid Protocol.',
      },
      {
        type: 'callout',
        text: 'Takeaway: search first, file early and renew on time. Each step is inexpensive compared with rebranding after a dispute.',
      },
    ],
  },
];

// ── helpers ─────────────────────────────────────────────────────────────

export const SORTED_POSTS = [...BLOG_POSTS].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

export const formatPostDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const getReadTime = (post) => {
  const text = post.content
    .map((b) => b.text || (b.items || []).join(' '))
    .join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
};

export const slugifyHeading = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
