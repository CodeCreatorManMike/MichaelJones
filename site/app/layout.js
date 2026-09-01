import './styles.css';
import './nav-fix.css';

export const metadata = {
  title: 'Michael Jones — Creative Developer',
  description: 'Creative developer, designer and AI student building useful digital products.',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
