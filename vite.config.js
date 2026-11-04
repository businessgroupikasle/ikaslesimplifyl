import { fileURLToPath, pathToFileURL, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

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

        // Ignore static assets, API routes, internal vite routes, HMR, etc.
        if (
          pathname.startsWith('/@') ||
          pathname.startsWith('/src') ||
          pathname.startsWith('/node_modules') ||
          pathname.startsWith('/api') ||
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
          pathname.startsWith('/api') ||
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

function apiMiddleware() {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.originalUrl || req.url || '';
        const [pathname] = rawUrl.split('?');

        if (pathname.startsWith('/api/')) {
          const endpoint = pathname.replace(/^\/api\//, '').replace(/\/$/, '');
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }

            res.status = (code) => {
              res.statusCode = code;
              return res;
            };

            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            try {
              const apiFilePath = path.resolve(process.cwd(), 'api', `${endpoint}.js`);
              if (!fs.existsSync(apiFilePath)) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: `API route ${endpoint} not found` }));
                return;
              }
              const { default: handler } = await import(pathToFileURL(apiFilePath).href);
              await handler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        return next();
      });
    }
  };
}

// Server-only variables used by api/enquiries.js (SMTP login + recipient).
const SERVER_ENV_KEYS = /^(SMTP_|GMAIL_APP_PASSWORD$|CONTACT_RECIPIENT_EMAIL$)/;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vite only exposes VITE_* variables to client code and does not put .env files
  // into process.env, so the dev API middleware would never see SMTP_PASS.
  // Copy just the mail-related keys from .env / .env.local for local development.
  // Vite restarts the dev server inside the same process whenever .env.local changes,
  // so remember which keys came from files and let a later load replace them.
  // Real environment variables (shell / hosting dashboard) are never overridden.
  const fromFiles = (globalThis.__simplifylEnvKeys ??= new Set());
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (SERVER_ENV_KEYS.test(key) && (process.env[key] === undefined || fromFiles.has(key))) {
      process.env[key] = value;
      fromFiles.add(key);
    }
  }

  return {
    plugins: [react(), apiMiddleware(), seoMiddleware()],
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
  };
})
