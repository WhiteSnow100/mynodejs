// Data Access Object for User
const models = require(`../models`); // models/index.js db==> models 담김

const findAll = async () => {
    return await models.User.findAll();
    // select * from users
}

const createUser = async (userData) => {
    // validate check
    return await models.User.create(userData);
}

const findUserByEmail = async (email) => {
    return await models.User.findOne({
        where : {email: email}
    }); // select * from users where email = ?
}

// 외부에서 user 사용할 수 있게
module.exports = {
    findAll,
    createUser,
    findUserByEmail
}