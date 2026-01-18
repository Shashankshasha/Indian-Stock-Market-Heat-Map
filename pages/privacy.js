import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Indian Stock Market Heat Map</title>
        <meta name="description" content="Privacy Policy for Indian Stock Market Heat Map" />
      </Head>

      <div className="page">
        <header className="header">
          <Link href="/" className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Stock Heat Map</span>
          </Link>
        </header>

        <main className="content">
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: January 2026</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you contact us. We also automatically collect certain information when you use our Service, including:</p>
            <ul>
              <li>Log and usage data (IP address, browser type, pages visited)</li>
              <li>Device information (device type, operating system)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Display personalized advertisements</li>
            </ul>
          </section>

          <section>
            <h2>3. Advertising</h2>
            <p>We use third-party advertising companies (including Google AdSense) to serve ads when you visit our website. These companies may use cookies and similar technologies to collect information about your visits to this and other websites to provide relevant advertisements.</p>
            <p>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
          </section>

          <section>
            <h2>4. Third-Party Links</h2>
            <p>Our Service may contain links to third-party websites, including broker platforms. We are not responsible for the privacy practices of these external sites. We may receive compensation when you sign up through our affiliate links.</p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please <Link href="/contact">contact us</Link>.</p>
          </section>
        </main>

        <footer className="footer">
          <Link href="/">Home</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </footer>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: inherit;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .content {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 8px;
        }

        .updated {
          color: #666;
          margin-bottom: 32px;
        }

        section {
          margin-bottom: 32px;
        }

        h2 {
          font-size: 20px;
          color: #333;
          margin-bottom: 12px;
        }

        p {
          color: #555;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        ul {
          color: #555;
          line-height: 1.8;
          padding-left: 24px;
        }

        a {
          color: #1976d2;
        }

        .footer {
          display: flex;
          justify-content: center;
          gap: 24px;
          padding: 24px;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .footer :global(a) {
          color: #666;
          text-decoration: none;
        }

        .footer :global(a:hover) {
          color: #333;
        }
      `}</style>
    </>
  );
}
