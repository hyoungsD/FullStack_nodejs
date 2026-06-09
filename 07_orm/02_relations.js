// 관계 설정
// 사용자(User) - 게시글(Post) - 댓글(Comment)

const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'relations.db'),
  logging: true
});


// 모델 생성
const User = sequelize.define('User', {
  name: DataTypes.STRING
});
const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT
});
const Comment = sequelize.define('Comment', {
  content: DataTypes.TEXT
});


// 관계 설정
// 쌍으로 연결해주기
User.hasMany(Post); // users 1 : posts N
Post.belongsTo(User); // (users 1 : posts N)Post는 User에 속한다

Post.hasMany(Comment);
Comment.belongsTo(Post);


//
async function main(){
  await sequelize.sync();

  let post;
  const user1 = await User.create({name: '김철수'});
  post = await Post.create(
    {title: '첫 게시글', content: '내용이예요. 감사합니다', UserId: user1.id}
  );
  await Comment.create({content: '좋은 글입니다.', PostId: post.id})
  await Comment.create({content: '좋은 날씨입니다.', PostId: post.id})
  await Comment.create({content: '맛점하세요.', PostId: post.id})


  // select
  const result = await Post.findByPk(post.id, {
    include: [User, Comment]
  });
  console.log('---select---', result.title, result.User, result.Comment);
  console.log('---result.toJSON---', result.toJSON());

  
  // 모든 게시글을 가지고 오는데, 게시글의 작성자와 댓글을 같이 출력해보세요
  const postsAll = await Post.findAll({
      include: [User, Comment]
  });
  console.log('---postsAll---', postsAll.map((p)=>p.toJSON()));

  // 1번 유저가 쓴 게시글
  const user1Posts = await User.findByPk(1, {
    include: [{model: Post}]
  });
  console.log('---user1Posts---', user1Posts.toJSON());
};
main();

