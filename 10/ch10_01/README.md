# postgresql
# json web token

10>ch10_01>
npm init -y #프로젝트 생성
npm i express nodemon pg sequelize sequelize-clinp
npm i jest
npx sequelize-cli init

controllers 폴더 생성
dao 폴더 생성 : data access object
services 폴더 생성 : 복잡한 비지니스로직 담는곳
routes 폴더 생성

create table users (
    id integer primary key autoincrement,
    eamil varchar,
    password varchar,
    name varchar,
    address varchar 
)

레이어드 아키텍쳐