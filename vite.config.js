import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function seoMiddleware() {
  const validCanonicalRoutes = new Set([
    '/',
    '/about',
    '/services',
    '/gst-filing',
    '/business-registration',
    '/trademark-registration',
    '/compliance-support',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
    '/cookie-policy'
  ]);

  return {
    name: 'seo-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.originalUrl || req.url || '/';
        const [pathname, search] = rawUrl.split('?');
        const query = search ? `?${search}` : '';

        // Ignore static assets, internal vite routes, HMR, etc.
        if (
          pathname.startsWith('/@') ||
          pathname.startsWith('/src') ||
          pathname.startsWith('/node_modules') ||
          pathname.includes('.')
        ) {
          // Check if explicit request for /index.html
          if (pathname === '/index.html') {
            res.statusCode = 301;
            res.setHeader('Location', `/${query}`);
            res.end();
            return;
          }
          return next();
        }

        // 1. Redirect trailing slash /page/ to /page
        if (pathname.length > 1 && pathname.endsWith('/')) {
          const canonicalPath = pathname.slice(0, -1);
          res.statusCode = 301;
          res.setHeader('Location', `${canonicalPath}${query}`);
          res.end();
          return;
        }

        // 2. For non-existent routes or /404, serve 404 HTTP status
        if (!validCanonicalRoutes.has(pathname)) {
          const indexPath = fileURLToPath(new URL('./index.html', import.meta.url));
          const rawHtml = fs.readFileSync(indexPath, 'utf-8');
          server.transformIndexHtml(rawUrl, rawHtml).then((html) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
          }).catch(next);
          return;
        }

        return next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.originalUrl || req.url || '/';
        const [pathname, search] = rawUrl.split('?');
        const query = search ? `?${search}` : '';

        if (
          pathname.startsWith('/@') ||
          pathname.startsWith('/assets') ||
          pathname.includes('.')
        ) {
          if (pathname === '/index.html') {
            res.statusCode = 301;
            res.setHeader('Location', `/${query}`);
            res.end();
            return;
          }
          return next();
        }

        if (pathname.length > 1 && pathname.endsWith('/')) {
          const canonicalPath = pathname.slice(0, -1);
          res.statusCode = 301;
          res.setHeader('Location', `${canonicalPath}${query}`);
          res.end();
          return;
        }

        if (!validCanonicalRoutes.has(pathname)) {
          res.statusCode = 404;
        }

        return next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoMiddleware()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
})
