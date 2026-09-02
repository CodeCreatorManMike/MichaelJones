'use client';
import { useEffect, useState } from 'react';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = window.localStorage.getItem('cookie-consent');
      if (!choice) setVisible(true);
    } catch (e) {
      // localStorage unavailable — skip the banner rather than block the page
    }
  }, []);

  const choose = (value) => {
    try { window.localStorage.setItem('cookie-consent', value); } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-notice" role="dialog" aria-label="Cookie notice">
      <p>
        This site uses a booking form (stored via Supabase) and an embedded Cal.com scheduler, which may set its own cookies when you use it. No advertising or tracking cookies are set by this site itself. See the <a href="/privacy-policy">Privacy Policy</a> for details.
      </p>
      <div className="cookie-notice-actions">
        <button type="button" onClick={() => choose('declined')}>DECLINE</button>
        <button type="button" className="cookie-accept" onClick={() => choose('accepted')}>ACCEPT</button>
      </div>
    </div>
  );
}
