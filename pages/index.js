import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import HeatMap from '../components/HeatMap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import BrokerAffiliates from '../components/BrokerAffiliates';
import { indicesData as fallbackData, commodityPrices as defaultCommodities, formatCurrency } from '../lib/stockData';

const categories = [
  { id: 'broadMarket', label: 'Broad Market Indices' },
  { id: 'sectoral', label: 'Sectoral Indices' },
  { id: 'thematic', label: 'Thematic Indices' },
  { id: 'strategy', label: 'Strategy Indices' },
];

const REFRESH_INTERVAL = 30000; // 30 seconds

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('broadMarket');
  const [currentTime, setCurrentTime] = useState('');
  const [indicesData, setIndicesData] = useState(fallbackData);
  const [isStreaming, setIsStreaming] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commodities, setCommodities] = useState(defaultCommodities);

  // Fetch live data from NSE API, fallback to Yahoo
  const fetchLiveData = useCallback(async () => {
    if (!isStreaming) return;

    setIsLoading(true);
    setError(null);

    try {
      // Try NSE first
      const response = await fetch('/api/indices?category=all');
      const result = await response.json();

      if (result.success && result.data) {
        // Only use API data if it returns MORE indices than fallback (outside trading hours API returns less)
        setIndicesData(prev => ({
          broadMarket: (result.data.broadMarket?.length >= prev.broadMarket.length) ? result.data.broadMarket : prev.broadMarket,
          sectoral: (result.data.sectoral?.length >= prev.sectoral.length) ? result.data.sectoral : prev.sectoral,
          thematic: (result.data.thematic?.length >= prev.thematic.length) ? result.data.thematic : prev.thematic,
          strategy: (result.data.strategy?.length >= prev.strategy.length) ? result.data.strategy : prev.strategy,
        }));
        setLastUpdate(new Date());
      } else {
        // Fallback to Yahoo Finance
        await fetchYahooFallback();
      }
    } catch (err) {
      console.error('NSE fetch failed, trying Yahoo:', err);
      await fetchYahooFallback();
    } finally {
      setIsLoading(false);
    }
  }, [isStreaming]);

  // Fetch commodity prices from Yahoo Finance
  const fetchCommodities = useCallback(async () => {
    try {
      const response = await fetch('/api/yahoo-fallback?type=commodities');
      const result = await response.json();

      if (result.success && result.data.commodities) {
        const yahooData = result.data.commodities;
        setCommodities(prev => ({
          gold: yahooData.gold || prev.gold,
          silver: yahooData.silver || prev.silver,
          platinum: yahooData.platinum || prev.platinum,
        }));
      }
    } catch (err) {
      console.error('Failed to fetch commodities:', err);
    }
  }, []);

  // Yahoo Finance fallback for indices
  const fetchYahooFallback = async () => {
    try {
      const response = await fetch('/api/yahoo-fallback?type=indices');
      const result = await response.json();

      if (result.success && result.data) {
        setError('Using Yahoo data (15-min delay)');
        setIndicesData(prev => ({
          broadMarket: result.data.broadMarket?.length > 0 ? result.data.broadMarket : prev.broadMarket,
          sectoral: result.data.sectoral?.length > 0 ? result.data.sectoral : prev.sectoral,
          thematic: prev.thematic,
          strategy: prev.strategy,
        }));
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error('Yahoo fallback failed:', err);
      setError('Using cached data');
    }
  };

  // Initial fetch and auto-refresh
  useEffect(() => {
    fetchLiveData();
    fetchCommodities();

    if (isStreaming) {
      const indicesInterval = setInterval(fetchLiveData, REFRESH_INTERVAL);
      const commoditiesInterval = setInterval(fetchCommodities, 60000); // Commodities every 60s
      return () => {
        clearInterval(indicesInterval);
        clearInterval(commoditiesInterval);
      };
    }
  }, [isStreaming, fetchLiveData, fetchCommodities]);

  // Update clock
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
        <title>Indian Stock Market Heat Map - Free NSE BSE Live Indices | Nifty Sensex</title>
        <meta name="description" content="Free real-time Indian stock market heat map. Track Nifty 50, Bank Nifty, sectoral indices live. NSE BSE data visualization with auto-refresh." />
        <meta name="keywords" content="nifty heat map, indian stock market, nse indices, bse sensex, bank nifty, sectoral indices, nifty 50 live, stock market india, live market data" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://indianstockheatmap.com" />
        <meta property="og:title" content="Indian Stock Market Heat Map - NSE BSE Live" />
        <meta property="og:description" content="Free real-time heat map for Indian indices. Track Nifty, Bank Nifty, sectors live." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app">
        {/* Header */}
        <Header
          showStreaming={true}
          isStreaming={isStreaming}
          setIsStreaming={setIsStreaming}
          isLoading={isLoading}
          currentTime={currentTime}
        />

        {/* Commodity Prices Ticker */}
        <div className="commodity-ticker">
          <div className="commodity-item">
            <span className="commodity-icon">🥇</span>
            <span className="commodity-name">GOLD</span>
            <span className="commodity-price">{formatCurrency(commodities.gold.price)}</span>
            <span className={`commodity-change ${commodities.gold.change >= 0 ? 'positive' : 'negative'}`}>
              {commodities.gold.change >= 0 ? '+' : ''}{commodities.gold.change.toFixed(2)}%
            </span>
            <span className="commodity-unit">/{commodities.gold.unit}</span>
          </div>
          <div className="commodity-item">
            <span className="commodity-icon">🥈</span>
            <span className="commodity-name">SILVER</span>
            <span className="commodity-price">{formatCurrency(commodities.silver.price)}</span>
            <span className={`commodity-change ${commodities.silver.change >= 0 ? 'positive' : 'negative'}`}>
              {commodities.silver.change >= 0 ? '+' : ''}{commodities.silver.change.toFixed(2)}%
            </span>
            <span className="commodity-unit">/{commodities.silver.unit}</span>
          </div>
          <div className="commodity-item">
            <span className="commodity-icon">💎</span>
            <span className="commodity-name">PLATINUM</span>
            <span className="commodity-price">{formatCurrency(commodities.platinum.price)}</span>
            <span className={`commodity-change ${commodities.platinum.change >= 0 ? 'positive' : 'negative'}`}>
              {commodities.platinum.change >= 0 ? '+' : ''}{commodities.platinum.change.toFixed(2)}%
            </span>
            <span className="commodity-unit">/{commodities.platinum.unit}</span>
          </div>
        </div>

        {/* Color Legend */}
        <div className="legend-bar">
          {error && <span className="error-badge">{error}</span>}
          <div className="legend-item lg-5">5</div>
          <div className="legend-item lg-3">3</div>
          <div className="legend-item lg-1">1</div>
          <div className="legend-item lg-0">0%</div>
          <div className="legend-item lg-n1">-1</div>
          <div className="legend-item lg-n3">-3</div>
          <div className="legend-item lg-n5">-5</div>
        </div>

        {/* Top Ad Banner */}
        <div className="ad-container">
          <AdBanner slot="1234567890" format="horizontal" style={{ minHeight: '90px' }} />
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

        {/* Broker Affiliates Section */}
        <div className="affiliates-section">
          <BrokerAffiliates />
        </div>

        {/* Bottom Ad Banner */}
        <div className="ad-container">
          <AdBanner slot="0987654321" format="horizontal" style={{ minHeight: '90px' }} />
        </div>

        {/* Note Section */}
        <div className="note-section">
          <strong>Note</strong>
          <p>- Data refreshes every 30 seconds when streaming is on.</p>
          <p>- The heatmap displays up to 50 symbols per category.</p>
          {lastUpdate && (
            <p className="last-update">Last updated: {lastUpdate.toLocaleTimeString('en-IN')}</p>
          )}
        </div>

        {/* Footer with Broker Links */}
        <Footer />
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
          gap: 24px;
        }

        .main-nav {
          display: flex;
          gap: 16px;
        }

        .main-nav :global(.nav-link) {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          padding: 4px 8px;
        }

        .main-nav :global(.nav-link:hover) {
          color: #333;
        }

        .main-nav :global(.nav-link.active) {
          color: #d32f2f;
          font-weight: 600;
        }

        .commodity-ticker {
          display: flex;
          justify-content: flex-end;
          gap: 24px;
          padding: 8px 24px;
          background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);
          border-bottom: 1px solid #0f3460;
        }

        .commodity-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .commodity-icon {
          font-size: 16px;
        }

        .commodity-name {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
        }

        .commodity-price {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .commodity-change {
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .commodity-change.positive {
          background: rgba(74, 222, 128, 0.2);
          color: #4ade80;
        }

        .commodity-change.negative {
          background: rgba(248, 113, 113, 0.2);
          color: #f87171;
        }

        .commodity-unit {
          font-size: 10px;
          color: #6b7280;
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

        .loading-indicator {
          animation: spin 1s linear infinite;
          font-size: 18px;
          margin-left: 8px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
          background: #ccc;
          border-radius: 50%;
        }

        .live-dot.active {
          background: #4caf50;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .legend-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 4px;
          padding: 8px 24px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .error-badge {
          background: #fff3cd;
          color: #856404;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          margin-right: auto;
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

        .ad-container {
          padding: 12px 24px;
          background: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
        }

        .affiliates-section {
          padding: 0 24px;
          background: #fafafa;
        }

        .footer {
          padding: 24px;
          background: white;
          border-top: 1px solid #e0e0e0;
        }

        .note {
          font-size: 12px;
          color: #666;
          margin-bottom: 16px;
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

        .last-update {
          color: #4caf50;
          font-weight: 500;
        }

        .footer-links {
          display: flex;
          gap: 24px;
          margin-bottom: 12px;
        }

        .footer-links :global(a) {
          color: #1976d2;
          text-decoration: none;
          font-size: 14px;
        }

        .footer-links :global(a:hover) {
          text-decoration: underline;
        }

        .copyright {
          font-size: 12px;
          color: #999;
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

          .commodity-ticker {
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            padding: 8px 12px;
          }

          .commodity-item {
            gap: 4px;
          }

          .commodity-name {
            font-size: 10px;
          }

          .commodity-price {
            font-size: 11px;
          }

          .commodity-change {
            font-size: 10px;
            padding: 1px 4px;
          }

          .commodity-unit {
            display: none;
          }

          .legend-bar {
            justify-content: center;
            flex-wrap: wrap;
            padding: 8px 12px;
          }

          .error-badge {
            width: 100%;
            text-align: center;
            margin-bottom: 8px;
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
