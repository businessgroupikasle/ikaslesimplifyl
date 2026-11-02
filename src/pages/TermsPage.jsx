import React from 'react';
import LegalLayout from '../components/LegalLayout';
import SEOHead from '../components/SEOHead';

export default function TermsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://simplifyl.com/terms-and-conditions#webpage',
    'url': 'https://simplifyl.com/terms-and-conditions',
    'name': 'Terms and Conditions | Simplifyl Compliance Solutions',
    'description': 'Review the Terms and Conditions for Simplifyl Compliance Solutions. Understand our service engagement terms, client responsibilities, and statutory filing guidelines.',
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
          'name': 'Terms and Conditions',
          'item': 'https://simplifyl.com/terms-and-conditions'
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Terms and Conditions | Simplifyl Compliance Solutions"
        description="Review the Terms and Conditions for Simplifyl Compliance Solutions. Understand our service engagement terms, client responsibilities, and statutory filing guidelines."
        canonicalUrl="https://simplifyl.com/terms-and-conditions"
        noIndex={false}
        schema={schema}
      />

      <LegalLayout
        title="Terms and Conditions"
        subtitle="General terms and statutory service engagement guidelines governing use of Simplifyl platform and professional services."
        lastUpdated="April 15, 2025"
        currentPath="/terms-and-conditions"
      >
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to Simplifyl Compliance Solutions (<strong>https://simplifyl.com</strong>). By accessing our website, initiating a consultation, or engaging our professional compliance, registration, or tax filing services, you ("Client", "User", or "You") agree to be legally bound by these Terms and Conditions ("Terms").
          </p>
          <p>
            If you do not agree with any portion of these Terms, you must discontinue the use of our services immediately. We reserve the right to amend these Terms at any time with updated revisions published on this page.
          </p>
        </section>

        <section>
          <h2>2. Scope of Compliance Services</h2>
          <p>
            Simplifyl provides corporate facilitation, secretarial coordination, and statutory filing assistance across India, including:
          </p>
          <ul>
            <li><strong>GST Services:</strong> GST registration, monthly/quarterly returns (GSTR-1, 3B, 9), ITC reconciliations, and response to departmental intimations.</li>
            <li><strong>Entity Registrations:</strong> Private Limited, One Person Company (OPC), Limited Liability Partnership (LLP), Sole Proprietorship, and Partnership deeds.</li>
            <li><strong>Intellectual Property:</strong> Trademark search, TM-A application drafting and filing, notice of opposition assistance, and TM status watch.</li>
            <li><strong>ROC & Corporate Secretarial:</strong> Annual MCA filings (AOC-4, MGT-7), Director KYC (DIR-3 KYC), statutory register maintenance, and change of directors/registered office.</li>
            <li><strong>Allied Statutory Services:</strong> Digital Signature Certificates (DSC Class-3), MSME/Udyam registrations, and Import Export Code (IEC).</li>
          </ul>
        </section>

        <section>
          <h2>3. Client Responsibilities & Accuracy of Documents</h2>
          <p>
            Clients are strictly responsible for:
          </p>
          <ul>
            <li>Providing genuine, accurate, unaltered, and complete documentation, KYC proofs, and financial records in a timely manner.</li>
            <li>Ensuring that all details submitted for incorporation, name approvals, trademark registration, or GST filings do not infringe third-party rights or violate statutory norms.</li>
            <li>Maintaining the security of digital signature dongles (DSC tokens), OTP verifications, and government portal credentials.</li>
          </ul>
          <p className="text-sm italic">
            Simplifyl acts on the basis of information and authorizations supplied by the client and shall not be liable for penalties arising from falsified, incomplete, or delayed documentation.
          </p>
        </section>

        <section>
          <h2>4. Government Fees & Professional Charges</h2>
          <p>
            Service fees are divided into two distinct components: (a) Simplifyl professional consultancy and facilitation fees, and (b) Statutory Government fees, stamp duties, challans, or registry charges payable to the Ministry of Corporate Affairs (MCA), GSTN, Trademark Registry, or respective state governments.
          </p>
          <p>
            Government statutory fees and stamp duties are subject to actual calculation at the time of submission and are strictly non-refundable once paid to regulatory portals.
          </p>
        </section>

        <section>
          <h2>5. Timelines & Government Approvals</h2>
          <p>
            While Simplifyl makes best endeavors to draft and upload compliance filings promptly, exact approval timelines (such as certificate of incorporation, DIN allocation, GSTIN issuance, or trademark registration) depend strictly on government processing queues, MCA/GST registrar scrutiny, and jurisdictional officer discretion. Simplifyl cannot guarantee turnaround times controlled exclusively by government machinery.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by Indian law, Simplifyl Compliance Solutions, its directors, employees, and contracted professionals shall not be liable for any indirect, incidental, consequential, special, or punitive damages—including lost profits, statutory penalties caused by client delays, or rejection of trademark applications by government examiners.
          </p>
          <p>
            In all circumstances, our maximum aggregate liability shall be limited strictly to the professional fee received by Simplifyl for the specific assignment giving rise to the claim.
          </p>
        </section>

        <section>
          <h2>7. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Republic of India. The courts of Bengaluru, Karnataka, India shall have exclusive jurisdiction over any disputes.
          </p>
        </section>

        <section>
          <h2>8. Contact & Queries</h2>
          <p>
            For any clarifications regarding these Terms and Conditions, please write to us at <a href="mailto:business@ikasle.in">business@ikasle.in</a> or call +91 78451 32962.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
