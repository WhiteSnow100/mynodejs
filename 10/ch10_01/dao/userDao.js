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

// 외부에서 user 사용할 수 있게
module.exports = {
    findAll,
    createUser,
}