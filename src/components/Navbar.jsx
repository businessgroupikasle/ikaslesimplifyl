import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, FileText, Building2, ShieldCheck, FileCheck2 } from 'lucide-react';
import Logo from './Logo';
import { useRouter, Link } from '../lib/router';

export default function Navbar({ onOpenContact }) {
  const { path, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHome = path === '/' || path === '/index.html';

  const handleLinkClick = (e, targetHref) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    if (targetHref.startsWith('#')) {
      if (isHome) {
        e.preventDefault();
        const element = document.getElementById(targetHref.substring(1));
        if (element) {
          const navOffset = 80;
          const pos = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      } else {
        e.preventDefault();
        navigate(`/${targetHref}`);
      }
    }
  };

  const serviceItems = [
    {
      name: 'GST Filing',
      href: '/gst-filing',
      desc: 'Registration, returns (GSTR-1/3B/9), amendments & notice advisory.',
      icon: FileText
    },
    {
      name: 'Business Registrations',
      href: '/business-registration',
      desc: 'Private Limited, LLP, OPC, Partnership, Proprietorship & MSME.',
      icon: Building2
    },
    {
      name: 'Trademark Services',
      href: '/trademark-registration',
      desc: 'Search, trademark application, objection handling & renewals.',
      icon: ShieldCheck
    },
    {
      name: 'Compliance Support',
      href: '/compliance-support',
      desc: 'Annual ROC filings, Director KYC, minutes & secretarial audits.',
      icon: FileCheck2
    }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-[0_2px_12px_rgba(20,43,74,0.06)] border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main navigation">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors duration-150 ${
                isHome ? 'text-[#142B4A]' : 'text-slate-600 hover:text-[#142B4A]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors duration-150 ${
                path === '/about' ? 'text-[#142B4A]' : 'text-slate-600 hover:text-[#142B4A]'
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 py-1 ${
                  path.startsWith('/services') || path === '/gst-filing' || path === '/business-registration' || path === '/trademark-registration' || path === '/compliance-support'
                    ? 'text-[#2563EB]'
                    : 'text-slate-600 hover:text-[#142B4A]'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#2563EB]' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Our Core Practice Areas
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-semibold text-[#2563EB] hover:underline"
                    >
                      All Services →
                    </Link>
                  </div>
                  <div className="mt-1 space-y-1">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F5F7FA] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/faq"
              className={`text-sm font-semibold transition-colors duration-150 ${
                path === '/faq' ? 'text-[#142B4A]' : 'text-slate-600 hover:text-[#142B4A]'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors duration-150 ${
                path === '/contact' ? 'text-[#142B4A]' : 'text-slate-600 hover:text-[#142B4A]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Get Free Consultation CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#142B4A] hover:bg-[#1E3E6B] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow active:scale-95 group"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#142B4A] hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-xl py-5 px-6 z-50">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#142B4A] py-1.5"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 py-1.5"
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="py-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Services
              </p>
              <div className="pl-2 space-y-2 border-l-2 border-slate-100">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-[#2563EB] py-1"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-bold text-[#2563EB] py-1"
                >
                  View All Services →
                </Link>
              </div>
            </div>

            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 py-1.5"
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 py-1.5"
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#142B4A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1E3E6B] transition-colors shadow-sm"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
