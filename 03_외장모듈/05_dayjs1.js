// npm install dayjs

const dayjs = require('dayjs');
require('dayjs/locale/ko'); // 한국

const utc = require('dayjs/plugin/utc');  // : 협정 세계시(UTC)를 기준
const relativeTimePlugin = require('dayjs/plugin/relativeTime'); // "3분 전", "2시간 후"처럼 상대적인 시간 차이를 사람이 읽기 쉬운 형태로 표현해 주는 플러그인


// day.js에 플러그인 등록
// dayjs는 핵심만 가볍게 유지하고, 부가 기능은 플러그인으로 켠다
// 이 플러그인들을 활성화하려면 아래와 같이 dayjs.extend()를 사용해야 함
dayjs.extend(utc)
dayjs.extend(relativeTimePlugin)
dayjs.locale('ko');

const nowDayjs = dayjs();
console.log('nowDayjs', nowDayjs);
// {
//   '$L': 'ko',
//   '$d': 2026-06-05T05:35:11.231Z,
//   '$y': 2026,
//   '$M': 5,
//   '$D': 5,
//   '$W': 5,
//   '$H': 14,
//   '$m': 35,
//   '$s': 11,
//   '$ms': 231,
//   '$x': {},
//   '$isDayjsObject': true
// }

console.log(nowDayjs.format('YYYY-MM-DD HH:mm:ss'));
// 2026-06-05 14:35:11
console.log(nowDayjs.format('YYYY년 MM월 DD일')); 
// 2026년 06월 05일
console.log(nowDayjs.format('YYYY년 M월 D일 h시 m분 s초'));  
// 2026년 6월 5일 14시 40분 36초
console.log(nowDayjs.format('YYYY년 M월 D일 A hh시 mm분 ss초'));  
console.log(nowDayjs.format('YYYY년 M월 D일 a h시 m분 s초'));  


const dateDayjs = dayjs('2026-08-07');
console.log('dateDayjs', dateDayjs.format('YYYY-MM-DD HH:mm:ss'));

