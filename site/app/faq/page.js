import SiteFooter from '../SiteFooter';

export const metadata = {
  title: 'FAQ — Michael Jones',
  description: 'Frequently asked questions about working with Michael Jones — services, process, pricing and tech stack.',
};

const faqs = [
  { q: 'What kind of work do you take on?', a: 'Website builds, AI opportunity audits, product/app development and digital systems audits — see the Solutions page for the full breakdown of each. If it doesn’t fit neatly into one of those, start with a free discovery call and we’ll work out the right shape together.' },
  { q: 'How does booking work?', a: 'Pick an offering on the Solutions page and either book a free discovery call directly through the calendar, or fill in the short request form with a few details about what you need. I usually reply within 24 hours.' },
  { q: 'How much does it cost?', a: 'It depends entirely on scope — a 6-week website build is priced differently to a product build or a systems audit. Pricing is discussed after the discovery call once I understand what you actually need, rather than a fixed number upfront.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely, with calls and async updates throughout. Based in Oxford, UK, working with clients wherever they are.' },
  { q: 'What technologies do you work with?', a: 'Full-stack development (Python, FastAPI, PostgreSQL, React/Next.js), AI integration (Claude, GPT, Groq, Ollama, RAG systems), mobile (SwiftUI), and infrastructure (Docker, GitLab CI/CD, Cloudflare). See the Technical Stack section on the homepage for the complete list.' },
  { q: 'How long does a typical project take?', a: 'A website build usually runs six weeks from kickoff to launch. Audits and smaller scoped projects can be quicker. Timelines are agreed upfront once scope is clear.' },
  { q: 'How is my data handled if I submit the booking form?', a: 'Only what you enter is stored, used only to respond to your enquiry, and never shared or sold. See the full Privacy Policy for details.' },
];

export default function FAQ() {
  return (
    <main className="legal-page">
      <div className="grain" />
      <nav className="floating-nav" aria-label="Primary navigation">
        <div>
          <a href="/">HOME</a>
          <a href="/solutions">SOLUTIONS</a>
          <a href="/#contact">CONTACT</a>
        </div>
      </nav>

      <header className="legal-hero">
        <p className="eyebrow">[ FAQ ]</p>
        <h1>QUESTIONS,<br />ANSWERED.</h1>
        <p className="intro">The most common things people ask before booking a call.</p>
      </header>

      <section className="legal-body">
        {faqs.map((f) => (
          <div className="faq-item" key={f.q}>
            <h2>{f.q}</h2>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
