const express = require('express');
const app = express();
const port = 3000;

// request body에 json을 넣어주는 역할
app.use(express.json());
// HTML Form에서 전송된 데이터를 req.body에 담아주는 미들웨어
// x-www.urlencoded
// extended: true => 객체, 배열 같은 복잡한 데이터까지 파싱 가능, json이 중첩되어 있을 때도 사용
// extended: false => 문자열, 숫자 같은 단순 데이터만 파싱
app.use(express.urlencoded({extended: true}));


// post
app.post('/posts', (req, res)=>{
  console.log('--req.body---', req.body);
  console.log('--author---', req.body.author);
  res.send({success: true, resCode: 'OK', message: 'msg', data: req.body});
})

app.listen(port, () => {
  console.log(`=== Server start at ${port} ===`);
})
