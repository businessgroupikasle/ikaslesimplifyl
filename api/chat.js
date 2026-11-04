/**
 * Simplifyl AI Compliance Assistant - Serverless API Route
 * Handles user messages, contextual compliance reasoning, and lead capture.
 */

const SYSTEM_KNOWLEDGE = [
  {
    topics: ['gst', 'gstr', 'gst filing', 'gst return', 'gstr-1', 'gstr-3b', 'gstr-9', 'input tax credit', 'itc', 'asmt-10'],
    reply: `
**GST Compliance & Returns Filing:**

• **Filing Thresholds:** Registration is mandatory if annual turnover exceeds ₹40 Lakh for goods (₹20 Lakh for special category states) and ₹20 Lakh for service providers.
• **Regular Filings:** We manage end-to-end filing for **GSTR-1** (monthly by 11th or quarterly under QRMP) and **GSTR-3B** (tax computation by 20th/22nd/24th).
• **Annual Return:** GSTR-9 and reconciliation support.
• **ITC Audit:** Automated reconciliation with GSTR-2B to safeguard against reversals and penal interest under Section 50.
• **Notice Resolution:** Drafting legal replies for ASMT-10 discrepancies and DRC-01 notices.

Would you like to book a free consultation or have our tax expert call you?
    `.trim(),
    action: {
      type: 'lead_form',
      defaultService: 'GST Filing',
      label: 'Request GST Callback'
    }
  },
  {
    topics: ['pvt ltd', 'company registration', 'incorporate', 'private limited', 'llp', 'opc', 'partnership', 'proprietorship', 'start business', 'incorporation'],
    reply: `
**Business Registration & Corporate Incorporation:**

• **Private Limited Company (Pvt Ltd):** Best suited for growth startups and fundraising. Minimum 2 directors and 2 shareholders. Offers limited liability protection and high corporate credibility.
• **Limited Liability Partnership (LLP):** Ideal for professional services, agencies, and consultancies. Combines partnership flexibility with limited corporate liability.
• **One Person Company (OPC):** Single-entrepreneur structure with limited liability.
• **Sole Proprietorship & MSME (Udyam):** Quickest setup for retail, trading, and localized ventures.

**Included in our setup package:** Name Approval (RUN), DSC (Digital Signatures), DIN, MOA/AOA drafting, and MCA SPICe+ submission.
    `.trim(),
    action: {
      type: 'lead_form',
      defaultService: 'Business Registration',
      label: 'Get Registration Assistance'
    }
  },
  {
    topics: ['trademark', 'tm', 'brand', 'logo', 'copyright', 'patent', 'trademark objection', 'hearing', 'trademark classes'],
    reply: `
**Trademark & Brand Protection (IP India):**

• **Pre-Filing Search:** Exhaustive search across all 45 NICE classification classes to ensure your mark has zero identical or phonetically confusing conflicts.
• **Application (TM-A):** Entitles you to use the **™** mark right after filing.
• **Objection Management:** Specialized drafting of examination replies under Sections 9 & 11 by registered IP attorneys.
• **Registration Certificate:** Grants exclusive 10-year rights with the prestigious **®** registered symbol.

Protect your brand identity before someone else registers it!
    `.trim(),
    action: {
      type: 'lead_form',
      defaultService: 'Trademark Registration',
      label: 'Protect Your Brand'
    }
  },
  {
    topics: ['roc', 'annual filing', 'dir-3 kyc', 'dir 3', 'aoc-4', 'aoc 4', 'mgt-7', 'mgt 7', 'secretarial', 'statutory audit'],
    reply: `
**Annual ROC Compliance & Secretarial Audits:**

Every active company and LLP registered with MCA must maintain statutory compliance:
1. **Form AOC-4:** Filing of balance sheet and P&L account with ROC (within 30 days of AGM).
2. **Form MGT-7/7A:** Annual return detailing shareholding (within 60 days of AGM).
3. **Form DIR-3 KYC:** Annual biometric/OTP validation for all DIN directors before Sept 30.
4. **LLP Form 11 & Form 8:** Annual returns and accounts statement.

**Avoid ₹100/day penal fees:** Our compliance monitoring ensures all filings are executed smoothly ahead of statutory deadlines.
    `.trim(),
    action: {
      type: 'lead_form',
      defaultService: 'Compliance Support',
      label: 'Schedule Compliance Check'
    }
  },
  {
    topics: ['price', 'pricing', 'cost', 'fee', 'charges', 'rate', 'quote', 'package'],
    reply: `
**Simplifyl Transparent Pricing Overview:**

• **Monthly GST Filing:** Starting from ₹999/month.
• **Pvt Ltd Registration:** Professional fee from ₹4,999 + Govt fees (Includes 2 DSCs, DINs, Name Approval & Incorporation).
• **LLP Registration:** Professional fee from ₹3,999 + Govt fees.
• **Trademark Filing:** ₹1,499 professional fee + ₹4,500 Govt fee (Individual/Startup/MSME).
• **Annual ROC Compliance:** Packages starting at ₹7,999/year.

We offer zero hidden charges with itemized invoicing.
    `.trim(),
    action: {
      type: 'lead_form',
      defaultService: 'Other',
      label: 'Get Detailed Quotation'
    }
  },
  {
    topics: ['contact', 'phone', 'call', 'number', 'whatsapp', 'email', 'address', 'office', 'talk', 'human', 'expert', 'ca'],
    reply: `
**Connect with Simplifyl Advisory Desk:**

📞 **Helpline:** [+91 78451 32962](tel:+917845132962)  
💬 **WhatsApp:** [Chat with Advisory Team](https://wa.me/917845132962)  
✉️ **Email:** [businessgroupikasle@gmail.com](mailto:businessgroupikasle@gmail.com)  
📍 **Office:** 1639/A, 2nd Floor, Hopes, Coimbatore, Tamil Nadu – 641004  
⏰ **Hours:** Monday to Saturday, 9:00 AM – 7:00 PM IST
    `.trim(),
    action: {
      type: 'whatsapp',
      label: 'Open WhatsApp Directly',
      text: 'Hello Simplifyl Team! I would like to speak with an advisor.'
    }
  },
  {
    topics: ['tamil', 'vanakkam', 'epdi', 'enna', 'venum', 'panradhu', 'register'],
    reply: `
**வணக்கம்! Simplifyl Compliance Desk-க்கு வரவேற்கிறோம்.**

நாங்கள் உங்கள் நிறுவனத்திற்கான அனைத்து சட்டப்பூர்வ சேவைகளையும் வழங்குகிறோம்:
• **GST பதிவு & ரிட்டர்ன் ஃபைலிங்** (GSTR-1, 3B, 9)
• **Company Registration** (Private Limited, LLP, OPC, MSME Udyam)
• **Trademark (TM) பதிவு** & Brand Security
• **ROC Annual Compliance** & Accounts Audit

உங்களுக்கு எந்த சேவை தேவைப்படுகிறது? கீழே உங்கள் பெயர் மற்றும் போன் நம்பரை பதிவிட்டால் எங்கள் CA ஆலோசகர் உங்களை அழைப்பார்!
    `.trim(),
    action: {
      type: 'lead_form',
      defaultService: 'GST Filing',
      label: 'ஆலோசகர் அழைக்க கோரிக்கை'
    }
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { message, context = {} } = req.body || {};
    const userText = (message || '').trim().toLowerCase();

    if (!userText) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Match topics from knowledge base
    for (const item of SYSTEM_KNOWLEDGE) {
      if (item.topics.some((kw) => userText.includes(kw))) {
        return res.status(200).json({
          success: true,
          reply: item.reply,
          action: item.action,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Fallback response with contextual lead capture
    const fallbackService = context.currentPage?.includes('gst')
      ? 'GST Filing'
      : context.currentPage?.includes('trademark')
      ? 'Trademark Registration'
      : context.currentPage?.includes('compliance')
      ? 'Compliance Support'
      : context.currentPage?.includes('registration')
      ? 'Business Registration'
      : 'General Consultation';

    return res.status(200).json({
      success: true,
      reply: `
Thank you for your enquiry!

Our advisory desk assists businesses across India with:
• **GST Filing, Amendments & Audit Reconciliation**
• **Private Limited, LLP, OPC & MSME Incorporations**
• **Trademark Brand Protection & Legal Hearing Support**
• **ROC Annual Filings, AOC-4, MGT-7 & Director KYC**

Would you like one of our Chartered Accountants or Company Secretaries to review your requirements? Fill your details below for a quick callback!
      `.trim(),
      action: {
        type: 'lead_form',
        defaultService: fallbackService,
        label: 'Request Free Callback'
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('[Simplifyl Chat API Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process chat query.',
      error: err.message
    });
  }
}

