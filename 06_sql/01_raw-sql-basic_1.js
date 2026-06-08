// npm i better-sqlite3

const Database = require('better-sqlite3');
const path = require('path'); // database파일 경로 지정하기 위해 사용

const db = new Database(path.join(__dirname, 'basic.db'));

// if not exists posts : posts 테이블이 없는 경우에만 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`)


// insert
console.log('--------- 문자열 조립 방식 쿼리 ----------');
const title1 = '첫 번째 글';
const content1 = '첫 번째 글 내용 안녕하세요 문자열입니다.';
const author1 = '김철수';

const insertSql1 = `
  insert into posts(title, content, author)
  values('${title1}', '${content1}', '${author1}')
`;
console.log(insertSql1)
db.exec(insertSql1);


const title2 = '두 번째 글';
const content2 = '두 번째 글 내용 안녕하세요 문자열입니다.';
const author2 = '김철수';

const insertSql2 = `
  insert into posts(title, content, author)
  values('${title2}', '${content2}', '${author2}')
`;
console.log(insertSql2)
db.exec(insertSql2);


// select
const allSql = 'select * from posts';
const rows = db.prepare(allSql).all();  // all()하면 쿼리문 실행
console.log('all select', rows);

const searchId = 1;
const oneSql = `select * from posts where id = ${searchId}`;
const row = db.prepare(oneSql).get(); // 하나만 가져올 때는 get()
console.log('one select', row);


// update
const newTitle = '제목수정';
const updateId = 1;
const updateSql = `update posts set title = '${newTitle}' where id = ${updateId}`;
db.exec(updateSql);


