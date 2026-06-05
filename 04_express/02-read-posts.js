const express = require('express');
const app = express();

const posts = [
  {id: 1, title: '첫 번째 글', content: '안녕하세요', author: '김철수'},
  {id: 2, title: '두 번째 글', content: '반갑습니다', author: '이철희'},
  {id: 3, title: '세 번째 글', content: '또 만나요', author: '태연'},
];

// http://localhost:3000/posts
// app.get('/posts', (req, res) => {
//   res.json(posts);
// });

// http://localhost:3000/posts?author=김철수
app.get('/posts', (req, res) => {
  const {author} = req.query;
  if(author){
    return res.json(posts.filter((data) => data.author === author));
  }
  res.json(posts);
});

// http://localhost:3000/posts/1, http://localhost:3000/posts/2, http://localhost:3000/posts/3
app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id); // string -> number
  const post = posts.find((p) => p.id === id);
  if(!post) {
    return res.status(404).json({message: '게시물을 찾을 수 없습니다'})
  }
  res.json(post); // res.status(200).json(post) : status(200) 생략 가능
});


app.listen(3000, () => {
  console.log('http://localhost:3000 에서 실행중');
});
