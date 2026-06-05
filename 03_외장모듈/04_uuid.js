
// npm install uuid

// uuid 모듈 안에 v4 객체를 uuidv4 이름으로 여기서 사용할 수 있게 한다
const { v4: uuidv4 } = require('uuid');


// http://example.com/user/625c6716-ec02-4cf9-b406-95319c8be75b

const uuid = uuidv4();
console.log('UUID v4', uuid);

const user = {
  id: uuidv4(),
  name: '홍길동',
  email: 'hong@email.com'
}
console.log('user', user);

