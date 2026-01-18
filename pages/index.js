import { useState, useEffect } from 'react';
import Head from 'next/head';
import HeatMap from '../components/HeatMap';
import { indicesData } from '../lib/stockData';

const categories = [
  { id: 'broadMarket', label: 'Broad Market Indices' },
  { id: 'sectoral', label: 'Sectoral Indices' },
  { id: 'thematic', label: 'Thematic Indices' },
  { id: 'strategy', label: 'Strategy Indices' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('broadMarket');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      };
      setCurrentTime(now.toLocaleString('en-IN', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeData = indicesData[activeCategory] || [];

  return (
    <>
      <Head>
        <title>Indian Stock Market Heat Map - Free NSE BSE Indices | Nifty Sensex Live</title>
        <meta name="description" content="Free Indian stock market heat map. Track Nifty 50, Bank Nifty, sectoral indices live. NSE BSE real-time data visualization with hover details." />
        <meta name="keywords" content="nifty heat map, indian stock market, nse indices, bse sensex, bank nifty, sectoral indices, nifty 50 live, stock market india" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://indianstockheatmap.com" />
        <meta property="og:title" content="Indian Stock Market Heat Map - NSE BSE Live" />
        <meta property="og:description" content="Free heat map for Indian indices. Track Nifty, Bank Nifty, sectors live." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">📊</span>
              <span className="logo-text">Stock Heat Map</span>
            </div>
          </div>
          <div className="header-center">
            <span className="streaming-label">Streaming</span>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-text">On</span>
          </div>
          <div className="header-right">
            <span className="timestamp">As on {currentTime}</span>
            <span className="live-dot"></span>
          </div>
        </header>

        {/* Color Legend */}
        <div className="legend-bar">
          <div className="legend-item lg-5">5</div>
          <div className="legend-item lg-3">3</div>
          <div className="legend-item lg-1">1</div>
          <div className="legend-item lg-0">0%</div>
          <div className="legend-item lg-n1">-1</div>
          <div className="legend-item lg-n3">-3</div>
          <div className="legend-item lg-n5">-5</div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <nav className="nav-menu">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Heat Map Area */}
          <main className="content">
            <HeatMap
              data={activeData}
              title={categories.find(c => c.id === activeCategory)?.label}
            />
          </main>
        </div>

        {/* Footer Note */}
        <footer className="footer">
          <div className="note">
            <strong>Note</strong>
            <p>- The heatmap displays up to 50 symbols irrespective of the total number of constituents in the index.</p>
            <p>- Data is for educational purposes only. Not financial advice.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
          flex-wrap: wrap;
          gap: 12px;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .header-center {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .streaming-label {
          color: #666;
          font-size: 14px;
        }

        .toggle {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ccc;
          border-radius: 24px;
          transition: 0.3s;
        }

        .toggle-slider::before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
        }

        .toggle input:checked + .toggle-slider {
          background: #4caf50;
        }

        .toggle input:checked + .toggle-slider::before {
          transform: translateX(20px);
        }

        .toggle-text {
          color: #4caf50;
          font-weight: 600;
          font-size: 14px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .timestamp {
          color: #333;
          font-size: 14px;
        }

        .live-dot {
          width: 12px;
          height: 12px;
          background: #4caf50;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .legend-bar {
          display: flex;
          justify-content: flex-end;
          gap: 4px;
          padding: 8px 24px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .legend-item {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .lg-5 { background: #1b5e20; }
        .lg-3 { background: #2e7d32; }
        .lg-1 { background: #4caf50; }
        .lg-0 { background: #81c784; }
        .lg-n1 { background: #ef5350; }
        .lg-n3 { background: #d32f2f; }
        .lg-n5 { background: #b71c1c; }

        .main-content {
          display: flex;
          min-height: calc(100vh - 180px);
        }

        .sidebar {
          width: 220px;
          background: white;
          border-right: 1px solid #e0e0e0;
          padding: 16px 0;
          flex-shrink: 0;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          padding: 12px 20px;
          text-align: left;
          background: none;
          border: none;
          border-left: 3px solid transparent;
          cursor: pointer;
          font-size: 14px;
          color: #333;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: #f5f5f5;
        }

        .nav-item.active {
          border-left-color: #d32f2f;
          color: #d32f2f;
          font-weight: 600;
          background: #fff5f5;
        }

        .content {
          flex: 1;
          padding: 20px;
          overflow-x: auto;
        }

        .footer {
          padding: 16px 24px;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .note {
          font-size: 12px;
          color: #666;
        }

        .note strong {
          display: block;
          margin-bottom: 4px;
          color: #333;
          border-bottom: 2px solid #1976d2;
          width: fit-content;
          padding-bottom: 2px;
        }

        .note p {
          margin: 2px 0;
        }

        @media (max-width: 768px) {
          .header {
            padding: 12px 16px;
          }

          .header-center {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .legend-bar {
            justify-content: center;
            flex-wrap: wrap;
            padding: 8px 12px;
          }

          .legend-item {
            padding: 4px 8px;
            font-size: 10px;
          }

          .main-content {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #e0e0e0;
            padding: 8px;
          }

          .nav-menu {
            flex-direction: row;
            overflow-x: auto;
            gap: 4px;
          }

          .nav-item {
            flex-shrink: 0;
            padding: 8px 12px;
            border-left: none;
            border-bottom: 2px solid transparent;
            font-size: 12px;
            white-space: nowrap;
          }

          .nav-item.active {
            border-left: none;
            border-bottom-color: #d32f2f;
          }

          .content {
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
}
