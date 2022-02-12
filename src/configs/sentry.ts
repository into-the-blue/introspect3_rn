import * as Sentry from '@sentry/react-native';

export const setupSentry = () => {
  Sentry.init({
    dsn: 'https://3b88a6087fa64a9cbf2fc0a68d467b3f@sentry.timvel.com/2',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
};
