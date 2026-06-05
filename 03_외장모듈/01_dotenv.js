// dotenv(환경변수)
// npm install dotenv

// 
// .env 파일 내용
// PORT=3000
// DB_NAME=myapp
// API_KEY=key1234
// NODE_ENV=development


require('dotenv').config();

console.log('서버포트', process.env.PORT);
console.log('DB이름', process.env.DB_NAME);
console.log('API키', process.env.API_KEY);


// .env에 키가 NODE_ENV 값이 development 넣고
// process.env.NODE_ENV를 출력해보세요
console.log('노드환경', process.env.NODE_ENV);


// 개발환경일 경우에는 '개발환경에서 실행중', 아니면 '운영환경에서 실행중' 출력
if(process.env.NODE_ENV === 'development'){
  console.log('개발환경에서 실행중입니다');
}else{
  console.log('운영환경에서 실행중입니다');
}

