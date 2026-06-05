// 파일시스템
const fs = require('fs');

const objData = {
  name: '김철수',
  age: 25,
  grade: 'A'
}

// 문자열(String)이나 버퍼(Buffer) 타입만 받아들이기 때문에
// JSON.stringify()를 사용하여 객체를 JSON 문자열로 변환한 뒤 저장
fs.writeFileSync('obj-test.json', JSON.stringify(objData));


