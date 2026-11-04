import React from 'react';
import { Link } from '../lib/router';
import logoImage from '../assets/simplify logo.png';

export default function Logo({ size = 'default', light = false }) {
  const imageHeight = size === 'large' ? 'h-12' : 'h-10';

  // The logo artwork is blue with a transparent background, so it needs a light
  // backing wherever it sits on a dark surface (the footer, or the header in dark mode).
  const backing = light
    ? 'bg-white rounded-lg px-2.5 py-1.5'
    : 'dark:bg-white dark:rounded-lg dark:px-2.5 dark:py-1.5';

  return (
    <Link
      to="/"
      aria-label="Simplifyl - Home"
      className={`inline-flex items-center select-none transition-transform duration-200 hover:scale-[1.02] ${backing}`}
    >
      <img
        src={logoImage}
        alt="Simplifyl compliance solutions"
        className={`${imageHeight} w-auto object-contain`}
        draggable={false}
      />
    </Link>
  );
}
