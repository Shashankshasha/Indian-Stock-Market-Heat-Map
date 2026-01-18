import '../styles/globals.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

// Replace with your actual IDs after signup
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Get from: analytics.google.com
const ADSENSE_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // Get from: adsense.google.com

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>

      {/* Google AdSense */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <Component {...pageProps} />

      {/* Vercel Analytics */}
      <Analytics />
    </>
  );
}
