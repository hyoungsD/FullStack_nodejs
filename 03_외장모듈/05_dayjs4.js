// npm install dayjs

const dayjs = require('dayjs');
require('dayjs/locale/ko'); // 한국

const utc = require('dayjs/plugin/utc');
const relativeTimePlugin = require('dayjs/plugin/relativeTime');

dayjs.extend(utc)
dayjs.extend(relativeTimePlugin)
dayjs.locale('ko');

// 
const start = dayjs('2026-01-01');
const end = dayjs('2026-12-31');

const range = [];
for(
  let date = start;
  date.isBefore(end) || date.isSame(end, 'day');
  date = date.add(1, 'day')
){
  range.push(date.format('YYYY년 MM월 DD일'));
}

console.log(range.length);