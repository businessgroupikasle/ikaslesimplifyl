import React from 'react';
import LegalLayout from '../components/LegalLayout';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://simplifyl.com/privacy-policy#webpage',
    'url': 'https://simplifyl.com/privacy-policy',
    'name': 'Privacy Policy | Simplifyl Compliance Solutions',
    'description': 'Read the Simplifyl Privacy Policy. Learn how we collect, process, and safeguard your personal and corporate data in compliance with Indian Information Technology and Data Protection laws.',
    'isPartOf': {
      '@type': 'WebSite',
      '@id': 'https://simplifyl.com/#website',
      'name': 'Simplifyl Compliance Solutions',
      'url': 'https://simplifyl.com'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://simplifyl.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Privacy Policy',
          'item': 'https://simplifyl.com/privacy-policy'
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Privacy Policy | Simplifyl Compliance Solutions"
        description="Read the Simplifyl Privacy Policy. Learn how we collect, process, and safeguard your personal and corporate data in compliance with Indian Information Technology and Data Protection laws."
        canonicalUrl="https://simplifyl.com/privacy-policy"
        noIndex={false}
        schema={schema}
      />

      <LegalLayout
        title="Privacy Policy"
        subtitle="How Simplifyl Compliance Solutions collects, processes, protects, and stores client information."
        lastUpdated="April 15, 2025"
        currentPath="/privacy-policy"
      >
        <section>
          <h2>1. Introduction & Overview</h2>
          <p>
            Simplifyl Compliance Solutions ("Simplifyl", "we", "our", or "us") is committed to protecting the privacy, confidentiality, and security of our clients, website visitors, and business partners. This Privacy Policy outlines our standards and practices regarding the collection, handling, storage, and disclosure of information gathered through our website (<strong>https://simplifyl.com</strong>) and our corporate compliance and advisory services.
          </p>
          <p>
            By accessing our website or utilizing our professional services—including GST filing, company registrations, trademark filing, and secretarial compliance—you agree to the collection and use of information in accordance with this policy and Indian data protection regulations (including the Information Technology Act, 2000, the SPDI Rules, 2011, and the Digital Personal Data Protection Act, 2023).
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            To deliver accurate statutory and compliance services, we collect both personal identifiable information (PII) and corporate documentation, including:
          </p>
          <ul>
            <li>
              <strong>Contact Information:</strong> Full name, official email address, mobile/telephone number, and correspondence address.
            </li>
            <li>
              <strong>Statutory & KYC Identifiers:</strong> PAN (Permanent Account Number), Aadhaar details (for verification as permitted by law), Director Identification Numbers (DIN), Digital Signature Certificates (DSC), and passport/voter ID copies for incorporation.
            </li>
            <li>
              <strong>Business & Financial Data:</strong> Company incorporation certificates, MOA/AOA, GSTIN, sales/purchase registers, bank account statements, and invoices necessary for GST return preparation and annual ROC filings.
            </li>
            <li>
              <strong>Technical Usage Data:</strong> IP address, browser type and version, operating system, referring URL, pages visited, date and time of visits, and basic diagnostic telemetry.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Purpose and Legal Basis of Data Processing</h2>
          <p>We process your data exclusively for lawful business and statutory objectives, including:</p>
          <ul>
            <li>Preparing and submitting statutory filings to regulatory portals including GSTN (Goods and Services Tax Network), MCA21 (Ministry of Corporate Affairs), and IP India (Trade Marks Registry).</li>
            <li>Communicating regarding filing statuses, compliance due dates, regulatory changes, and query resolutions.</li>
            <li>Invoicing, accounting, fee processing, and customer relationship management.</li>
            <li>Complying with statutory audit obligations and professional standards set forth by governing bodies.</li>
          </ul>
        </section>

        <section>
          <h2>4. Confidentiality & Third-Party Disclosures</h2>
          <p>
            Simplifyl does not sell, rent, or trade your personal or business data to third-party advertisers. Information is disclosed solely under the following conditions:
          </p>
          <ul>
            <li>
              <strong>Government & Regulatory Portals:</strong> When authorized by you to file documents with the Ministry of Corporate Affairs, Goods & Services Tax department, Controller General of Patents, Designs and Trademarks, or other statutory authorities.
            </li>
            <li>
              <strong>Authorized Professional Partners:</strong> Chartered Accountants, Company Secretaries, Advocates, or verification agencies bound by strict non-disclosure and confidentiality obligations.
            </li>
            <li>
              <strong>Legal Compliance:</strong> Where required by valid subpoena, court order, or governmental law enforcement mandate under applicable Indian law.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security & Storage</h2>
          <p>
            We implement industry-standard physical, electronic, and managerial safeguards—including SSL/TLS 256-bit encryption in transit, strict role-based access controls, and secure database backups—to prevent unauthorized access, alteration, disclosure, or destruction of your confidential information.
          </p>
        </section>

        <section>
          <h2>6. Data Retention Period</h2>
          <p>
            We retain statutory and compliance data for the statutory period mandated by the Companies Act, 2013, the Income Tax Act, 1961, and GST legislation (generally up to 8 financial years), or for as long as necessary to maintain active service engagements and resolve legal disputes.
          </p>
        </section>

        <section>
          <h2>7. Your Data Protection Rights</h2>
          <p>
            Under prevailing Indian data protection framework, clients have the right to request access to their personal data, seek rectification of inaccurate information, withdraw consent for discretionary communications, and request grievance redressal.
          </p>
        </section>

        <section>
          <h2>8. Grievance Officer & Contact Information</h2>
          <p>
            In accordance with the Information Technology Act, 2000 and rules made thereunder, any queries, feedback, or grievances regarding this Privacy Policy can be directed to:
          </p>
          <div className="legal-box space-y-1 text-sm">
            <p><strong>Grievance Officer:</strong> Compliance & Legal Officer</p>
            <p><strong>Organization:</strong> Simplifyl Compliance Solutions</p>
            <p><strong>Email:</strong> <a href="mailto:businessgroupikasle@gmail.com">businessgroupikasle@gmail.com</a></p>
            <p><strong>Helpline:</strong> +91 78451 32962</p>
            <p><strong>Website:</strong> <a href="https://simplifyl.com">https://simplifyl.com</a></p>
          </div>
        </section>
      </LegalLayout>
    </>
  );
}
