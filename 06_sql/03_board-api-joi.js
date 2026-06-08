
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const joi = require('joi');


const app = express();
app.use(express.json());


// JOI 스키마 정의 : 게시물 생성 규칙을 선언적으로 정의
const createPostSchema = joi.object(
  {
    title: joi.string().min(2).max(5).required(),
    content: joi.string().min(10).max(12).required(),
    author: joi.string().required()
  }
);

// 검증 미들웨어는 스키마를 받아서 검증 후에 돌려준다
function validate(scheme) {
  return (req, res, next) => {
    const {error} = scheme.validate(req.body);
    if(error) {
      console.log(error);
      return res.status(400).json({
        message: '입력값이 올바르지 않습니다.',
        detail: error.details[0].message
      });
    }
    next();
  }
}



const db = new Database(path.join(__dirname, 'board.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`)


// 1. 글쓰기
app.post('/posts', validate(createPostSchema), (req, res) => {
  const {title, content, author} = req.body;
  if(!title || !content) {
    return res.status(400).json({message: 'title과 content는 필수'});
  }
  const info = db.prepare('INSERT INTO posts(title, content, author) VALUES(?, ?, ?)').run(title, content, author || '익명');
  const created = db.prepare('SELECT * FROM posts where id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
})

// 2. 목록
app.get('/posts', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
  res.json(posts);
});

// 3. 상세
app.get('/posts/:id', (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if(!post){
    return res.status(404).json({message: '게시글을 찾을 수 없습니다'})
  };
  res.json(post);
});

// 4. 수정
app.put('/posts/:id', (req, res) => {
  const postID = req.params.id;
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postID);
  if(!post){
    return res.status(404).json({message: '게시글을 찾을 수 없습니다'})
  };
  const {title, content, author} = req.body;
  if(title !== undefined) post.title = title;
  if(content !== undefined) post.content = content;
  if(author !== undefined) post.author = author;
  db.prepare('UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?')
    .run(title, content, author, postID);
  res.json(db.prepare('SELECT * FROM posts WHERE id = ?').get(postID));
});

// 5. 삭제
app.delete('/posts/:id', (req, res) => {
  const postID = req.params.id;
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postID);
  if(!post){
    return res.status(404).json({message: '게시글을 찾을 수 없습니다'})
  };
  db.prepare('DELETE FROM posts WHERE id = ?').run(postID);
  res.json({message: '삭제됨', post});
});


// server 기동
app.listen(3000, () => {});

