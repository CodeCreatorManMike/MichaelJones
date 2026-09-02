import './styles.css';
import './nav-fix.css';
import CalEmbed from './CalEmbed';
import CookieNotice from './CookieNotice';

const BASE_URL = 'https://michael-jones.org';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Michael Jones — Creative Developer',
    template: '%s',
  },
  description: 'Creative developer, designer and AI student building useful digital products.',
  openGraph: {
    title: 'Michael Jones — Creative Developer',
    description: 'Creative developer, designer and AI student building useful digital products.',
    url: BASE_URL,
    siteName: 'Michael Jones',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Michael Jones — Creative Developer',
    description: 'Creative developer, designer and AI student building useful digital products.',
  },
  // Add your Search Console verification code here once generated, e.g. verification: { google: 'xxxxxxxx' }
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CalEmbed />
        <CookieNotice />
      </body>
    </html>
  );
}
