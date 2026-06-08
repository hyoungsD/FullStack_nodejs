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


console.log('---------- preparedstatement -----------');

// insert
const insert = db.prepare(`
  INSERT INTO posts(title, content, author) values (?, ?, ?) 
`);
const info = insert.run('첫번째 글', '첫번째 글 컨텐츠', '김철수');

console.log("방금 넣은 글의 id ", info.lastInsertRowid);
console.log('전체글', db.prepare('SELECT * FROM posts').all());


// update
db.prepare('UPDATE posts SET title = ? WHERE id = ?').run('제목 수정됨 1', 1);
console.log('수정후 1번 글', db.prepare('SELECT * FROM posts WHERE id = ?').get(1));


// delete
// 게시글 1번을 삭제하고, console.log에 전체 게시글을 가지고 와보기
db.prepare('DELETE FROM posts WHERE id = ?').run(1);
console.log('삭제 후 전체 리스트', db.prepare('SELECT * FROM posts').all());
