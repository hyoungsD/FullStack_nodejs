const bcrypt = require('bcryptjs');

// 비동기로 사용
async function main() {
  const password = 'my-secret-1234';
  const hash = await bcrypt.hash(password, 10);
  console.log('평문', password);
  console.log('해시', hash);

  // bcrypt.compare(평문비밀번호, 해시값)
  console.log('올바른 비밀번호: ', await bcrypt.compare('my-secret-1234', hash)); // true
  console.log('잘못된 비밀번호: ', await bcrypt.compare('my-secret-1235', hash)); // false
}

main();

