import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, MessageSquare, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ContactModal from '../components/ContactModal';
import Breadcrumb from '../components/Breadcrumb';
import BlogCard from '../components/BlogCard';
import { Link } from '../lib/router';
import { BLOG_IMAGES } from '../data/blogImages';
import {
  SORTED_POSTS,
  formatPostDate,
  getPostBySlug,
  getReadTime,
  slugifyHeading,
} from '../data/blogPosts';

const AUTHOR = 'Simplifyl Advisory Team';

function ArticleBody({ blocks }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className="scroll-mt-28 pt-4 text-2xl sm:text-[1.7rem] font-extrabold text-[#10364E] tracking-tight leading-snug"
              >
                {block.text}
              </h2>
            );
          case 'ul':
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-slate-700 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1C6FA5] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="space-y-3.5">
                {block.items.map((item, n) => (
                  <li key={item} className="flex items-start gap-4 text-base text-slate-700 leading-relaxed">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-[#10364E] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {n + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case 'callout':
            return (
              <div
                key={i}
                className="rounded-2xl border border-[#C1DEF0] bg-gradient-to-br from-[#F4F8FB] to-white p-5 sm:p-6 flex items-start gap-4"
              >
                <span className="w-10 h-10 rounded-xl bg-[#1C6FA5] text-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </span>
                <p className="text-base font-semibold text-[#10364E] leading-relaxed">{block.text}</p>
              </div>
            );
          default:
            return (
              <p key={i} className="text-base sm:text-[1.05rem] text-slate-700 leading-[1.85]">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export default function BlogPostPage({ slug }) {
  const post = getPostBySlug(slug);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');

  const headings = useMemo(
    () =>
      post
        ? post.content.filter((b) => b.type === 'h2').map((b) => ({ text: b.text, id: slugifyHeading(b.text) }))
        : [],
    [post]
  );

  const related = useMemo(() => {
    if (!post) return [];
    const others = SORTED_POSTS.filter((p) => p.id !== post.id);
    const sameCategory = others.filter((p) => p.category === post.category);
    const rest = others.filter((p) => p.category !== post.category);
    return [...sameCategory, ...rest].slice(0, 3);
  }, [post]);

  const schema = useMemo(
    () =>
      post
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.summary,
            datePublished: post.isoDate,
            author: { '@type': 'Organization', name: 'Simplifyl' },
            publisher: { '@type': 'Organization', name: 'Simplifyl Compliance Solutions' },
            mainEntityOfPage: `https://simplifyl.com/blog/${post.slug}`,
          }
        : null,
    [post]
  );

  // Highlight the section being read in the "In this article" list
  useEffect(() => {
    if (!post || typeof IntersectionObserver === 'undefined') return undefined;
    setActiveHeading(headings[0]?.id || '');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post, headings]);

  const openContact = () => setIsContactOpen(true);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <SEOHead title="Article not found | Simplifyl" description="This article could not be found." noIndex={true} />
        <Navbar onOpenContact={openContact} />
        <main className="flex-grow flex items-center justify-center px-4 py-24">
          <div className="text-center max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1C6FA5]">404</p>
            <h1 className="mt-3 text-3xl font-extrabold text-[#10364E]">Article not found</h1>
            <p className="mt-3 text-sm text-slate-600">
              The article you are looking for may have moved or no longer exists.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#10364E] hover:bg-[#175B87] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </div>
        </main>
        <Footer onOpenContact={openContact} />
        {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#263445] flex flex-col font-sans">
      <SEOHead
        title={`${post.title} | Simplifyl Blog`}
        description={post.summary}
        canonicalUrl={`https://simplifyl.com/blog/${post.slug}`}
        ogType="article"
        noIndex={false}
        schema={schema}
      />

      <Navbar onOpenContact={openContact} />

      <main className="flex-grow">
        {/* ───────────── Header ───────────── */}
        <section className="relative bg-[#0C2332] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)] pointer-events-none" />
          <div className="absolute -top-32 -left-24 w-[480px] h-[480px] bg-[#1C6FA5] rounded-full blur-[150px] opacity-30 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 lg:pb-36">
            <Breadcrumb items={[{ label: 'Blog', to: '/blog' }, { label: post.title }]} />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-9 lg:mt-12 max-w-4xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                {post.title}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">{post.summary}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <User className="w-4 h-4 text-[#4FA2D8]" />
                  {AUTHOR}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#4FA2D8]" />
                  {formatPostDate(post.isoDate)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#4FA2D8]" />
                  {getReadTime(post)}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────── Cover + body ───────────── */}
        <section className="bg-white pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative -mt-20 lg:-mt-28 rounded-[28px] overflow-hidden border border-white shadow-[0_30px_70px_-28px_rgba(16,54,78,0.55)] aspect-[16/8]"
            >
              <img src={BLOG_IMAGES[post.image]} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10364E]/40 via-transparent to-transparent" />
            </motion.div>

            <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Article */}
              <article className="lg:col-span-8 min-w-0">
                <ArticleBody blocks={post.content} />

                <p className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                  This article is for general information only and is not legal, tax or professional advice. Rules and deadlines change, so please consult a qualified professional about your specific situation.
                </p>

                <Link
                  to="/blog"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#1C6FA5] hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all articles
                </Link>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                {headings.length > 1 && (
                  <nav aria-label="In this article" className="hidden lg:block rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-18px_rgba(16,54,78,0.3)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">In this article</p>
                    <ul className="space-y-1">
                      {headings.map((h) => {
                        const active = activeHeading === h.id;
                        return (
                          <li key={h.id}>
                            <button
                              type="button"
                              onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold border-l-2 transition-colors ${
                                active
                                  ? 'border-[#1C6FA5] bg-[#F4F8FB] text-[#1C6FA5]'
                                  : 'border-transparent text-slate-600 hover:text-[#10364E] hover:bg-slate-50'
                              }`}
                            >
                              {h.text}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                )}

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#10364E] to-[#175B87] p-6 text-white shadow-[0_24px_50px_-24px_rgba(16,54,78,0.6)]">
                  <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#4FA2D8]/30 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <span className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold text-white">Need help with this?</h3>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                      Our specialists can apply this to your business. Book a free consultation.
                    </p>
                    <button
                      type="button"
                      onClick={openContact}
                      className="btn-shimmer mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#10364E] hover:bg-blue-50 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Free consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ───────────── Related ───────────── */}
        {related.length > 0 && (
          <section className="py-14 lg:py-20 bg-[#F4F8FB] border-t border-slate-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#1C6FA5]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1C6FA5]">Keep reading</span>
              </div>
              <h2 className="mt-3 mb-8 text-2xl sm:text-3xl font-extrabold text-[#10364E] tracking-tight">
                Related <span className="text-[#1C6FA5]">articles</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer onOpenContact={openContact} />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
