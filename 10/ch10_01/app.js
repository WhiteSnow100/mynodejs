const express = require("express");
const fs = require("fs");
const path = require("path");
// import router from toutes
const userRoute = require('./routes/userRoute');

const models = require(`./models`); // models/index.js 호출
// models <= db
const app = express();
const PORT = 3000;

app.use(express.json());

// use router
app.use('/users', userRoute);  // userRoute는 /users와 맵핑
// app.use('/posts', postRoute);  
// app.use('/products', productRoute); 

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    models.sequelize.sync({force:false}) // 모델을 테이블로 생성 force: false 면 if not exists 와 같다
    // 물리적인 models(db) 생성
    .then(() => {  // 모델생성 성공시, db 객체 연결 성고시
        console.log(`db connected`);
    }).catch((err) => {  // 모델생성 실패시, db 객체 연결 실패시
        console.error(`db connected error : ${err}`);
        process.exit();
    })
})

// npx nodemon app.js 으로 실행