// Sentry Client-side Configuration
// Get your DSN from: https://sentry.io (Free tier: 5K events/month)

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'https://YOUR_SENTRY_DSN@sentry.io/YOUR_PROJECT_ID',

  // Performance monitoring
  tracesSampleRate: 0.1, // 10% of transactions (reduce for high traffic)

  // Session Replay (optional)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Filter out common non-errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Network request failed',
    'Failed to fetch',
    'Load failed',
    'Script error.',
  ],
});
