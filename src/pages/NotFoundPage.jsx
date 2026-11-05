import React, { useEffect } from 'react';
import { Home, ArrowLeft, Search, ShieldCheck, FileText, Building2, HelpCircle } from 'lucide-react';
import Logo from '../components/Logo';
import SEOHead from '../components/SEOHead';
import { Link } from '../lib/router';

export default function NotFoundPage() {
  useEffect(() => {
    // Notify window or server of 404 state if applicable
    if (typeof window !== 'undefined') {
      window.__IS_404__ = true;
    }
  }, []);

  return (
    <>
      <SEOHead
        title="404: Page Not Found | Simplifyl Compliance Solutions"
        description="The page you are looking for does not exist or has been moved. Explore Simplifyl GST filing, company registrations, and trademark services or return to the homepage."
        canonicalUrl="https://simplifyl.com/404"
        noIndex={true}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-[#091822] text-navy-900 dark:text-slate-200 flex flex-col font-sans selection:bg-blue-100 selection:text-navy-900 dark:selection:bg-blue-900 dark:selection:text-white">
        
        {/* Navigation Bar */}
        <header className="bg-white/90 dark:bg-[#091822]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link to="/" aria-label="Simplifyl Homepage">
              <Logo light={false} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-800 text-xs font-semibold text-navy-900 dark:text-slate-200 hover:text-blue-700 dark:hover:text-white transition-all shadow-xs"
            >
              <Home className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        {/* 404 Hero Content */}
        <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Ambient colored orbs */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 -left-20 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl w-full text-center relative z-10">
            {/* 404 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Error 404 • Resource Not Found</span>
            </div>

            {/* Main Single H1 */}
            <h1 className="text-7xl sm:text-8xl font-black text-navy-900 dark:text-white tracking-tight">
              4<span className="text-blue-600 dark:text-sky-400">0</span>4
            </h1>

            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Page Not Found
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              The page or resource you requested does not exist, has been removed, or is temporarily unavailable.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-900 hover:bg-[#0F3147] dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-navy-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
              >
                <Search className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <span>Browse Services</span>
              </Link>
            </div>

            {/* Quick Links Card */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left">
              <h3 className="text-sm font-bold text-[#10364E] dark:text-white uppercase tracking-wider mb-4">
                Popular Practice Areas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to="/gst-filing"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors group flex items-center gap-2.5"
                >
                  <FileText className="w-4 h-4 text-[#1C6FA5] dark:text-sky-400 group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-semibold text-[#10364E] dark:text-slate-200">GST Filing</span>
                </Link>

                <Link
                  to="/business-registration"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors group flex items-center gap-2.5"
                >
                  <Building2 className="w-4 h-4 text-[#1C6FA5] dark:text-sky-400 group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-semibold text-[#10364E] dark:text-slate-200">Company Setup</span>
                </Link>

                <Link
                  to="/trademark-registration"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors group flex items-center gap-2.5"
                >
                  <ShieldCheck className="w-4 h-4 text-[#1C6FA5] dark:text-sky-400 group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-semibold text-[#10364E] dark:text-slate-200">Trademark Care</span>
                </Link>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#10364E] text-white border-t border-slate-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2025 Simplifyl Compliance Solutions. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
