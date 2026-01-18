import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Indices' },
  { href: '/realty', label: 'Realty' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ showStreaming, isStreaming, setIsStreaming, isLoading, currentTime }) {
  const router = useRouter();

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">Stock Heat Map</span>
        </Link>
        <nav className="main-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${router.pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {showStreaming && (
        <div className="header-center">
          <span className="streaming-label">Streaming</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={isStreaming}
              onChange={(e) => setIsStreaming(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-text">{isStreaming ? 'On' : 'Off'}</span>
          {isLoading && <span className="loading-indicator">⟳</span>}
        </div>
      )}

      <div className="header-right">
        {currentTime && (
          <>
            <span className="timestamp">As on {currentTime}</span>
            <span className={`live-dot ${isStreaming ? 'active' : ''}`}></span>
          </>
        )}
      </div>

      <style jsx>{`
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

        .main-nav {
          display: flex;
          gap: 8px;
        }

        .main-nav :global(.nav-link) {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .main-nav :global(.nav-link:hover) {
          color: #333;
          background: #f5f5f5;
        }

        .main-nav :global(.nav-link.active) {
          color: #d32f2f;
          font-weight: 600;
          background: #fff5f5;
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

        @media (max-width: 768px) {
          .header {
            padding: 12px 16px;
          }

          .header-left {
            width: 100%;
            justify-content: space-between;
          }

          .main-nav {
            gap: 4px;
          }

          .main-nav :global(.nav-link) {
            padding: 4px 8px;
            font-size: 12px;
          }

          .header-center {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .header-right {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
