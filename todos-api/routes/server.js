var express = require('express');
var router = express.Router();

var userController = require('../controller/user');

// 注册
router.post('/reg',userController.reg);

module.exports = router;
