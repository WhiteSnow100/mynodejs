// Data Access Object for Post
const models = require(`../models`); // models/index.js db==> models 담김

// insert
const createPost = async (data) => {
    return await models.Post.create(data);
}

// pk로 데이터 읽기
const findPostById = async (id) => {
    return await models.Post.findByPk(id, {
        include: {model: models.User}  // user table join
    });
}

// 전체데이터 읽기
const findAll = async () => {
    return await models.Post.findAll({
        include: {model: models.User}
    });
    // select * from posts
}

// id기준으로 update
const updatePost = async (id, data) => {
    return await models.Post.update(data, {
        where: {id}
    });
}

const deletePost = async (id) => {
    return await models.Post.destroy({
        where: {id}
    });
}

// 외부에서 post 사용할 수 있게
module.exports = {
    createPost,
    findPostById,
    findAll, 
    updatePost,
    deletePost
}