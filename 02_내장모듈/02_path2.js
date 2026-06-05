const path = require('path');
const fs = require('fs'); // 디렉토리 만들기

// 현재 디렉토리, 현재 파일명
// console.log(__dirname, __filename); 


// path.join : 디렉토리 경로만 만들고 실제 디렉토리를 만들지는 않는다
// path.join(__dirname, 디렉토리명, 파일명);
const sampleDir = path.join(__dirname, 'samples', 'test.json');
console.log(sampleDir, typeof sampleDir); // type: string


// 현재 디렉토리(02) 밑에 02/samples/files/token/jwt.json 경로 만들어보기
// path.join을 이용해서 만들어보기
const tokenDir = path.join(__dirname, 'samples', 'files', 'token');
console.log(tokenDir);
fs.mkdirSync(tokenDir, {recursive: true});


// 
// 02/samples/files/token/jwt.json
// 이 파일을 생성하고 여기에 jwtObj 겍체럴 string 형태로 저장하고
const jwtObj = {
  token: '1111',
  expiredAt: '2026-06-04'
}
fs.writeFileSync(path.join(tokenDir, 'jwt.json'), JSON.stringify(jwtObj));

// 02/samples/files/token/jwt.json 파일을 읽어서 내용을
// jwtObj2로 저장하고, 그 객체의 token 정보를 출력해보세요
const tokenStr = fs.readFileSync(path.join(tokenDir, 'jwt.json'), 'utf-8');
console.log(tokenStr);
const token = JSON.parse(tokenStr);
console.log(token, typeof token);


// 
// 
// 대용량 파일은 fsPromises 사용


