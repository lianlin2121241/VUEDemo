var ObjectID = require('mongodb').ObjectID;
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
 * 修改密码
 * @param {*} req 
 * @param {*} res 
 */
module.exports.changePassword = (req, res) => {
    var oldPassword = req.body.oldPassword,
        newPassword = req.body.newPassword;
    let user = req.session.user
    let id = user._id;
    let name = user.name;
    userModel.get(name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        var md5 = crypto.createHash('md5');
        password = md5.update(oldPassword).digest('hex');
        if (password !== user[0].password) {
            return res.json(utils.resultData(false, null, '旧密码错误'));
        }
        var md52 = crypto.createHash('md5');
        password2 = md52.update(newPassword).digest('hex');
        var newUser = new userModel({
            name: name,
            password: password2
        })
        newUser.updateByContent({ _id: ObjectID(id) },{
            password: password2
        },function (err, result) {
            if (err) {
                req.flash('error', err);
                return res.json(utils.resultData(false, null, err.message));
            }
            if(result===1){
                req.flash('success', '修改密码成功');
                res.json(utils.resultData(true));
            }else{
                req.flash('error', '失败');
                res.json(utils.resultData(false, '', '修改密码失败'));
            }
        })
    })
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
        res.status(401);
        return res.json(utils.resultData(false, '', '用户未登录'));
    }
    next();
}

/**
 * 获取登录用户的信息
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getUserInfo = (req, res) => {
    let user = req.session.user;
    res.json(utils.resultData(true, user, '获取信息成功'));
}

