import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Search, Sparkles, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ContactModal from '../components/ContactModal';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';
import { Link } from '../lib/router';
import { BLOG_IMAGES } from '../data/blogImages';
import { BLOG_CATEGORIES, SORTED_POSTS, formatPostDate, getReadTime } from '../data/blogPosts';

export default function BlogPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtering = query.trim() !== '' || category !== 'All';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SORTED_POSTS.filter((p) => {
      const inCategory = category === 'All' || p.category === category;
      const inQuery =
        !q || `${p.title} ${p.summary} ${p.category}`.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  // The newest post is featured when nothing is being filtered
  const featured = filtering ? null : SORTED_POSTS[0];
  const gridPosts = featured ? filtered.filter((p) => p.id !== featured.id) : filtered;

  const counts = useMemo(() => {
    const map = { All: SORTED_POSTS.length };
    BLOG_CATEGORIES.forEach((c) => {
      map[c] = SORTED_POSTS.filter((p) => p.category === c).length;
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#091822] text-[#263445] dark:text-slate-200 flex flex-col font-sans">
      <SEOHead
        title="Blog | GST, Company Registration, Trademark & ROC Compliance Guides | Simplifyl"
        description="Practical guides from Simplifyl on GST filing, business registration, trademark protection and annual ROC compliance for Indian startups and growing businesses."
        canonicalUrl="https://simplifyl.com/blog"
        noIndex={false}
      />

      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-grow">
        {/* ───────────── Hero ───────────── */}
        <section className="relative bg-[#0C2332] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)] pointer-events-none" />
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] bg-[#1C6FA5] rounded-full blur-[150px] opacity-30 pointer-events-none" />
          <div className="absolute -bottom-40 right-0 w-[480px] h-[480px] bg-[#4FA2D8] rounded-full blur-[160px] opacity-15 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pb-20">
            <Breadcrumb items={[{ label: 'Blog' }]} />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 lg:mt-14 max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#4FA2D8]" />
                Insights &amp; Guides
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Practical guides for businesses that stay{' '}
                <span className="inline-block whitespace-nowrap font-script text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent pb-3 pr-2">
                  compliant
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Clear, plain-language articles on GST, company registration, trademarks and annual ROC compliance, written by our advisory team.
              </p>

              <div className="mt-8 relative max-w-xl">
                <label htmlFor="blog-search" className="sr-only">Search articles</label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, e.g. GSTR-3B, trademark, AOC-4"
                  className="w-full rounded-full bg-white/10 border border-white/20 backdrop-blur-md pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-[#4FA2D8] focus:bg-white/15 transition-colors"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────── Articles ───────────── */}
        <section className="relative py-14 lg:py-20 bg-gradient-to-b from-white via-[#F4F8FB] to-white dark:from-[#091822] dark:via-[#0c1c28] dark:to-[#091822] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C1DEF0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:26px_26px] opacity-40 dark:opacity-20 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2.5 mb-10 lg:mb-12">
              {['All', ...BLOG_CATEGORIES].map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'bg-[#10364E] text-white shadow-md shadow-[#10364E]/20 dark:bg-sky-600 dark:shadow-sky-950/40'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#4FA2D8] hover:text-[#1C6FA5] dark:hover:text-white'
                    }`}
                  >
                    <span>{c}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-white/20 text-white' : 'bg-[#F4F8FB] dark:bg-slate-800 text-[#1C6FA5] dark:text-sky-400'
                      }`}
                    >
                      {counts[c]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Featured post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10 lg:mb-14"
              >
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-12 rounded-[28px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_24px_60px_-28px_rgba(16,54,78,0.35)] dark:shadow-none hover:shadow-[0_30px_70px_-28px_rgba(16,54,78,0.45)] transition-shadow"
                >
                  <div className="relative lg:col-span-6 min-h-[240px] lg:min-h-[380px] overflow-hidden">
                    <img
                      src={BLOG_IMAGES[featured.image]}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C2332]/70 via-[#10364E]/20 to-transparent" />
                    <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C6FA5] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  </div>

                  <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <span className="self-start px-3 py-1 rounded-full bg-[#F4F8FB] dark:bg-slate-800 border border-[#E3EFF8] dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5] dark:text-sky-400">
                      {featured.category}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#10364E] dark:text-white tracking-tight leading-tight group-hover:text-[#1C6FA5] dark:group-hover:text-sky-400 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{featured.summary}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{formatPostDate(featured.isoDate)}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {getReadTime(featured)}
                      </span>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1C6FA5] dark:text-sky-400 group-hover:gap-3 transition-all">
                      Read the article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            {gridPosts.length > 0 ? (
              <>
                {featured && (
                  <h2 className="mb-6 text-xl sm:text-2xl font-extrabold text-[#10364E] dark:text-white tracking-tight">
                    More articles
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              !featured && (
                <div className="text-center py-16">
                  <span className="mx-auto w-14 h-14 rounded-full bg-[#E3EFF8] dark:bg-slate-800 text-[#1C6FA5] dark:text-sky-400 flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-[#10364E] dark:text-white">No articles found</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Try a different keyword or choose another category.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setCategory('All');
                    }}
                    className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#10364E] hover:bg-[#175B87] dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Show all articles
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section className="pb-16 lg:pb-24 bg-white dark:bg-[#091822]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0C2332] via-[#10364E] to-[#175B87] dark:from-[#081824] dark:via-[#0c2235] dark:to-[#10364E] dark:border dark:border-slate-800 px-6 sm:px-12 py-14 lg:py-16 text-center text-white shadow-[0_30px_70px_-30px_rgba(16,54,78,0.6)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />
              <div className="absolute -top-24 -right-16 w-[380px] h-[380px] bg-[#4FA2D8] rounded-full blur-[130px] opacity-30 pointer-events-none" />

              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Need advice for{' '}
                  <span className="inline-block font-script text-4xl sm:text-5xl bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent pb-2 pr-2">
                    your business?
                  </span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Articles explain the rules. Our specialists apply them to your situation. Book a free consultation to get clear next steps.
                </p>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="btn-shimmer mt-8 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#10364E] hover:bg-blue-50 text-xs font-bold uppercase tracking-wider shadow-lg transition-colors active:scale-95"
                >
                  <span>Free consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
