var crypto = require('crypto');
var userModel = require('../models/user');
var utils = require('../utils');

//注册
module.exports.reg = (req, res)=>{
    var name = req.body.name,
        password = req.body.password
        email = req.body.email;
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');
    var newUser = new userModel({
        name: name,
        password: password,
        email: email
    })

    userModel.get(name,function(err,user){
        if(err){
            req.flash('error',err);
            return res.json(utils.resultData(false,null,err.message));
        }
        newUser.save(function(err,user){
            if(err){
                req.flash('error', err);
                return res.json(utils.resultData(false,null,err.message));
            }
            req.session.user = user;
            req.flash('success','注册成功');
            res.json(utils.resultData(true,user));
        })
    })
}