const http = require('http'); // Common JS


const server = http.createServer((req, res) => {
  // 실제 웹서버 로직을 추가해주면 됩니다.

  // res -> Response
  // 200 클라이언트(브라우저) -> 성공
  // Content-Type : text, html, json, media..
  // charset : utf-8, ksc5601..
  res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

  // req -> Request
  console.log('요청 URL', req.url);
  console.log('요청 메서드', req.method);
  console.log('요청 헤더', req.headers);

  res.end('안녕하세요 첫번째 노드 웹서버입니다.');
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
})


// 
// cat /etc/hosts
//  : 리눅스/유닉스 계열 OS에서 
//    IP 주소와 호스트 이름(또는 도메인)을 1:1로 매핑하여 
//    컴퓨터가 도메인 주소를 찾을 때 가장 먼저 조회하는 로컬 DNS 파일을 출력하는 명령어
