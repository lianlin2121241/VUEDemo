var express = require('express');
var router = express.Router();

var userController = require('../controller/user');

// 注册
router.post('/reg',userController.reg);
// 登录
router.post('/login',userController.login);

module.exports = router;
