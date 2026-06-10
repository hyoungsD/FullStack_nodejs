const express = require('express');
const app = express();
const PORT = 3000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const saltRound = Number(process.env.SALT_ROUND); // env에서 가져오는 건 String이므로 Number로 변환

const users = [];
const posts = [];
let userId = 1;
let postId = 1;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 회원가입
app.post('/register', async (req, res)=>{
  const {name, email, password} = req.body;
  if(!name || !email || !password){
    return res
      .status(400)
      .json({success: false, message: 'name, email, password는 필수입니다.'});
  };
  if(users.find((user) => user.email === email)){
    return res
      .status(409)
      .json({success: false, message: '이미 가입한 이메일입니다.'});
  };
  const hash = await bcrypt.hash(password, saltRound);
  const user = {id: userId++, name, email, password: hash}
  users.push(user);
  res.status(201).json({success: true, data: {id: user.id, name: user.name, email: user.email}});
})


// 로그인
app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res
      .status(400)
      .json({success: false, message: 'email, password는 필수입니다.'});
  }
  const user = users.find((user) => user.email === email);
  if(!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({success: false, message: 'email 또는 password가 올바르지 않습니다.'})
  }
  const token = jwt.sign({id: user.id, name: user.name, email: user.email}, secret, {expiresIn: '1h'});
  res.json({success: true, token})
});


// 인증 실행할 미들웨어
function auth(req, res, next){
  const header = req.headers.authorization || '';
  // authorization : 'Bearer 토큰번호' 로 받아올 거니까 토큰번호만 남기기
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if(!token){
    return res
      .status(401)
      .json({success: false, message: '토큰이 없습니다'});
  }
  // 우리 토큰이 맞는지 확인하기
  try{
    req.user = user = jwt.verify(token, secret);  // 리퀘스트의 user 속성으로 넘겨주기
    next();
  }catch(err){
    return res
      .status(400)
      .json({success: false, message: '유효하지 않은 토큰입니다'});
  }
}

// 인증 후 글 등록
app.post('/posts', auth, (req, res) => {
  const {title, content} = req.body;
  if(!title || !content){
    return res
      .status(400)
      .json({success: false, message: 'title, content는 필수입니다.'});
  }
  const post = {id: postId++, title, content, name: req.user.name};
  posts.push(post);
  res
    .status(201)
    .json({success: true, post});
})


// 인증 없이 글 등록
// 인증하려면 인증 미들웨어인 auth 추가하면 됨!!!
// app.post('/posts', (req, res) => {
//   const {title, content} = req.body;
//   if(!title || !content){
//     return res
//       .status(400)
//       .json({success: false, message: 'title, content는 필수입니다.'});
//   }
//   const post = {id: postId++, title, content};
//   posts.push(post);
//   res
//     .status(201)
//     .json({success: true, post});
// })


// 글 읽기
app.get('/posts/:id', auth, (req, res) => {
  const id = req.params.id;
  const post = posts.find((p) => p.id === Number(id));
  console.log('--post--', posts)
  if(!post){
    return res
      .status(404)
      .json({success: false, message: '게시글을 찾을 수 없습니다'})
  }
  res.json(post);
})


// 실행
app.listen(PORT, ()=>{
  console.log(`http://localhost:${PORT} 에서 서버 실행중입니다...`);
})


