// import 하지 말것 : 아래라인과 연결
// models>index.js : const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true   // postgesql은 serial 이나 sequel에서 자동으로 변환해줌
        },
        email: {
            type: DataTypes.STRING,  // postgesql은 기본 varchar(255)로 생성됨
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING      
    }, {
        tableName: "users"
    });
    return User;
}

// 
// create table users (
//     id integer primary key autoincrement,
//     eamil varchar,
//     password varchar,
//     name varchar,
//     address varchar
// )