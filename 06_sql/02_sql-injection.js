const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'sql-injection.db'));


db.exec(
  `
    CREATE TABLE IF NOT EXISTS posts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      author TEXT
    )
  `
);

const count = db.prepare('SELECT COUNT(*) AS n FROM posts').get().n;
if(count === 0) {
  const insert = db.prepare(
    'INSERT INTO posts(title, content, author) values (?, ?, ?)'
  );
  insert.run('공개된 글', '공개된 글입니다. 안녕하세요', '김철수');
  insert.run('또 다른 글', '또 다른 글입니다. 안녕하세요', '이영희');
  insert.run('비밀 글', '비밀 글입니다. 안녕하세요', '관리자');
}

// node 02_sql_injection.js '김철수'
// process.argv[2] : 입력한 세번째 값, 없으면 김철수
// input으로 값을 받은 후에 badQuery를 실행
const input = process.argv[2] || '김철수';
console.log(input);

function badQuery(author){
  const sql = `
    SELECT * FROM posts WHERE author = '${author}'
  `;
  console.log('위험한 sql => ', sql);
  return db.prepare(sql).all();
}

try{
  console.log('위험한 결과 : ', badQuery(input));
}catch(e){
  console.error(e);
}


// node 02_sql-injection.js "' OR '1'='1" 
// 전체 정보가 전부 보임
