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