var ObjectID = require('mongodb').ObjectID;
var todoModel = require('../models/todo');
var utils = require('../utils');

/**
 * @desc 添加任务
 * @param {object} req 
 * @param {object} res 
 */
module.exports.addTodo = (req, res) => {
    var label = req.body.label
    var newTodo = new todoModel({
        label: label
    })
    var user = req.session.user;
    if (!user) {
        req.flash('error', '用户未登录');
        return res.json(utils.resultData(false, '', '用户未登录'));
    }
    newTodo.save(user, function (err, todo) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        req.flash('success', '添加任务成功');
        res.json(utils.resultData(true, todo));
    })
}

/**
 * @desc 更新任务
 * @param {object} req 
 * @param {object} res 
 */
module.exports.updateTodo = (req, res) => {
    var id = req.body.id;
    var label = req.body.label;

    todoModel.get({
        _id: ObjectID(id)
    }, function (err, todos) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        if (!todos || todos.length === 0) {
            req.flash('error', '无此任务');
            return res.json(utils.resultData(false, null, '无此任务'));
        }
        var newTodo = new todoModel({
            label: label
        })
        newTodo.update({ _id: ObjectID(id) }, function (err, result) {
            if (err) {
                req.flash('error', err);
                return res.json(utils.resultData(false, null, err.message));
            }
            if(result===1){
                req.flash('success', '修改成功');
                res.json(utils.resultData(true));
            }else{
                req.flash('error', '修改失败');
                res.json(utils.resultData(false, '','修改失败'));
            }
        })
    })
}