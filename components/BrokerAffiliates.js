// Broker Affiliate Links Component
// Replace href URLs with your actual affiliate links

const brokers = [
  {
    name: 'Zerodha',
    tagline: 'India\'s #1 Broker',
    logo: '🟢',
    features: ['Zero brokerage on delivery', 'Award-winning platform'],
    href: 'https://zerodha.com/open-account?c=YOUR_REFERRAL_CODE', // Replace with your link
    color: '#387ed1',
  },
  {
    name: 'Groww',
    tagline: 'Simple & Free',
    logo: '🟡',
    features: ['Free equity delivery', 'Easy-to-use app'],
    href: 'https://groww.in/signup?ref=YOUR_REFERRAL_CODE', // Replace with your link
    color: '#00d09c',
  },
  {
    name: 'Angel One',
    tagline: 'Zero Brokerage',
    logo: '🔴',
    features: ['Free delivery trades', 'ARQ research engine'],
    href: 'https://www.angelone.in/open-demat-account?ref=YOUR_REFERRAL_CODE', // Replace with your link
    color: '#e03c31',
  },
  {
    name: 'Upstox',
    tagline: 'Trade @ Rs. 20',
    logo: '🟣',
    features: ['Pro charts & tools', 'Fast execution'],
    href: 'https://upstox.com/open-account/?f=YOUR_REFERRAL_CODE', // Replace with your link
    color: '#7b2cbf',
  },
];

export default function BrokerAffiliates() {
  const handleClick = (brokerName) => {
    // Track affiliate click (for analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        event_category: 'engagement',
        event_label: brokerName,
      });
    }
  };

  return (
    <div className="broker-section">
      <h3 className="section-title">
        <span className="icon">💹</span>
        Start Trading Today
      </h3>
      <p className="section-subtitle">Open a free Demat account with India's top brokers</p>

      <div className="broker-grid">
        {brokers.map((broker) => (
          <a
            key={broker.name}
            href={broker.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="broker-card"
            onClick={() => handleClick(broker.name)}
            style={{ '--accent': broker.color }}
          >
            <div className="broker-header">
              <span className="broker-logo">{broker.logo}</span>
              <div>
                <span className="broker-name">{broker.name}</span>
                <span className="broker-tagline">{broker.tagline}</span>
              </div>
            </div>
            <ul className="broker-features">
              {broker.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="cta-button">Open Free Account →</button>
          </a>
        ))}
      </div>

      <p className="disclosure">
        *Affiliate disclosure: We may earn a commission when you open an account through our links.
      </p>

      <style jsx>{`
        .broker-section {
          padding: 24px;
          background: white;
          border-radius: 12px;
          margin: 20px 0;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          color: #333;
          margin-bottom: 4px;
        }

        .icon {
          font-size: 24px;
        }

        .section-subtitle {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .broker-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .broker-card {
          display: flex;
          flex-direction: column;
          padding: 20px;
          background: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .broker-card:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        .broker-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .broker-logo {
          font-size: 32px;
        }

        .broker-name {
          display: block;
          font-size: 16px;
          font-weight: 700;
          color: #333;
        }

        .broker-tagline {
          display: block;
          font-size: 12px;
          color: #666;
        }

        .broker-features {
          flex: 1;
          padding-left: 18px;
          margin-bottom: 16px;
        }

        .broker-features li {
          font-size: 13px;
          color: #555;
          margin-bottom: 4px;
        }

        .cta-button {
          width: 100%;
          padding: 10px 16px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .cta-button:hover {
          opacity: 0.9;
        }

        .disclosure {
          font-size: 11px;
          color: #999;
          text-align: center;
          margin-top: 16px;
        }

        @media (max-width: 640px) {
          .broker-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
