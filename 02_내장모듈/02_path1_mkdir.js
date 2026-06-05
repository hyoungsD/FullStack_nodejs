const path = require('path');
const fs = require('fs'); 


// 디렉토리 만들기
const dirName = path.join(__dirname, 'parent', 'child');
console.log(dirName);
// recursive: true : parent, child를 단계별로 실행한다
fs.mkdirSync(dirName, {recursive: true});


// 터미널에서 brew로 tree 설치해서 디렉토리 편하게 보기
// brew install tree 
// tree .


// 터미널에서 현재 디렉토리 확인
// pwd