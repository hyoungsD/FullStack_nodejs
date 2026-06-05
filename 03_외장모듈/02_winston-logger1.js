//  winston(로깅)
// npm install winston

const winston = require('winston');

// 로거 만들기
const logger = winston.createLogger({
  level: 'info',  // 어느 중요도까지 기록할지 정하는 장소
  format: winston.format.simple(),  // 간단한 테스트 형식
  transports: [ // 로거 출력 방향 설정
    new winston.transports.Console(), // 콘솔로 출력
    new winston.transports.File({     // 파일(app.log)에 저장
      filename: 'app.log'
    })
  ]
});



// logger.는 try~cache의 cache 안에 넣는다
// 중요도 : error > warn > info > debug
console.log('로깅 시작');

logger.error('에러 발생 - 가장 중요한 에러 메시지');
logger.warn('경고 - 주의가 필요한 메시지');
logger.info('정보 - 일반적인 정보');
logger.debug('디버그 - 개발 중에만 사용하는 메시지');

console.log('로깅 끝');


