const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.findAll);  // app.get("/users", (req, res) => {})
// findAll() : 실행과 동시에 호출
// findAll : 등록만

router.post('/', userController.createUser);   //app.post("/usrs", (req, res) => {})

module.exports = router;
