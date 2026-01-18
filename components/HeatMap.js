import { useState } from 'react';
import { getTileColor, formatNumber, formatPercent } from '../lib/stockData';

export default function HeatMap({ data, title }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="heatmap">
      {title && <h2 className="section-title">{title} ({data.length})</h2>}

      <div className="tiles-grid">
        {data.map((item, index) => (
          <div
            key={item.symbol}
            className="tile"
            style={{ backgroundColor: getTileColor(item.change) }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="tile-symbol">{item.symbol}</div>
            <div className="tile-value">{formatNumber(item.value)}</div>
            <div className="tile-change">{formatPercent(item.change)}</div>

            {hoveredIndex === index && (
              <div className="tooltip">
                <div className="tooltip-title">{item.symbol}</div>
                <table className="tooltip-table">
                  <tbody>
                    <tr>
                      <td>Current</td>
                      <td>{formatNumber(item.value)}</td>
                    </tr>
                    <tr>
                      <td>Open</td>
                      <td>{formatNumber(item.open)}</td>
                    </tr>
                    <tr>
                      <td>High</td>
                      <td>{formatNumber(item.high)}</td>
                    </tr>
                    <tr>
                      <td>Low</td>
                      <td>{formatNumber(item.low)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .heatmap {
          width: 100%;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #d32f2f;
          margin-bottom: 16px;
          padding-left: 8px;
          border-left: 3px solid #d32f2f;
        }

        .tiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
        }

        .tile {
          position: relative;
          padding: 12px;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          min-height: 80px;
        }

        .tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 100;
        }

        .tile-symbol {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tile-value {
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .tile-change {
          font-size: 13px;
          font-weight: 600;
        }

        .tooltip {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #333;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          z-index: 1000;
          min-width: 180px;
          margin-top: 8px;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid white;
        }

        .tooltip-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
        }

        .tooltip-table {
          width: 100%;
          font-size: 12px;
        }

        .tooltip-table td {
          padding: 4px 0;
        }

        .tooltip-table td:first-child {
          color: #666;
        }

        .tooltip-table td:last-child {
          text-align: right;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .tiles-grid {
            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
            gap: 6px;
          }

          .tile {
            padding: 10px;
            min-height: 70px;
          }

          .tile-symbol {
            font-size: 10px;
          }

          .tile-value {
            font-size: 11px;
          }

          .tile-change {
            font-size: 11px;
          }

          .tooltip {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin-top: 0;
          }

          .tooltip::before {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
