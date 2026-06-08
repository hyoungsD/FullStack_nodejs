const express = require('express'); // npm install express
const app = express();


app.use(express.json());

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// http://localhost:3000/posts 요청이 들어오면 postRouter로 전달
app.use('/posts', postsRouter);
// http://localhost:3000/comments 주소로 들어오면 commentsRouter로
app.use('/comments', commentsRouter);

app.listen(3000, () => {
  console.log('3000으로 서버 실행중...');
})


