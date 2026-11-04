import React from 'react';
import { ArrowLeft, Shield, FileText, AlertCircle, Cookie, Home, ChevronRight, Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import { Link } from '../lib/router';

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy-policy', icon: Shield },
  { name: 'Terms & Conditions', path: '/terms-and-conditions', icon: FileText },
  { name: 'Disclaimer', path: '/disclaimer', icon: AlertCircle },
  { name: 'Cookie Policy', path: '/cookie-policy', icon: Cookie },
];

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated = 'April 15, 2025',
  currentPath,
  children,
}) {
  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans selection:bg-blue-100 selection:text-[#10364E]">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="inline-block" aria-label="Go to Simplifyl Homepage">
              <Logo light={false} />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-blue-400 bg-white text-xs font-semibold text-[#10364E] hover:text-[#1C6FA5] transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#10364E] hover:bg-[#174E72] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner with Semantic Heading & Breadcrumbs */}
      <section className="bg-[#10364E] text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-blue-200/80 mb-4">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-300">Legal</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-white font-medium">{title}</span>
          </nav>

          {/* Page H1 Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-blue-200/90 font-medium">
            <span>Last Updated: <strong className="text-white">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Governing Law: <strong className="text-white">Republic of India</strong></span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full">
        {/* Navigation Tabs for Legal Pages */}
        <nav aria-label="Legal document navigation" className="mb-8 pb-4 border-b border-slate-200 flex flex-wrap gap-2">
          {legalLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-navy-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-300' : 'text-blue-600'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Legal Text Article */}
        <article className="prose prose-slate max-w-none bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-[0_4px_25px_rgba(9,25,35,0.03)] text-slate-700 leading-relaxed space-y-6">
          {children}
        </article>

        {/* Support & Contact Card */}
        <aside className="mt-10 p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-navy-900">
              Questions Regarding This Policy?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Contact the Simplifyl Compliance and Legal Advisory desk directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:support@simplifyl.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-navy-900 hover:bg-[#0F3147] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>support@simplifyl.com</span>
            </a>
            <a
              href="tel:+918049201800"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-navy-900 text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+91 (0) 80 4920 1800</span>
            </a>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-[#091923] text-white border-t border-blue-900/40 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025 Simplifyl Compliance Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
