import { useEffect } from 'react';

// AdSense Ad Banner Component
// Usage: <AdBanner slot="1234567890" format="horizontal" />
export default function AdBanner({ slot, format = 'auto', style = {} }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  // Don't render in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className="ad-placeholder"
        style={{
          background: '#f5f5f5',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '14px',
          minHeight: format === 'horizontal' ? '90px' : '250px',
          ...style,
        }}
      >
        Ad Space ({format})
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        ...style,
      }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
