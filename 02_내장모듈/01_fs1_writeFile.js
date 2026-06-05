// 파일시스템
const fs = require('fs');


// 동기 fs.writeFileSync
// 파일 쓰기 작업이 완료될 때까지 다음 코드의 실행을 멈춥니다(블로킹). 
// 스크립트가 실행될 때 맨 처음 한 번만 설정 파일을 읽거나 쓰는 등 순서가 보장되어야 하는 상황에서 유용합니다.
// 기본 문법: fs.writeFileSync(file, data[, options])
// 공통 옵션: 
//    { encoding: 'utf8' }: 인코딩 방식 (기본값: 'utf8')
//    { flag: 'a' }: 파일을 덮어쓰지 않고 이어쓰기(append) 하려면 'a'를 사용
fs.writeFileSync('test.txt', 'Hello World');
// node 01_fs.js 
// cat test.txt
// cat: 파일의 내용을 화면에 출력할 때 사용하는 명령어

// test2.txt 파일을 만들고 '안녕하세요 남부여성발전센터입니다.'
fs.writeFileSync('test2.txt', '안녕하세요 남부여성발전센터입니다.');
// cat test2.txt


// 비동기 fs.writeFile
// 파일을 쓰는 동안 블로킹(Blocking)이 발생하지 않아 서버 환경에 적합합니다. 
// 작업이 완료되면 콜백 함수가 호출됩니다
// 기본 문법: fs.writeFile(file, data[, options], callback)
fs.writeFile('async-test.txt', 'Hello World', (err) => {
  if(err) {
    console.error('error', error);
    return;
  }
  console.log('비동기 파일쓰기 완료');
})
console.log('비동기 파일 쓰기 완료 2');


// 3. async-test2.txt 파일 만들고 '안녕하세요 남부여성발전센터입니다.'
// fs.writeFile 메소드로 파일 쓰기 연습
fs.writeFile('async-test2.txt', '안녕하세요 남부여성발전센터입니다.', (err) => {
  if(err){
    console.error('error', error);
    return;
  }
  console.log('async-test2.txt 비동기 파일쓰기 완료');
})
console.log('async-test2.txt 비동기 파일 쓰기 완료 2');

