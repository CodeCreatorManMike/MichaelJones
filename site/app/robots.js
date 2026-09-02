const BASE_URL = 'https://michaeljones.michaeljones-personal-website.workers.dev';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
