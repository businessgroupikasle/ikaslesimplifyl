import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Building2, ShieldCheck, FileCheck2, CheckCircle2 } from 'lucide-react';
import { Link } from '../lib/router';
import gstImg from '../assets/article_gst.jpg';
import bizImg from '../assets/article_business.jpg';
import tmImg from '../assets/article_trademark.jpg';
import compImg from '../assets/compliance_team.jpg';

export default function Services({ onOpenContact }) {
  const mainServices = [
    {
      id: 'gst-filing',
      step: 'SERVICE 01',
      title: 'GST FILING',
      desc: 'Simplify your GST responsibilities with assistance for registration, return filing and related GST services.',
      icon: FileText,
      image: gstImg,
      href: '/gst-filing',
      cta: 'Explore GST Services',
      items: [
        'GST Registration',
        'GSTR-1 Filing',
        'GSTR-3B Filing',
        'GST Annual Return',
        'GST Amendment',
        'GST Cancellation',
        'GST Notice Assistance'
      ]
    },
    {
      id: 'business-registrations',
      step: 'SERVICE 02',
      title: 'BUSINESS REGISTRATIONS',
      desc: 'Get assistance in choosing and completing suitable business registration processes.',
      icon: Building2,
      image: bizImg,
      href: '/business-registration',
      cta: 'Explore Registrations',
      items: [
        'Private Limited Company Registration',
        'LLP Registration',
        'OPC Registration',
        'Partnership Firm Registration',
        'Proprietorship Setup',
        'MSME / Udyam Registration',
        'Startup India Registration'
      ]
    },
    {
      id: 'trademark-services',
      step: 'SERVICE 03',
      title: 'TRADEMARK SERVICES',
      desc: 'Protect your brand identity with trademark search, application and related assistance.',
      icon: ShieldCheck,
      image: tmImg,
      href: '/trademark-registration',
      cta: 'Explore Trademark Services',
      items: [
        'Trademark Search',
        'Trademark Application',
        'Trademark Registration',
        'Trademark Objection Assistance',
        'Trademark Renewal',
        'Brand Protection Guidance'
      ]
    },
    {
      id: 'compliance-support',
      step: 'SERVICE 04',
      title: 'COMPLIANCE SUPPORT',
      desc: 'Get assistance in managing applicable business and statutory compliance requirements.',
      icon: FileCheck2,
      image: compImg,
      href: '/compliance-support',
      cta: 'Explore Compliance',
      items: [
        'ROC Annual Filing',
        'Director KYC',
        'Company Annual Compliance',
        'LLP Compliance',
        'Business Documentation',
        'Compliance Assistance'
      ]
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#F5F7FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              OUR PRACTICE AREAS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Our Professional Services
          </h2>

          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Explore business support services designed to simplify registrations, taxation and compliance.
          </p>
        </div>

        {/* 4 Main Service Cards with Visual Image Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(20,43,74,0.05)] hover:border-[#2563EB]/50 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.2)] transition-all duration-300 group overflow-hidden card-glow"
              >
                {/* Top Glowing Gradient Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#142B4A] via-[#2563EB] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div>
                  {/* Service Card Image Header with stylish badge & icon */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      width="600"
                      height="375"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A]/85 via-[#142B4A]/35 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                    
                    {/* Badge & Icon over image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-white bg-[#142B4A]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                        {service.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-[#2563EB] flex items-center justify-center shadow-md group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Service Name Overlay at bottom of image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs font-extrabold text-white tracking-wide uppercase drop-shadow-sm group-hover:text-blue-100 transition-colors">
                        {service.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
                      {service.desc}
                    </p>

                    {/* Checklist of Included Services */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Included Services:
                        </span>
                        <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                          {service.items.length} Scopes
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {service.items.slice(0, 5).map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-700 hover:text-[#142B4A] hover:translate-x-1 transition-all duration-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                            <span className="truncate font-medium">{item}</span>
                          </li>
                        ))}
                        {service.items.length > 5 && (
                          <li className="text-[11px] font-bold text-[#2563EB] pt-1 pl-5 group-hover:underline">
                            + {service.items.length - 5} more scopes included
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      to={service.href}
                      className="btn-shimmer inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-[#F5F7FA] hover:bg-[#142B4A] text-xs font-bold text-[#142B4A] hover:text-white transition-all duration-300 group/btn shadow-xs hover:shadow-md"
                    >
                      <span>{service.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Statutory Notice:</strong> Simplifyl is an independent business consultancy providing advisory and documentation assistance. We do not represent any government authority, Ministry, or Registrar, and we do not claim guaranteed official approval as approvals are subject to government discretion and statutory conformity.
          </p>
        </div>

      </div>
    </section>
  );
}
