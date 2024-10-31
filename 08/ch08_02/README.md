1.
npm init -y

2.
npm i express nodemon sequelize sequelize-cli sqlite3
--> package.json에 아래 구문 추가됨
  "dependencies": {
    "express": "^4.21.1",
    "nodemon": "^3.1.7",
    "sequelize": "^6.37.5",
    "sequelize-cli": "^6.6.2",
    "sqlite3": "^5.1.7"
  }
--> sequelize-cli : cli Command Line Interface

3.
npx sequelize-cli init  
--> config, migration 등 디렉토리 생성
--> config>config.json : development 내용 수정
"development": {
    "dialect": "sqlite",
    "storage": "post.db"
  },
  --> seeders : 더미데이터

4. 보류
npx sequelize-cli db:

5.
models>post.js 생성
post table에 대한 스키마등록

6. 
ch08_02>app.js 생성
npx nodemon app.js 으로 실행
--> ch08_02폴더에 post.db객체 생성 및 post.js에 기술한 형태로 posts table 생성