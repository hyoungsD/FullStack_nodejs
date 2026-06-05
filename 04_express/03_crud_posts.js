const express = require('express');
const app = express();

// 미들웨어 넣어주기
// POST/PUT할 때 BODY에 json을 답기 위해서 반드시 설정 
// 넣지 않으면 string으로 인식
app.use(express.json());

let posts = [
  {id: 1, title: ' 첫번째 글', content: '안녕하세요', author: '김철수'}
];

let nextId = 2; // 새 글에 ID 부어 위해서 사용


// 목록
app.get('/posts', (req, res) => {
  // 1. json으로 posts 객체를 클라이언트에 반환하는 코드를 작성헤보세요
  res.json(posts);
});

// POST METHOD
app.post('/posts', (req, res) => {
  const {title, content, author} = req.body;
  
  if(!title || !content){
    return res.status(400).json({message: 'title과 content는 필수입니다'})
  }

  const post = {id: nextId++, title: title, content: content, author: author || '익명'};
  posts.push(post);

  res.status(201).json(post);
});


app.listen(3000, () => {
  console.log(`http://localhost:3000에 서버가 떴어요`);
})
