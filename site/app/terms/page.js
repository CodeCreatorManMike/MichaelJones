import SiteFooter from '../SiteFooter';

export const metadata = {
  title: 'Terms of Use — Michael Jones',
  description: 'Terms of use for michael-jones.org, covering acceptable use, intellectual property and liability.',
};

export default function Terms() {
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
        <p className="eyebrow">[ LEGAL ]</p>
        <h1>TERMS OF USE</h1>
        <p className="intro">Last updated 2 September 2026. Please read these terms before using this site.</p>
      </header>

      <section className="legal-body">
        <h2>Acceptance of terms</h2>
        <p>By browsing or using this site, you agree to these terms. If you do not agree, please do not use the site.</p>

        <h2>Purpose of this site</h2>
        <p>This site is a personal portfolio and CV for Michael Jones, and a way for prospective clients to learn about, and book, freelance development, AI and consulting work through the <a href="/solutions">Solutions</a> and <a href="/book">Book</a> pages.</p>

        <h2>No professional advice</h2>
        <p>Content on this site is provided for general information only and does not constitute professional, legal or financial advice. Discovery calls and scoping conversations do not create a contractual relationship until agreed separately, in writing, between the parties.</p>

        <h2>Acceptable use</h2>
        <p>You agree not to misuse this site &mdash; including attempting to disrupt its operation, submit false or malicious information through the booking form, or use the site&rsquo;s content for unlawful purposes.</p>

        <h2>Intellectual property</h2>
        <p>The design, code, written content, imagery and branding on this site belong to Michael Jones unless otherwise credited, and may not be copied or reused without permission. Project names, logos and screenshots referenced on this site belong to their respective owners and are shown here for portfolio purposes.</p>

        <h2>Third-party links and services</h2>
        <p>This site links to and embeds third-party services, including Cal.com for scheduling and Supabase for data storage. Those services operate under their own terms and privacy policies, which are outside the control of this site.</p>

        <h2>No warranty</h2>
        <p>This site is provided &ldquo;as is&rdquo;, without warranty of any kind. While reasonable care is taken to keep the site accurate and available, no guarantee is made that it will be error-free or uninterrupted.</p>

        <h2>Limitation of liability</h2>
        <p>To the fullest extent permitted by law, Michael Jones is not liable for any loss or damage arising from your use of this site.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of England and Wales.</p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent to <a href="mailto:michael@michael-jones.org">michael@michael-jones.org</a>.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
