// 파일시스템
const fs = require('fs');

const data = fs.readFileSync('obj-test.json', 'utf-8');
console.log(data);
console.log(typeof data); // string

const dataJson = JSON.parse(data);
console.log(dataJson);
console.log(typeof dataJson);

console.log(dataJson.name);
