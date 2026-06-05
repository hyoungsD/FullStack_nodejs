//  winston(로깅) : 타임스탬프
// npm install winston

const winston = require('winston');


const simpleLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({timestamp, level, message}) => {
      return `${timestamp} [${level}: ${message}]`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'app2.log'
    })
  ]
});

simpleLogger.info('타임스탬프가 포함된 로거');

// 터미널에서 로그파일 확인
// tail -f app2.log


