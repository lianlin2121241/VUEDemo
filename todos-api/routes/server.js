var express = require('express');
var router = express.Router();

var userController = require('../controller/user');
var todoController = require('../controller/todo');

// 注册
router.post('/reg',userController.reg);
// 登录
router.post('/login',userController.login);
// 登出
router.post('/logout',userController.logout);

// 添加任务
router.post('/addTodo',todoController.addTodo);

module.exports = router;
