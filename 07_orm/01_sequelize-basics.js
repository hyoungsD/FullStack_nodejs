// npm install sequelize
// npm install sqlite3

const {Sequelize, DataTypes, Op} = require('sequelize');
// Op: Operate의 약자 : LIKE문 사용
const path = require('path');

// sequelize orm 객체 생성
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'basics.db'),
  logging: true
});

// 모델 orm
// 테이블(=모델) 생성
// 모델(Post) ↔ 테이블(Posts)
const Post = sequelize.define('Post', { // Post: 모델명
  title: {type: DataTypes.STRING, allowNull: false},
  content: {type: DataTypes.TEXT, allowNull: false},
  author: {type: DataTypes.STRING},
});

// 실행
async function main() {
  // sync({force: true}) : 기존 테이블 삭제 후 새 테이블 생성
  // sync({force: false}) : 테이블이 없으면 생성, 기존 테이블에 이어서 생성(기본값)
  await sequelize.sync();

  // insert == create
  // INSERT INTO Posts(title, content, author) VALUES(?, ?, ?)
  await Post.create({title: '첫번째 글', content: '안녕하세요', author: '김철수'});
  await Post.create({title: '두번째 글', content: '즐거운 하루 보내세요', author: '이영희'});
  await Post.create({title: '세번째 글', content: '좋은 아침', author: '김바둑'});
  await Post.create({title: '네번째 글', content: '반가워요', author: '박만득'});

  // select
  // SELECT * FROM Posts
  const all = await Post.findAll();
  all.forEach((a) => {
    console.log(a.title, a.content, a.author);
  });
  // SELECT * FROM Posts WHERE id = 1
  const first = await Post.findByPk(1);
  console.log('---first---', first.title, first.content, first.author);

  // update
  // UPDATE Posts SET title = ? WHERE id = 1
  const post = await Post.findByPk(1);
  post.title = '1번 제목 수정';
  post.save();
  console.log('수정된 후 1번 글 ', (await Post.findByPk(1)).title);

  // delete
  // DELETE FROM Posts WHERE id = 2
  await Post.destroy({where: {id: 2}});
  // SELECT COUNT(*) FROM Posts
  console.log('삭제된 후 전체 글 수', (await Post.count()));

  // bulk insert
  // INSESR INTO Posts(title, content, author) VALUES (?,?,?), (?,?,?)
  await Post.bulkCreate([
    {title: 'Node.js 입문', content: 'Node 연습부터', author: '김철수'},
    {title: 'Express.js 입문', content: 'Express 연습부터', author: '김기남'},
    {title: 'Nest.js 입문', content: 'Nest.js 입문 연습부터', author: '김형의'},
  ]);

  // SELECT * FROM Posts WHERE author = '김철수'
  const byAuthor = await Post.findAll({where: {author: '김철수'}});
  console.log('---byAuthor---', byAuthor);

  // LIKE
  // SELECT * FROM Posts WHERE title LIKE '%Express%'
  const likeTitle = await Post.findAll({
    where: {title: {[Op.like]: '%Express%'}}
  });
  console.log('---Op.like---', likeTitle.map((p)=>p.title));

  // SELECT id, title FROM Posts ORDER BY id ASC LIMIT 3
  const titleOnly = await Post.findAll({
    attributes: ['id', 'title'],
    order: [['id', 'ASC']],
    limit: 3
  });
  console.log('---titleOnly---', titleOnly.map((p)=>p.toJSON()));

  // SELECT * FROM Posts WHERE author = '김철수' ORDER BY id ASC LIMIT 1;
  const findOne = await Post.findOne({
    where: {author: '김철수'},
    order: [['id', 'ASC']]
  });
  console.log('---findOne---', findOne.toJSON());

  // 여러개 업데이트
  // UPDATE Posts SET author = '이철수' WHERE author = '김철수'
  const affected = await Post.update({author: '이철수'}, {where: {author: '김철수'}});
  console.log('---affected--', affected);

  // raw sql
  const rawRows = await sequelize.query(
    'SELECT id, title, author FROM Posts WHERE author = :author', // 쿼리
    {
      replacements: {author: '이철수'},
      type: Sequelize.QueryTypes.SELECT // 반환할 타입 : select결과를 배열로
    }
  );
  console.log('---rawRows---', rawRows);

  // in
  // SELECT * FROM Posts WHERE id IN (1,3,5)
  const inIds = await Post.findAll({
    where: {id: {[Op.in] : [1,3,5]}}
  });
  console.log('---inIds---', inIds.map((p)=>p.toJSON()));

  // and
  // SELECT * FROM Posts WHERE author = '이철수' AND title LIKE '%Node%'
  const andCond = await Post.findAll({
    where: {
      [Op.and] : [{author: '이철수'}, {title: {[Op.like]: '%Node%'}}]
    }
  });
  console.log('---andCond---', andCond.map((p)=>p.toJSON()));
}
main();
