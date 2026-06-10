const express = require('express');
const app = express();
const port = 3002;

// 요청을 하면 router, method를 보여줌
const morgan = require('morgan');
// node 내장모듈, 파일시스템
const fs = require('fs');
const path = require('path');
// 파일 업로드를 처리
const multer = require('multer');


// upload 폴더 생성
try{
  fs.readdirSync('upload');
}catch(err){
  console.log('upload 폴더 생성');
  fs.mkdirSync('upload');
}


// 파일 업로드 설정
const upload = multer({
  // 파일 저장 방식 설정
  storage: multer.diskStorage({
    // 업로드된 파일을 저장할 폴더 지정
    destination(req, file, done){
      done(null, 'upload/');  // 어디에 저장될 건지 지정 (error, 경로)
    },
    // 저장될 파일명 지정
    filename(req, file, done){
      const ext = path.extname(file.originalname); // 원본 파일의 확장자 추출
      const baseName = path.basename(file.originalname, ext); // 확장자를 제외한 파일명 추출
      const newName = baseName + Date.now() + ext;  // 파일명 중복 방지를 위해 현재 시간을 붙여 새 파일명 생성
      done(null, newName);
    }
  }),
  // 업로드 제한 설정
  limits: {
    // 최대 파일 크기: 10MB
    // 1KB = 1024 Byte
    // 1MB = 1024 * 1024 Byte
    // 10MB = 1024 * 1024 * 10 Byte
    fileSize: 1024 * 1024 * 10 
  }
})

// 파일 한개 받는 api
app.post('/upload', upload.single('image'), (req, res) => {
  console.log('---upload.single file---', req.file);
  console.log('---upload.single body---', req.body);
  res.send({
    success: true,
    image: req.file.filename
  })
})

// 여러 파일을 하나의 키로 전송
app.post('/uploadimages', upload.array('images'), (req, res) => {
  console.log('---upload.array files---', req.files);
  console.log('---upload.array body---', req.body);
  res.send({
    success: true,
    image: req.files
  })
})

// 여러 파일을 각각의 키로 전송
app.post(
  '/uploadfiles',   // path
  upload.fields([{name: 'image'},{name: 'pdf'}]),   // 미들웨어
  (req, res) => {
    console.log('---upload.fields files---', req.files);
    console.log('---upload.fields body---', req.body);
    res.send({
      success: true,
      image: req.files.image,
      pdf: req.files.pdf
    })
})

// 파일 가져오기
app.get('/image', (req, res) => {
  const filename = req.query.filename;
  return res.sendFile(process.cwd()+'/upload/'+filename) // cwd: current working directory
})


// 실행
app.listen(port, () => {
  console.log(`=== Server start at ${port} ===`);
})

