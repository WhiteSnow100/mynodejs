const postService = require(`../services/postService`); 
// const models = require(`../models`);   //단계를 단순화할때 사용
const { validationResult } = require(`express-validator`);

const createPost = async (req, res) => {
    try{
        const { title, content } = req.body;
        const user = req.user;
        const post = await postService.createPost({
            title: title,
            content: content,
            UserId: user.id
        });
        // const errors = validationResult(req);  
        // if(!errors.isEmpty()) {
        //     return res.status(400).json({error: errors.array().map(e=>e.msg)});
        // }
        // const post = await postService.createPost(req.body);
        res.status(201).json({message: 'ok', data:post});  //생성성공은 201
    }catch(e){
        res.status(500).json({message: 'error', data:e.message});
    }
}

const findPostById = async (req, res) => {
    try{
        const post = await postService.findPostById(req.params.id);
        res.status(201).json({message: 'ok', data: post});  //생성성공은 201
    }catch(e){
        res.status(500).json({message: 'error', data: e.message});
    }
}

const findAll = async (req, res) => {
    try{
        const posts = await postService.findAll();
        res.status(200).json({message: 'ok', data: posts});
    }catch(e){
        res.status(500).json({message: 'error', data: e.message});
    }
}

const updatePost = async (req, res) => {
    try{
        const errors = validationResult(req);  
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array().map(e=>e.msg)});
        }        
        const post = await postService.updatePost(req.params.id, req.body);
        res.status(200).json({message: 'ok', data: post});
    }catch(e){
        res.status(500).json({message: 'error', data: e.message});
    }
}

const deletePost = async (req, res) => {
    try{
        const post = await postService.deletePost(req.params.id);
        res.status(200).json({message: 'ok', data: ''});
    }catch(e){
        res.status(500).json({message: 'error', data: e.message});
    }
}

module.exports = {
    createPost,
    findPostById,
    findAll,
    updatePost,
    deletePost
}