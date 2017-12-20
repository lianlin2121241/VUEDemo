var express = require('express');
var router = express.Router();

var userController = require('../controller/user');
var todoController = require('../controller/todo');

// 注册
router.post('/reg', userController.reg);
// 登录
router.post('/login', userController.login);
// 登出
router.post('/logout', userController.logout);

// 添加任务
router.post('/addTodo', userController.isLogin, todoController.addTodo);
// 修改任务
router.post('/updateTodo', userController.isLogin, todoController.updateTodo);
// 获取待完成任务列表
router.post('/getTodosUnfinished', userController.isLogin, todoController.getTodosUnfinished);
// 获取已完成任务列表
router.post('/getTodosFinished', userController.isLogin, todoController.getTodosFinished);
// 排序任务列表
router.post('/updateSort', userController.isLogin, todoController.updateSort);
// 完成任务
router.post('/finishTodos', userController.isLogin, todoController.finishTodos);
// 删除任务
router.post('/deleteTodos', userController.isLogin, todoController.deleteTodos);

module.exports = router;
