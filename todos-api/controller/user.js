var crypto = require('crypto');
var userModel = require('../models/user');
var utils = require('../utils');

/**
 * @desc 用户注册
 * @param {object} req 
 * @param {object} res 
 */
module.exports.reg = (req, res) => {
    var name = req.body.name,
        password = req.body.password
    email = req.body.email;
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    var newUser = new userModel({
        name: name,
        password: password,
        email: email
    })

    userModel.get(name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        if (user && user.length > 0) {
            req.flash('error', '该用户名已被注册');
            return res.json(utils.resultData(false, null, '该用户名已被注册'));
        }
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.json(utils.resultData(false, null, err.message));
            }
            req.session.user = user;
            req.flash('success', '注册成功');
            res.json(utils.resultData(true, user));
        })
    })
}

/**
 * @desc 用户登录
 * @param {*} req 
 * @param {*} res 
 */
module.exports.login = (req, res) => {
    var name = req.body.name,
        password = req.body.password;
    userModel.get(name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        if (!user || user.length === 0) {
            return res.json(utils.resultData(false, null, '用户名或密码错误'));
        }
        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
        if (password !== user[0].password) {
            return res.json(utils.resultData(false, null, '用户名或密码错误'));
        }
        req.session.user = user[0];
        req.flash('success', '登录成功');
        res.json(utils.resultData(true, user[0], '登录成功'));
    })
}

/**
 * 用户登出
 * @param {*} req 
 * @param {*} res 
 */
module.exports.logout = (req, res) => {
    try {
        req.session.user = null;
        req.flash('success', '退出成功');
        res.json(utils.resultData(true, req.session.user, '退出成功'));
    } catch (e) {
        req.flash('error', e.message);
        res.json(utils.resultData(false, null, e.message));
    }
}

/**
 * 是否登录
 * @param {*} req 
 * @param {*} res 
 */
module.exports.isLogin = (req, res, next) => {
    let user = req.session.user;
    if (!user) {
        req.flash('error', '用户未登录');
        return res.json(utils.resultData(false, '', '用户未登录'));
    }
    next();
}