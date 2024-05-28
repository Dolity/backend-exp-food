const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} [${level}] ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    // format.colorize(),
    format.timestamp( {format: 'YYYY-MM-DD HH:mm:ss'} ),
    format.label({ label: 'log' }),
    myFormat
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console(
        { 
            format: combine(
            format.colorize(),
            format.timestamp( {format: 'YYYY-MM-DD HH:mm:ss'} ),
            format.label({ label: 'log' }),
            myFormat
            )
        }
    ),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

logger.log();

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

module.exports = logger;