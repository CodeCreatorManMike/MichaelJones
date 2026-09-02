import SiteFooter from '../SiteFooter';

export const metadata = {
  title: 'Solutions — Michael Jones',
  description: 'Free discovery calls, website builds, AI opportunity audits and product development for clients.',
};

const offerings = [
  {
    slug: 'discovery-call',
    eyebrow: 'START HERE',
    title: 'FREE DISCOVERY CALL',
    desktop: '/solutions/discovery-call-desktop.webp',
    mobile: '/solutions/discovery-call-mobile.webp',
    copy: 'A relaxed, no-obligation 30-minute conversation about your business, its current systems and what could be improved.',
    cta: 'BOOK YOUR FREE CALL ↗',
  },
  {
    slug: 'web-dev',
    eyebrow: 'WEBSITES',
    title: '6-WEEK WEBSITE JOURNEY',
    desktop: '/solutions/web-dev-desktop.webp',
    mobile: '/solutions/web-dev-mobile.webp',
    copy: 'A structured six-session build — intro, assets, wireframes, build, feedback and offboarding — from kickoff to launch.',
    cta: 'START MY WEBSITE BUILD ↗',
  },
  {
    slug: 'ai-audit',
    eyebrow: 'AI',
    title: 'AI OPPORTUNITY AUDIT',
    desktop: '/solutions/ai-audit-desktop.webp',
    mobile: '/solutions/ai-audit-mobile.webp',
    copy: 'A focused review to find real, practical AI opportunities in your business — grounded in what will actually move the needle.',
    cta: 'AUDIT MY AI OPPORTUNITIES ↗',
  },
  {
    slug: 'product-dev',
    eyebrow: 'PRODUCT',
    title: 'APP & PRODUCT DEVELOPMENT',
    desktop: '/solutions/product-dev-desktop.webp',
    mobile: '/solutions/product-dev-mobile.webp',
    copy: 'End-to-end app and product development — from concept and design through to a working, shipped product.',
    cta: 'SCOPE MY PRODUCT ↗',
  },
  {
    slug: 'systems-audit',
    eyebrow: 'OPERATIONS',
    title: 'DIGITAL SYSTEMS AUDIT',
    desktop: '/solutions/systems-audit-desktop.webp',
    mobile: '/solutions/systems-audit-mobile.webp',
    copy: 'A full audit of your digital systems, workflows and tools to find what is slowing the business down — and what to fix first.',
    cta: 'AUDIT MY SYSTEMS ↗',
  },
];

export default function Solutions() {
  return (
    <main className="solutions-page">
      <div className="grain" />
      <nav className="floating-nav" aria-label="Primary navigation">
        <div>
          <a href="/">HOME</a>
          <a href="/#projects">PROJECTS</a>
          <a href="/#contact">CONTACT</a>
        </div>
      </nav>

      <header className="solutions-hero">
        <p className="eyebrow">[ FOR CLIENTS · SOLUTIONS ]</p>
        <h1>WAYS WE<br /><em>COULD WORK.</em></h1>
        <p className="intro">Five ways to get started — pick the one that fits, or start with a free call and we will work out the rest together.</p>
      </header>

      {offerings.map((o, i) => (
        <section className="solution-block" key={o.slug}>
          <div className="solution-head">
            <span className="solution-no">S/{String(i + 1).padStart(2, '0')}</span>
            <span className="solution-eyebrow">{o.eyebrow}</span>
          </div>
          <picture className="solution-diagram">
            <source media="(max-width: 850px)" srcSet={o.mobile} />
            <img src={o.desktop} alt={o.title} />
          </picture>
          <p className="solution-copy">{o.copy}</p>
          {o.slug === 'discovery-call' ? (
            <button
              type="button"
              className="solution-cta"
              data-cal-namespace="free-discovery-call"
              data-cal-link="michael-jones-zxe6yc/free-discovery-call"
              data-cal-config='{"layout":"month_view"}'
            >{o.cta}</button>
          ) : (
            <a className="solution-cta" href={`/book/?service=${o.slug}`}>{o.cta}</a>
          )}
        </section>
      ))}

      <SiteFooter />
    </main>
  );
}
