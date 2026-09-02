const BASE_URL = 'https://michaeljones.michaeljones-personal-website.workers.dev';

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/book', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
