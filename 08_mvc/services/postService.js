const { Post } = require('../models');

// 게시글 목록
const list = () => {
  return Post.findAll({order: [['id', 'desc']]})
}

// 게시글 쓰기
const create = ({ title, content, author }) => {
  return Post.create({title, content, author})
}

// 상세
const get = (id) => {
  return Post.findByPk(id);
}

// 수정
const update = async (id, fields) => {
  const post = await Post.findByPk(id);
  if(!post) return null; // 없으면 컨트롤러가 404 처리
  if (fields.title !== undefined) post.title = fields.title;
  if (fields.content !== undefined) post.content = fields.content;
  if(fields.author !== undefined && fields.author) post.author = fields.author;

  await post.save();
  return post;
}

// 삭제
const remove = async (id) => {
  const post = await Post.findByPk(id);
  if(!post) return null; // 없으면 컨트롤러가 404 처리
  await post.destroy();
  return post;
}

module.exports = {list, create, get, update, remove};