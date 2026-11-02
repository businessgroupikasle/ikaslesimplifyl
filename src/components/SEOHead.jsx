import { useEffect } from 'react';

/**
 * SEOHead: Dynamically updates document head tags for individual routes.
 * Ensures unique title, meta description, canonical link, robots directives,
 * Open Graph, Twitter cards, and structured JSON-LD schemas.
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  noIndex = false,
  ogType = 'website',
  schema = null,
}) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if (description) {
      metaDesc.content = description;
    }

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonicalUrl) {
      canonical.href = canonicalUrl;
    }

    // 4. Robots Directives
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    // 5. Open Graph
    const setMetaProperty = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (title) setMetaProperty('og:title', title);
    if (description) setMetaProperty('og:description', description);
    if (canonicalUrl) setMetaProperty('og:url', canonicalUrl);
    setMetaProperty('og:type', ogType);

    // 6. Twitter Card
    const setMetaName = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (title) setMetaName('twitter:title', title);
    if (description) setMetaName('twitter:description', description);

    // 7. Route Schema
    const scriptId = 'route-specific-schema';
    let scriptTag = document.getElementById(scriptId);
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description, canonicalUrl, noIndex, ogType, schema]);

  return null;
}
