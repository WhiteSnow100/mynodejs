// Data Access Object for Post
const models = require(`../models`); // models/index.js db==> models 담김

const findAll = async () => {
    return await models.Post.findAll();
    // select * from posts
}

// 외부에서 post 사용할 수 있게
module.exports = {
    findAll,
}