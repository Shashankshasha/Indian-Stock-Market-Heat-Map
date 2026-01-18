import Link from 'next/link';

// Quick broker links for footer
const brokerLinks = [
  { name: 'Zerodha', href: 'https://zerodha.com/open-account?c=YOUR_REFERRAL_CODE', color: '#387ed1' },
  { name: 'Groww', href: 'https://groww.in/signup?ref=YOUR_REFERRAL_CODE', color: '#00d09c' },
  { name: 'Angel One', href: 'https://www.angelone.in/open-demat-account?ref=YOUR_REFERRAL_CODE', color: '#e03c31' },
  { name: 'Upstox', href: 'https://upstox.com/open-account/?f=YOUR_REFERRAL_CODE', color: '#7b2cbf' },
];

export default function Footer({ showBrokerLinks = true }) {
  const handleBrokerClick = (brokerName) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        event_category: 'footer',
        event_label: brokerName,
      });
    }
  };

  return (
    <footer className="footer">
      {showBrokerLinks && (
        <div className="broker-strip">
          <span className="broker-label">Open Free Demat Account:</span>
          <div className="broker-links">
            {brokerLinks.map((broker) => (
              <a
                key={broker.name}
                href={broker.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="broker-link"
                style={{ '--color': broker.color }}
                onClick={() => handleBrokerClick(broker.name)}
              >
                {broker.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="footer-main">
        <div className="footer-nav">
          <div className="nav-group">
            <h4>Pages</h4>
            <Link href="/">Indices Heat Map</Link>
            <Link href="/realty">Realty Heat Map</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="nav-group">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
          <div className="nav-group">
            <h4>Open Demat Account</h4>
            {brokerLinks.map((broker) => (
              <a
                key={broker.name}
                href={broker.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => handleBrokerClick(broker.name)}
              >
                {broker.name} →
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="disclaimer">
            Disclaimer: Data is for educational purposes only. Not financial advice.
            We may earn commission from broker signups.
          </p>
          <p className="copyright">© 2026 Indian Stock Market Heat Map. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .broker-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 12px 24px;
          background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);
          flex-wrap: wrap;
        }

        .broker-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .broker-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .broker-link {
          padding: 6px 16px;
          background: var(--color);
          color: white;
          text-decoration: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .broker-link:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .footer-main {
          padding: 32px 24px 24px;
        }

        .footer-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 32px;
          margin-bottom: 32px;
          max-width: 800px;
        }

        .nav-group h4 {
          font-size: 14px;
          color: #333;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .nav-group :global(a) {
          display: block;
          color: #666;
          text-decoration: none;
          font-size: 13px;
          padding: 4px 0;
          transition: color 0.2s;
        }

        .nav-group :global(a:hover) {
          color: #1976d2;
        }

        .footer-bottom {
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
        }

        .disclaimer {
          font-size: 11px;
          color: #999;
          margin-bottom: 8px;
        }

        .copyright {
          font-size: 12px;
          color: #666;
        }

        @media (max-width: 640px) {
          .broker-strip {
            padding: 12px 16px;
          }

          .broker-label {
            width: 100%;
            text-align: center;
            font-size: 12px;
          }

          .broker-links {
            justify-content: center;
          }

          .broker-link {
            padding: 5px 12px;
            font-size: 11px;
          }

          .footer-nav {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </footer>
  );
}
