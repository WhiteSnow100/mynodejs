const express = require('express');
const postController = require('../controllers/postController');
const { check } = require(`express-validator`); // validator
const { authenticate } = require(`../middleware/auth_middleware`);

const router = express.Router();

router.get('/', postController.findAll);  // app.get("/posts", (req, res) => {})
// findAll() : 실행과 동시에 호출
// findAll : 등록만
router.get('/:id', postController.findPostById); 
router.post('/', authenticate, postController.createPost); 
// router.post('/', postController.createPost);   //app.post("/posts", (req, res) => {})
// router.post('/', [
//     check(`UserId`).notEmpty().withMessage("UserId is required"),
//     check(`title`).notEmpty().withMessage("title is required"),
//     check(`content`).notEmpty().withMessage("content is required")
//  ], postController.createPost);
 // check된 에러는 postController.createPost로 전달된다.

 router.put('/:id', [
    check(`title`).notEmpty().withMessage("title is required"),
    check(`content`).notEmpty().withMessage("content is required")   
 ], postController.updatePost); 

 router.delete('/:id', postController.deletePost); 

module.exports = router;
