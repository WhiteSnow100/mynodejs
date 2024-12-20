'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');  // class
const process = require('process');
const basename = path.basename(__filename);  // models 디렉토리
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; // env:development
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)  //현재디렉토리 모두 읽기
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {  // post.js, comment.js 파일을 읽어서 model생성
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    // db['Post'] = Post
    // db['Comment'] = Comment
  });

// [ 'Post','Comment']
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;  // 객체 매서드, 변수 또는 상수
db.Sequelize = Sequelize;  // 클래스 매서드

module.exports = db;  // db 자체를 export
