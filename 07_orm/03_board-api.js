// Express 앱 생성 및 JSON 요청 바디 파싱 설정
const express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const path = require('path');

const app = express();
app.use(express.json());

// Sequelize(SQLite) DB 연결 설정
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'board.db'),
  logging: false
});

// Post 모델 정의 (게시글 테이블 구조)
const Post = sequelize.define('Post', {
  title: {type: DataTypes.STRING, allowNull: false},
  content: {type: DataTypes.TEXT, allowNull: false},
  author: {type: DataTypes.STRING},
});


// 게시글 생성 라우터
// async 추가해야함!!!!
app.post('/posts', async (req, res) => {
  const {title, content, author} = req.body;
  if(!title || !content){
    return res.status(400).json({message: '제목과 본문은 필수입니다.'})
  }
  const post = await Post.create({title, content, author});
  res.status(201).json(post);
});


// 게시글 목록 가져와서 리턴하기 (전체 조회)
app.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
    order: [['id', 'desc']]
  });
  res.json(posts);
});


// 게시글 상세 가져와서 리턴하기 (단건 조회)
app.get('/posts/:id', async (req, res) => {
  // const post = await Post.findOne({
  //   where: {id: req.params.id}
  // })
  const post = await Post.findByPk(req.params.id);
  if(!post){
    return res.status(404).json({message: '게시글을 찾을 수 없습니다'})
  }
  res.json(post);
})

// 게시글 수정
app.put('/posts/:id', async(req, res) => {
  const post = await Post.findByPk(req.params.id);
  if(!post){
    return res.status(404).json({message: '게시글을 찾을 수 없습니다'})
  }
  if(req.body.title !== undefined && req.body.title) post.title = req.body.title;
  if(req.body.content !== undefined && req.body.content) post.content = req.body.content;
  if(req.body.author !== undefined && req.body.author) post.author = req.body.author;

  await post.save();
  res.json(post);
})

// 게시글 삭제
app.delete('/posts/:id', async(req, res) => {
  const post = await Post.findByPk(req.params.id);
  if(!post){
    return res.status(404).json({message: '게시글을 찾을 수 없습니다'})
  }
  await post.destroy();
  res.json({message: '삭제됨', post})
})


// 서버 실행 및 DB 동기화
async function main() {
  await sequelize.sync(); // model 생성 및 DB 테이블 동기화
  app.listen(3000, () => console.log(`localhost:3000 서버가 실행 중`)); // express 기동
};
main();
