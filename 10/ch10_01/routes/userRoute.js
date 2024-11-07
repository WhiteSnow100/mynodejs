const express = require('express');
const userController = require('../controllers/userController');
const { check } = require(`express-validator`); // validator

const router = express.Router();

router.get('/', userController.findAll);  // app.get("/users", (req, res) => {})
// findAll() : 실행과 동시에 호출
// findAll : 등록만

// router.post('/', userController.createUser);   //app.post("/usrs", (req, res) => {})
router.post('/', [
    check(`name`).notEmpty().withMessage("Name is required"),
    check(`email`).notEmpty().withMessage("Email is required").isEmail().withMessage("invalid email format")
 ], userController.createUser);
 // check된 에러는 userController.createUser로 전달된다.

module.exports = router;
