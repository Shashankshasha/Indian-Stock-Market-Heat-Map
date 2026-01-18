import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Indian Stock Market Heat Map</title>
        <meta name="description" content="Terms of Service for Indian Stock Market Heat Map" />
      </Head>

      <div className="page">
        <Header />

        <main className="content">
          <h1>Terms of Service</h1>
          <p className="updated">Last updated: January 2026</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Indian Stock Market Heat Map ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>Indian Stock Market Heat Map provides real-time and delayed visualization of Indian stock market indices, including NSE and BSE data. The Service is provided for informational and educational purposes only.</p>
          </section>

          <section>
            <h2>3. Disclaimer - Not Financial Advice</h2>
            <div className="warning">
              <strong>IMPORTANT:</strong> The information provided on this website does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the website's content as such.
            </div>
            <p>We do not recommend that any securities should be bought, sold, or held by you. Do conduct your own due diligence and consult your financial advisor before making any investment decisions.</p>
          </section>

          <section>
            <h2>4. Data Accuracy</h2>
            <p>While we strive to provide accurate and timely data, we make no warranties or representations regarding the accuracy, reliability, or completeness of any information displayed on the Service. Market data may be delayed by 15 minutes or more.</p>
            <p>We shall not be liable for any losses or damages arising from the use of or reliance on information provided by the Service.</p>
          </section>

          <section>
            <h2>5. Affiliate Disclosure</h2>
            <p>Some links on our website are affiliate links. This means we may earn a commission if you click on the link and sign up for a service. This comes at no additional cost to you. We only recommend services we believe will be valuable to our users.</p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>All content on this Service, including text, graphics, logos, and software, is the property of Indian Stock Market Heat Map or its content suppliers and is protected by intellectual property laws.</p>
          </section>

          <section>
            <h2>7. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Scrape or copy our data without permission</li>
              <li>Interfere with the proper working of the Service</li>
              <li>Use automated tools to access the Service excessively</li>
            </ul>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>In no event shall Indian Stock Market Heat Map, its operators, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.</p>
          </section>

          <section>
            <h2>9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms on this page.</p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>For questions about these Terms, please <Link href="/contact">contact us</Link>.</p>
          </section>
        </main>

        <Footer />
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

        .warning {
          background: #fff3cd;
          border: 1px solid #ffc107;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          color: #856404;
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
