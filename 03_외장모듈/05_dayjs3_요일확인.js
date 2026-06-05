// npm install dayjs

const dayjs = require('dayjs');
require('dayjs/locale/ko'); // 한국

const utc = require('dayjs/plugin/utc');
const relativeTimePlugin = require('dayjs/plugin/relativeTime');

dayjs.extend(utc)
dayjs.extend(relativeTimePlugin)
dayjs.locale('ko');


// 요일 확인
console.log(`오늘은 ${dayjs().format('dddd')}요일입니다.`); // 금요일
console.log(`오늘은 ${dayjs().format('ddd')}요일입니다.`);  // 금
console.log(`오늘은 ${dayjs().format('dd')}요일입니다.`);   // 금
console.log(`오늘은 ${dayjs().format('d')}요일입니다.`);  // 5

