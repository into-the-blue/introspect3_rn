import {logger, consoleTransport, configLoggerType} from 'react-native-logs';

const config: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
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
