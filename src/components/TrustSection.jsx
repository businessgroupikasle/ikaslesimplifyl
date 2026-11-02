import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, FileCheck2, ShieldCheck, Headphones } from 'lucide-react';

export default function TrustSection() {
  const highlights = [
    {
      idx: '01',
      title: 'Professional Assistance',
      desc: 'Guidance from experienced tax and corporate compliance professionals.',
      icon: UserCheck
    },
    {
      idx: '02',
      title: 'Transparent Process',
      desc: 'Clear communication with straightforward timelines and fee structures.',
      icon: FileCheck2
    },
    {
      idx: '03',
      title: 'Secure Document Handling',
      desc: 'Confidential and protected handling of all business documents.',
      icon: ShieldCheck
    },
    {
      idx: '04',
      title: 'Dedicated Customer Support',
      desc: 'Prompt assistance for your queries throughout the filing lifecycle.',
      icon: Headphones
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#F5F7FA] to-white border-b border-slate-200/80 py-10 lg:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(20,43,74,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(37,99,235,0.18)] hover:border-blue-400 transition-all duration-300 overflow-hidden card-glow"
              >
                {/* Top subtle highlight line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#142B4A] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-extrabold text-slate-300 group-hover:text-[#2563EB] transition-colors">
                    {item.idx}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5 font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
