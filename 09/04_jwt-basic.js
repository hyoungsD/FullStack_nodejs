const jwt = require('jsonwebtoken');

const secret = 'fdAs_14>FE8f' // .env에 숨기기

// (payload, secret, option)
// expiresIn: 시간(String) 1h, 30m, 3d, 2y...
const token = jwt.sign({id: 1, name: '김철수', lv: 3}, secret, {expiresIn: '1h'});
console.log('토큰: ', token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyyoOyImCIsImx2IjozLCJpYXQiOjE3ODEwNjg1NTUsImV4cCI6MTc4MTA3MjE1NX0.KmFk-G4yLOFmkddfQjP76-dNGcCNGi9kCd9U4ldsRHg1


// jwt.verify(): 토큰이 진짜인지 확인하고, 안에 들어있는 데이터를 꺼내는 함수
const payload = jwt.verify(token, secret);
console.log('페이로드: ', payload);
// { id: 1, name: '김철수', lv: 3, iat: 1781068796, exp: 1781072396 }
// iat (Issued At) : 토큰이 생성된 시간
// exp (Expiration Time) : 토큰 만료 시간 (로그인 유지 기간 설정에 사용)


// 위변조 토큰 확인하기
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyyoOyImCIsImx2IjozLCJpYXQiOjE3ODEwNjg1NTUsImV4cCI6MTc4MTA3MjE1NX0.KmFk-G4yLOFmkddfQjP76-dNGcCNGi9kCd9U4ldsRHg1';
// const payload2 = jwt.verify(token1, secret);
// console.log('페이로드222: ', payload2); // 변조한 토큰 확인하면 error
try{
  jwt.verify(token1, secret);
}catch(err){
  console.log('위변조 토큰 거부: ', err.message);
}


