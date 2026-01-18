import Head from 'next/head';
import HeatMap from '../components/HeatMap';
import { nifty50Stocks, getSectorStats } from '../lib/stockData';

export default function Home() {
  const sectorStats = getSectorStats(nifty50Stocks);
  const gainers = nifty50Stocks.filter(s => s.change > 0).length;
  const losers = nifty50Stocks.filter(s => s.change < 0).length;
  const avgChange = (nifty50Stocks.reduce((sum, s) => sum + s.change, 0) / nifty50Stocks.length).toFixed(2);

  return (
    <>
      <Head>
        <title>Indian Stock Market Heat Map - Free Nifty 50 & Sector Analysis | NSE BSE</title>
        <meta name="description" content="Free real-time Indian stock market heat map. Track Nifty 50 stocks, sector performance, gainers & losers. NSE BSE live data visualization." />
        <meta name="keywords" content="nifty 50 heat map, indian stock market, nse heat map, bse stocks, sector analysis, stock market india, sensex, nifty today" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://indianstockheatmap.com" />

        {/* Open Graph */}
        <meta property="og:title" content="Indian Stock Market Heat Map - Free Nifty 50 Analysis" />
        <meta property="og:description" content="Track Indian stocks visually. Free heat map for Nifty 50, sectors, gainers & losers." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Indian Stock Market Heat Map" />
        <meta name="twitter:description" content="Free visual stock tracker for NSE & BSE" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Indian Stock Market Heat Map</h1>
          <p className="subtitle">Nifty 50 - Live Sector Performance</p>
        </header>

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Stocks</span>
            <span className="stat-value">{nifty50Stocks.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Gainers</span>
            <span className="stat-value positive">{gainers}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Losers</span>
            <span className="stat-value negative">{losers}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Avg Change</span>
            <span className={`stat-value ${parseFloat(avgChange) >= 0 ? 'positive' : 'negative'}`}>
              {avgChange}%
            </span>
          </div>
        </div>

        <main>
          <HeatMap stocks={nifty50Stocks} />
        </main>

        <section className="info-section">
          <h2>How to Read the Heat Map</h2>
          <div className="color-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#006400' }}></span>
              <span>+3% or more</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#32CD32' }}></span>
              <span>+1% to +3%</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#90EE90' }}></span>
              <span>0% to +1%</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#FFB6C1' }}></span>
              <span>0% to -1%</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#FF4500' }}></span>
              <span>-1% to -3%</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#8B0000' }}></span>
              <span>-3% or worse</span>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>Data for educational purposes. Not financial advice.</p>
          <p>&copy; 2024 Indian Stock Heat Map</p>
        </footer>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
          color: #ffffff;
        }

        .header {
          text-align: center;
          padding: 24px 16px 8px;
        }

        h1 {
          font-size: 24px;
          margin: 0;
          background: linear-gradient(90deg, #4ade80, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          color: #9ca3af;
          font-size: 14px;
          margin: 4px 0 0;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 16px;
          padding: 16px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 20px;
          border-radius: 8px;
          min-width: 80px;
        }

        .stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
        }

        .stat-value.positive {
          color: #4ade80;
        }

        .stat-value.negative {
          color: #f87171;
        }

        main {
          padding: 0 8px;
        }

        .info-section {
          padding: 24px 16px;
          max-width: 800px;
          margin: 0 auto;
        }

        .info-section h2 {
          font-size: 18px;
          margin-bottom: 16px;
          color: #e0e0e0;
        }

        .color-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #9ca3af;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }

        .footer {
          text-align: center;
          padding: 24px 16px;
          color: #6b7280;
          font-size: 12px;
        }

        .footer p {
          margin: 4px 0;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 20px;
          }

          .stats-bar {
            gap: 8px;
          }

          .stat {
            padding: 8px 12px;
            min-width: 70px;
          }

          .stat-value {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
