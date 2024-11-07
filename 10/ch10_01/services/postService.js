// post와 관련된 주요 비지니스로직
const postDao = require(`../dao/postDao`);

const createPost = async (postData) => {
    return await postDao.createPost(postData);
}

const findPostById = async (id) => {
    // complex biz logic
    return await postDao.findPostById(id);
}

const findAll = async () => {
    // complex biz logic
    return await postDao.findAll();
}

const updatePost = async (id, data) => {
    return await postDao.updatePost(id, data);
}

const deletePost = async (id) => {
    return await postDao.deletePost(id);
}

module.exports = {
    createPost,
    findPostById,
    findAll,
    updatePost,
    deletePost
}