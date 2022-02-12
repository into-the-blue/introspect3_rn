import * as Sentry from '@sentry/react-native';
import CONFIG from './config.json';

export const setupSentry = () => {
  Sentry.init({
    dsn: CONFIG.SENTRY_DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
};
