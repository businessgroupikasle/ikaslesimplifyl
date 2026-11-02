import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';

/** Shared page chrome: SEO tags, header, <main> landmark and footer. */
export default function SiteLayout({ seo, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-fg">
      {seo && <SEOHead noIndex={false} {...seo} />}
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
