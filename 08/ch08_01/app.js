const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({  // new Sequelize 객체 생성 - db 모델 마다 다름
    dialect: `sqlite`,  // sqlite3 use
    storage: 'post.db'   // data file name
});

// 모델만들기 User - username varchar(100) not null, email varchar(100)
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(100),
        allownull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allownull: true
    }
});

// 즉시 실행 비동기 함수 : 코드실행시 비동기로 실행
(async() => {
    // awaite를 사용하기 위해서 즉시 실행 함수를 정의합니다.
    // 실제 모델을 생성, 데이터를 가져오는 연습은 여기에서 합니다.
    await sequelize.sync({force: false});  // false 일 경우는 if exists, true일경우 기존 생성된 경우 오류발생
    
    // const user1 = await User.create({  // 1개만 들어감.
    //     username: "user01",
    //     email: `user01@naver.com`
    // },
    // {
    //     username: "user02",
    //     email: `user02@naver.com`
    // });
    // console.log(`user created => ${JSON.stringify(user1)}`);

    // bulkCreate([{},{}])
    // const users = await User.bulkCreate( // multil insert
    //     [
    //         {username: "user02",email: `user02@naver.com`},
    //         {username: "user03",email: `user03@naver.com`},
    //         {username: "user04",email: `user04@naver.com`}
    //     ]
    // );
    // console.log(`user multi insert => ${JSON.stringify(users)}`);

    // const users = await User.findAll(); // select * from Users;
    // // console.log(users);
    // users.forEach(user => {
    //      console.log(`id : ${user.id}, username : ${user.username}, email : ${user.email}, createdAt : ${user.createdAt}`);
    // });

    // await User.update({
    //     email: `user01@yahoo.com`
    // }, {
    //     where : {
    //         username: "user01",
    //         id: 2
    //     }
    // });

    // const user = await User.findOne({
    //     where : {
    //         username: "user01",
    //         id : 2  // and 조건으로
    //     }
    // });    
    // console.log(`user02 => ${JSON.stringify(user)}`);

    const result = await User.destroy({
        where : {
            username: `user01`
        }
    });
    console.log(result);

})();