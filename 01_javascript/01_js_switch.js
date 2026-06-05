// Hello World를 콘솔에 출력해보세요 && 실행
// node 01/01_js01.js
console.log('Hello World');

let date = new Date();
const day = date.getDay();
console.log('day', day);
// 0 ~ 6 = 0: 일요일, 1: 월요일
let dayString;
switch(day){
  // 현재 요일 출력 (목요일)
  case 0: 
    dayString = '일요일';
    break;
  case 1: 
    dayString = '월요일';
    break;
  case 2: 
    dayString = '화요일';
    break;
  case 3: 
    dayString = '수요일';
    break;
  case 4: 
    dayString = '목요일';
    break;
  case 5: 
    dayString = '금요일';
    break;
  default: 
    dayString = '토요일';
}
console.log('dayString', dayString);

