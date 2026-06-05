// 파일시스템
const fs = require('fs');

let personInfo = {
  name: '홍길동',
  age: 25,
  address: '서울시 금천구',
  hobby: ['뜨개질', '독서', '커피내리기']
}


// 1. personInfo 객체를 JSON string 포맷으로 
// personInfo.json 에 저장
fs.writeFileSync('personInfo.json', JSON.stringify(personInfo));


// 2. personInfo.json 파일에서 내용을 읽고
// personInfo2 객체에 저장하세요
const personInfo2 = JSON.parse(fs.readFileSync('personInfo.json', 'utf-8'));
// console.log('personInfo2: ', personInfo2);


// 3. personInfo2의 name, age, address, hobby를 console에 출력
console.log('name: ', personInfo2.name);
console.log('age: ', personInfo2.age);
console.log('address: ', personInfo2.address);
console.log('hobby: ', personInfo2.hobby);


console.log('===========================================');


let personInfoStr;
try{
  personInfoStr = fs.readFileSync('personInfo.json', 'utf-8');
}catch(e){
  console.error('error', e);
  personInfoStr = '{}';
}
const personInfo22 = JSON.parse(personInfoStr);
console.log('name: ', personInfo22.name);
console.log('age: ', personInfo22.age);
console.log('address: ', personInfo22.address);
console.log('hobby: ', personInfo22.hobby);

