import React from 'react';
import { Link } from '../lib/router';

export default function Logo({ size = 'default', light = false }) {
  const isLarge = size === 'large';
  const iconSize = isLarge ? 'w-10 h-10' : 'w-8 h-8';
  const titleSize = isLarge ? 'text-2xl' : 'text-xl';
  const subtitleSize = isLarge ? 'text-xs' : 'text-[11px]';

  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group select-none transition-transform duration-200 hover:scale-[1.01]">
      {/* Simplifyl Corporate Emblem (#142B4A Primary + #2563EB Secondary) */}
      <div className={`relative ${iconSize} flex-shrink-0 transition-transform duration-300 group-hover:rotate-6`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Top-Left Quadrant (#142B4A) */}
          <path
            d="M20 20C20 12.268 13.732 6 6 6C6 13.732 12.268 20 20 20Z"
            fill={light ? '#60A5FA' : '#142B4A'}
          />
          {/* Top-Right Quadrant (#2563EB) */}
          <path
            d="M20 20C27.732 20 34 13.732 34 6C26.268 6 20 12.268 20 20Z"
            fill="#2563EB"
          />
          {/* Bottom-Left Quadrant (Light Corporate Blue) */}
          <path
            d="M20 20C12.268 20 6 26.268 6 34C13.732 34 20 27.732 20 20Z"
            fill="#3B82F6"
          />
          {/* Bottom-Right Quadrant (#142B4A) */}
          <path
            d="M20 20C20 27.732 26.268 34 34 34C34 26.268 27.732 20 20 20Z"
            fill={light ? '#93C5FD' : '#142B4A'}
          />
          {/* Center core white point */}
          <circle cx="20" cy="20" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight ${titleSize} ${light ? 'text-white' : 'text-[#142B4A]'}`}>
          Simplifyl
        </span>
        <span className={`font-medium tracking-wide ${subtitleSize} mt-0.5 ${light ? 'text-blue-200' : 'text-slate-500'}`}>
          Business & Compliance Solutions
        </span>
      </div>
    </Link>
  );
}
