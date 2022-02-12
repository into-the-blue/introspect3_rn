import {
  logger,
  consoleTransport,
  configLoggerType,
  transportFunctionType,
  sentryTransport,
} from 'react-native-logs';
import * as Sentry from '@sentry/react-native';

const myTransport: transportFunctionType = props => {
  consoleTransport(props);
  sentryTransport(props);
  return true;
};
const config: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: myTransport,
  transportOptions: {
    SENTRY: Sentry,
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
    extensionColors: {
      XENO: 'cyan',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};
export const LOG = logger.createLogger(config);
