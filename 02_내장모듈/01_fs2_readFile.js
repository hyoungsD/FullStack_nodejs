// 파일시스템
const fs = require('fs');

// readFileSync (동기 방식)


// 
// 파일 읽기
const data = fs.readFileSync('test2.txt', 'utf-8');
console.log('data: ', data);

// test.txt async-test2.txt async-test.txt 읽어서 console 출력해주세요
const data1 = fs.readFileSync('test.txt', 'utf-8');
const data2 = fs.readFileSync('async-test2.txt', 'utf-8');
const data3 = fs.readFileSync('async-test.txt', 'utf-8');
console.log('data1: ', data1);
console.log('data2: ', data2);
console.log('data3: ', data3);

