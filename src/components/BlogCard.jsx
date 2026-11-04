import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from '../lib/router';
import { BLOG_IMAGES } from '../data/blogImages';
import { formatPostDate, getReadTime } from '../data/blogPosts';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group glass-hover transition-all duration-300 flex flex-col h-full rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(16,54,78,0.05)] hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={BLOG_IMAGES[post.image]}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10364E]/45 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#1C6FA5] shadow-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span>{formatPostDate(post.isoDate)}</span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {getReadTime(post)}
          </span>
        </div>

        <h3 className="mt-2.5 text-lg font-extrabold text-[#10364E] leading-snug group-hover:text-[#1C6FA5] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">{post.summary}</p>

        <span className="mt-5 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs font-bold text-[#1C6FA5] group-hover:gap-2.5 transition-all">
          Read article
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
