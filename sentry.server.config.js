// Sentry Server-side Configuration

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://YOUR_SENTRY_DSN@sentry.io/YOUR_PROJECT_ID',

  tracesSampleRate: 0.1,

  enabled: process.env.NODE_ENV === 'production',
});
