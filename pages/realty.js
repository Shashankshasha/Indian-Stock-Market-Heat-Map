import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Top Real Estate Stocks (Nifty Realty Index)
const realtyStocks = [
  { symbol: 'DLF', name: 'DLF Ltd', price: 892.50, change: 2.34 },
  { symbol: 'GODREJPROP', name: 'Godrej Properties', price: 2456.80, change: 1.87 },
  { symbol: 'OBEROIRLTY', name: 'Oberoi Realty', price: 1678.25, change: -0.92 },
  { symbol: 'PRESTIGE', name: 'Prestige Estates', price: 1234.60, change: 3.21 },
  { symbol: 'PHOENIXLTD', name: 'Phoenix Mills', price: 1567.90, change: 0.45 },
  { symbol: 'BRIGADE', name: 'Brigade Enterprises', price: 987.35, change: -1.23 },
  { symbol: 'SOBHA', name: 'Sobha Ltd', price: 1456.70, change: 2.67 },
  { symbol: 'LODHA', name: 'Macrotech Developers', price: 1345.80, change: 1.12 },
  { symbol: 'SUNTECK', name: 'Sunteck Realty', price: 456.90, change: -0.78 },
  { symbol: 'MAHLIFE', name: 'Mahindra Lifespace', price: 567.45, change: 0.89 },
  { symbol: 'IBREALEST', name: 'Indiabulls Real Estate', price: 123.45, change: -2.34 },
  { symbol: 'RAYMOND', name: 'Raymond Ltd', price: 1789.60, change: 1.56 },
];

// Property listing partners (affiliate)
const propertyPartners = [
  {
    name: '99acres',
    tagline: 'India\'s No.1 Property Site',
    logo: '🏠',
    href: 'https://www.99acres.com/?utm_source=YOUR_AFFILIATE_ID',
    color: '#d4483b',
  },
  {
    name: 'MagicBricks',
    tagline: 'Find Your Dream Home',
    logo: '🏘️',
    href: 'https://www.magicbricks.com/?utm_source=YOUR_AFFILIATE_ID',
    color: '#e74c3c',
  },
  {
    name: 'Housing.com',
    tagline: 'Search Smarter',
    logo: '🏗️',
    href: 'https://housing.com/?utm_source=YOUR_AFFILIATE_ID',
    color: '#00b67a',
  },
  {
    name: 'NoBroker',
    tagline: 'Zero Brokerage',
    logo: '🔑',
    href: 'https://www.nobroker.in/?utm_source=YOUR_AFFILIATE_ID',
    color: '#e23744',
  },
];

const getTileColor = (change) => {
  if (change >= 3) return '#1b5e20';
  if (change >= 1) return '#2e7d32';
  if (change >= 0) return '#4caf50';
  if (change >= -1) return '#ef5350';
  if (change >= -3) return '#d32f2f';
  return '#b71c1c';
};

export default function RealtyPage() {
  const [activeCity, setActiveCity] = useState('all');

  const cities = ['all', 'Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'];

  return (
    <>
      <Head>
        <title>Realty Heat Map - Indian Real Estate Stocks & Property | Stock Heat Map</title>
        <meta name="description" content="Track Indian real estate stocks live. Nifty Realty index heat map, DLF, Godrej Properties, Oberoi Realty. Find property deals from 99acres, MagicBricks." />
        <meta name="keywords" content="realty stocks india, nifty realty, dlf share price, real estate stocks, property investment india, 99acres, magicbricks" />
      </Head>

      <div className="page">
        {/* Header */}
        <header className="header">
          <Link href="/" className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Stock Heat Map</span>
          </Link>
          <nav className="nav">
            <Link href="/">Indices</Link>
            <Link href="/realty" className="active">Realty</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="hero">
          <h1>Indian Realty Heat Map</h1>
          <p>Track real estate stocks & find your dream property</p>
        </div>

        {/* Realty Stocks Heat Map */}
        <section className="section">
          <h2>Nifty Realty Stocks</h2>
          <div className="heatmap-grid">
            {realtyStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="tile"
                style={{ backgroundColor: getTileColor(stock.change) }}
              >
                <span className="tile-symbol">{stock.symbol}</span>
                <span className="tile-price">₹{stock.price.toLocaleString()}</span>
                <span className="tile-change">
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Property Search Section */}
        <section className="section property-section">
          <h2>🏠 Find Your Dream Property</h2>
          <p className="section-desc">Search from India's top property portals</p>

          {/* City Filter */}
          <div className="city-filter">
            {cities.map((city) => (
              <button
                key={city}
                className={`city-btn ${activeCity === city ? 'active' : ''}`}
                onClick={() => setActiveCity(city)}
              >
                {city === 'all' ? 'All India' : city}
              </button>
            ))}
          </div>

          {/* Property Partners */}
          <div className="partners-grid">
            {propertyPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="partner-card"
                style={{ '--accent': partner.color }}
              >
                <span className="partner-logo">{partner.logo}</span>
                <div className="partner-info">
                  <span className="partner-name">{partner.name}</span>
                  <span className="partner-tagline">{partner.tagline}</span>
                </div>
                <button className="search-btn">Search Properties →</button>
              </a>
            ))}
          </div>
        </section>

        {/* Lead Generation Form */}
        <section className="section lead-section">
          <div className="lead-box">
            <h3>🎯 Get Personalized Property Recommendations</h3>
            <p>Tell us your requirements, get matched with top properties</p>
            <form className="lead-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! Our property expert will contact you soon.');
            }}>
              <div className="form-row">
                <input type="text" placeholder="Your Name" required />
                <input type="tel" placeholder="Mobile Number" required />
              </div>
              <div className="form-row">
                <select required>
                  <option value="">Select City</option>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                  <option>Bangalore</option>
                  <option>Pune</option>
                  <option>Chennai</option>
                  <option>Hyderabad</option>
                </select>
                <select required>
                  <option value="">Budget</option>
                  <option>Under ₹50 Lakh</option>
                  <option>₹50 Lakh - ₹1 Cr</option>
                  <option>₹1 Cr - ₹2 Cr</option>
                  <option>₹2 Cr - ₹5 Cr</option>
                  <option>Above ₹5 Cr</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Get Free Consultation</button>
            </form>
            <p className="disclaimer">*By submitting, you agree to be contacted by our property partners</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p className="copyright">© 2026 Indian Stock Market Heat Map</p>
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
          justify-content: space-between;
          padding: 16px 24px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .nav {
          display: flex;
          gap: 24px;
        }

        .nav :global(a) {
          color: #666;
          text-decoration: none;
          font-weight: 500;
        }

        .nav :global(a.active) {
          color: #d32f2f;
        }

        .hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 40px 24px;
          text-align: center;
          color: white;
        }

        .hero h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .hero p {
          color: #9ca3af;
        }

        .section {
          padding: 32px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        .section-desc {
          color: #666;
          margin-bottom: 20px;
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
        }

        .tile {
          padding: 16px 12px;
          border-radius: 8px;
          color: white;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .tile:hover {
          transform: scale(1.05);
        }

        .tile-symbol {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .tile-price {
          display: block;
          font-size: 12px;
          opacity: 0.9;
        }

        .tile-change {
          display: block;
          font-size: 16px;
          font-weight: 600;
          margin-top: 4px;
        }

        .property-section {
          background: white;
          border-radius: 12px;
          margin: 20px 24px;
        }

        .city-filter {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .city-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .city-btn:hover {
          border-color: #d32f2f;
        }

        .city-btn.active {
          background: #d32f2f;
          color: white;
          border-color: #d32f2f;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .partner-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
          background: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .partner-card:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .partner-logo {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .partner-info {
          text-align: center;
          margin-bottom: 16px;
        }

        .partner-name {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .partner-tagline {
          font-size: 14px;
          color: #666;
        }

        .search-btn {
          padding: 10px 24px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .lead-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 20px 24px;
          border-radius: 12px;
        }

        .lead-box {
          text-align: center;
          color: white;
        }

        .lead-box h3 {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .lead-box > p {
          opacity: 0.9;
          margin-bottom: 24px;
        }

        .lead-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .form-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .form-row input,
        .form-row select {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #fff;
          color: #764ba2;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background: #f0f0f0;
        }

        .disclaimer {
          font-size: 11px;
          opacity: 0.7;
          margin-top: 12px;
        }

        .footer {
          padding: 24px;
          text-align: center;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 12px;
        }

        .footer-links :global(a) {
          color: #666;
          text-decoration: none;
        }

        .copyright {
          font-size: 12px;
          color: #999;
        }

        @media (max-width: 640px) {
          .form-row {
            flex-direction: column;
          }

          .hero h1 {
            font-size: 24px;
          }

          .partners-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
