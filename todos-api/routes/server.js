var express = require('express');
var router = express.Router();

var userController = require('../controller/user');
var todoController = require('../controller/todo');

router.all('*', function (req, res, next) {
    let allowOrigins = ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://47.104.96.164'];
    if(allowOrigins.indexOf(req.headers.origin) === -1){
        next();
        return;
    }
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }else {
        next();
    }
});

// 获取登录人信息
router.post('/getUserInfo', userController.isLogin, userController.getUserInfo);
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
