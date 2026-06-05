// npm install dayjs

const dayjs = require('dayjs');
require('dayjs/locale/ko'); // 한국

const utc = require('dayjs/plugin/utc');
const relativeTimePlugin = require('dayjs/plugin/relativeTime');

dayjs.extend(utc)
dayjs.extend(relativeTimePlugin)
dayjs.locale('ko');


// 시간 더하기 빼기 
// day, 7일 뒤
const nextWeekDayjs = dayjs().add(7, 'day') 
console.log(nextWeekDayjs.format('YYYY년 M월 D일 A hh시 mm분 ss초'));
// week, 7주 뒤
const nextWeekDayjs2 = dayjs().add(7, 'week') 
console.log(nextWeekDayjs2.format('YYYY년 M월 D일 A hh시 mm분 ss초'));
// month, 7개월 뒤
const nextWeekDayjs3 = dayjs().add(7, 'month')  
console.log(nextWeekDayjs3.format('YYYY년 M월 D일 A hh시 mm분 ss초'));

// 특정 날짜까지 남은 일수 계산
// day
const startDt = dayjs('2026-04-01');
const endDt = dayjs('2026-10-23');
const diffDt = endDt.diff(startDt, 'day');
console.log(`날짜 차이 ${startDt.format('YYYY년 MM월 DD일')}에서 ${endDt.format('YYYY년 MM월 DD일')}는 ${diffDt}일이다.`);
// week
const diffDt2 = endDt.diff(startDt, 'week');
console.log(`날짜 차이 ${startDt.format('YYYY년 MM월 DD일')}에서 ${endDt.format('YYYY년 MM월 DD일')}는 ${diffDt2}주이다.`);
// month
const diffDt3 = endDt.diff(startDt, 'month');
console.log(`날짜 차이 ${startDt.format('YYYY년 MM월 DD일')}에서 ${endDt.format('YYYY년 MM월 DD일')}는 ${diffDt3}개월이다.`);

