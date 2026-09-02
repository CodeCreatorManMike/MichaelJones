import SiteFooter from '../SiteFooter';

export const metadata = {
  title: 'Privacy Policy — Michael Jones',
  description: 'How this site collects, uses and protects your data, including cookies and third-party services.',
};

export default function PrivacyPolicy() {
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
        <h1>PRIVACY POLICY</h1>
        <p className="intro">Last updated 2 September 2026. This site is operated by Michael Jones, based in Oxford, United Kingdom.</p>
      </header>

      <section className="legal-body">
        <h2>Who this covers</h2>
        <p>This policy explains how michael-jones.org (this site) collects, uses and protects personal data, in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>

        <h2>What data is collected</h2>
        <p>The only personal data actively collected is what you choose to submit through the booking form on the <a href="/book">/book</a> page: your name, email address, and optionally your company, preferred time and a message describing what you need. This is submitted only when you fill in and send the form yourself &mdash; nothing is collected automatically from visitors browsing the site.</p>
        <p>If you use the &ldquo;Book my Cal&rdquo; button to schedule a call directly, that booking is handled by Cal.com under its own privacy policy, and any details you provide there (name, email, chosen time) are processed by Cal.com as a separate data controller for that booking.</p>

        <h2>Why it&rsquo;s collected and how it&rsquo;s used</h2>
        <p>Booking form submissions are used solely to respond to your enquiry &mdash; to get in touch, discuss the work you&rsquo;re asking about, and arrange next steps. The legal basis for this processing is your consent, given by submitting the form, and Michael Jones&rsquo;s legitimate interest in responding to business enquiries.</p>

        <h2>Where data is stored</h2>
        <p>Booking submissions are stored in a Supabase-hosted database. Supabase acts as a data processor for this purpose. Access to submitted data is restricted to Michael Jones. Data is kept only for as long as needed to respond to and follow up on the enquiry, and is deleted when no longer needed.</p>

        <h2>Cookies and third-party services</h2>
        <p>This site itself does not set tracking or advertising cookies. The following third-party embeds may set their own cookies when you actively use them:</p>
        <ul>
          <li><strong>Cal.com</strong> &mdash; powers the &ldquo;Book my Cal&rdquo; scheduling widget. Cookies may be set when you open or use the booking calendar.</li>
          <li><strong>Cloudflare</strong> &mdash; this site is hosted on Cloudflare, which may use essential cookies or similar technologies required to serve the site securely.</li>
        </ul>
        <p>If Google Ads or analytics tools (such as Google Analytics) are added to this site in future, this policy will be updated accordingly and the existing cookie consent mechanism will govern any non-essential tracking cookies before they are set.</p>

        <h2>Search engine indexing</h2>
        <p>This site is registered with Google Search Console, a free tool Google provides to site owners. Search Console does not run any script in your browser and does not set cookies &mdash; it simply lets the site owner see how Google&rsquo;s search crawler indexes and ranks the site&rsquo;s public pages. It has no access to, and does not collect, any personal data about visitors beyond what is already publicly visible on the site.</p>

        <h2>Your rights under UK GDPR</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Ask what personal data is held about you</li>
          <li>Ask for inaccurate data to be corrected</li>
          <li>Ask for your data to be deleted</li>
          <li>Object to or restrict how your data is used</li>
          <li>Ask for a copy of your data in a portable format</li>
          <li>Complain to the UK Information Commissioner&rsquo;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> if you believe your data has been mishandled</li>
        </ul>
        <p>To exercise any of these rights, contact <a href="mailto:michael@michael-jones.org">michael@michael-jones.org</a>.</p>

        <h2>Children&rsquo;s privacy</h2>
        <p>This site is not directed at children and does not knowingly collect data from anyone under 16.</p>

        <h2>Changes to this policy</h2>
        <p>This policy may be updated from time to time as the site changes. The &ldquo;last updated&rdquo; date at the top of this page will reflect the most recent revision.</p>

        <h2>Contact</h2>
        <p>Questions about this policy or your data can be sent to <a href="mailto:michael@michael-jones.org">michael@michael-jones.org</a>.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
