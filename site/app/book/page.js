'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import SiteFooter from '../SiteFooter';

const services = {
  'discovery-call': { title: 'FREE DISCOVERY CALL', sub: 'A relaxed, no-obligation 30-minute conversation about your business and what could be improved.' },
  'web-dev': { title: '6-WEEK WEBSITE BUILD', sub: 'Let’s scope your six-session website journey, from kickoff to launch.' },
  'ai-audit': { title: 'AI OPPORTUNITY AUDIT', sub: 'Tell me about the business and I will scope a focused AI opportunity review.' },
  'product-dev': { title: 'APP & PRODUCT DEVELOPMENT', sub: 'Let’s talk through the product, the platform and where you want to land.' },
  'systems-audit': { title: 'DIGITAL SYSTEMS AUDIT', sub: 'Tell me what is slowing the business down and I will scope a full systems audit.' },
};
const fallback = { title: 'BOOK A CALL', sub: 'Tell me a bit about what you need and I will get back to you within 24 hours.' };

export default function Book() {
  const [service, setService] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setService(params.get('service'));
  }, []);

  const info = services[service] || fallback;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError('Booking is temporarily unavailable — please email me directly instead.');
      return;
    }

    const form = e.target;
    const payload = {
      service: service || null,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim() || null,
      preferred_time: form.time.value.trim() || null,
      message: form.message.value.trim() || null,
    };

    setSending(true);
    const { error: insertError } = await supabase.from('bookings').insert(payload);
    setSending(false);

    if (insertError) {
      setError('Something went wrong sending that — please try again, or email me directly.');
      return;
    }
    setSent(true);
  };

  return (
    <main className="book-page">
      <div className="grain" />
      <nav className="floating-nav" aria-label="Primary navigation">
        <div>
          <a href="/">HOME</a>
          <a href="/solutions">SOLUTIONS</a>
          <a href="/#contact">CONTACT</a>
        </div>
      </nav>

      <section className="book-hero">
        <p className="eyebrow">[ {service ? service.toUpperCase().replace(/-/g, ' ') : 'BOOKING'} ]</p>
        <h1>{info.title}</h1>
        <p className="intro">{info.sub}</p>
      </section>

      <section className="book-form-wrap">
        {sent ? (
          <div className="book-confirm">
            <p className="eyebrow">[ REQUEST SENT ]</p>
            <h2>THANKS —<br /><em>I&apos;LL BE IN TOUCH.</em></h2>
            <p>I usually reply within 24 hours. In the meantime feel free to look through the rest of the site.</p>
            <a href="/" className="solution-cta">BACK TO HOME ↑</a>
          </div>
        ) : (
          <form className="book-form" onSubmit={onSubmit}>
            <div className="terminal-top"><i /><i /><i /><span>michael@systems:~/book</span></div>
            <label>NAME<input type="text" name="name" required placeholder="Your full name" /></label>
            <label>EMAIL<input type="email" name="email" required placeholder="you@company.com" /></label>
            <label>COMPANY<input type="text" name="company" placeholder="Company / project (optional)" /></label>
            <label>PREFERRED TIME<input type="text" name="time" placeholder="e.g. weekday afternoons, GMT" /></label>
            <label>WHAT DO YOU NEED?<textarea name="message" rows={5} placeholder="A few lines about what you're looking to do..." /></label>
            <button type="submit" disabled={sending}>{sending ? 'SENDING…' : 'SEND REQUEST ↗'}</button>
            {error && <p className="book-error">{error}</p>}
          </form>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
