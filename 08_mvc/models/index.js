const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../board.db'),
  logging: false
})

// post.js의 함수를 호출하면서 위의 sequelize를 넣음
const Post = require('./post')(sequelize);

module.exports = {sequelize, Post}