import { getStockColor, getTextColor, getSectorStats } from '../lib/stockData';

export default function HeatMap({ stocks }) {
  const sectorData = getSectorStats(stocks);
  const totalMarketCap = sectorData.reduce((sum, s) => sum + s.totalMarketCap, 0);

  return (
    <div className="heatmap-container">
      {sectorData.map((sector) => {
        const sectorWidth = (sector.totalMarketCap / totalMarketCap) * 100;

        return (
          <div
            key={sector.name}
            className="sector-group"
            style={{ flex: `0 0 ${Math.max(sectorWidth, 15)}%` }}
          >
            <div className="sector-header">
              <span className="sector-name">{sector.name}</span>
              <span className={`sector-change ${sector.avgChange >= 0 ? 'positive' : 'negative'}`}>
                {sector.avgChange >= 0 ? '+' : ''}{sector.avgChange.toFixed(2)}%
              </span>
            </div>
            <div className="stocks-grid">
              {sector.stocks
                .sort((a, b) => b.marketCap - a.marketCap)
                .map((stock) => {
                  const bgColor = getStockColor(stock.change);
                  const textColor = getTextColor(stock.change);

                  return (
                    <div
                      key={stock.symbol}
                      className="stock-cell"
                      style={{
                        backgroundColor: bgColor,
                        color: textColor
                      }}
                    >
                      <div className="stock-symbol">{stock.symbol}</div>
                      <div className="stock-change">
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                      </div>
                      <div className="stock-price">₹{stock.price.toLocaleString('en-IN')}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .heatmap-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 8px;
        }

        .sector-group {
          min-width: 150px;
          background: #1a1a2e;
          border-radius: 8px;
          overflow: hidden;
        }

        .sector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #16213e;
          border-bottom: 1px solid #0f3460;
        }

        .sector-name {
          font-weight: 600;
          font-size: 12px;
          color: #e0e0e0;
          text-transform: uppercase;
        }

        .sector-change {
          font-size: 12px;
          font-weight: 700;
        }

        .sector-change.positive {
          color: #4ade80;
        }

        .sector-change.negative {
          color: #f87171;
        }

        .stocks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 4px;
          padding: 8px;
        }

        .stock-cell {
          padding: 8px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stock-cell:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        .stock-symbol {
          font-weight: 700;
          font-size: 11px;
          margin-bottom: 2px;
        }

        .stock-change {
          font-size: 13px;
          font-weight: 600;
        }

        .stock-price {
          font-size: 9px;
          opacity: 0.9;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .heatmap-container {
            flex-direction: column;
          }

          .sector-group {
            flex: 1 1 100% !important;
          }

          .stocks-grid {
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
