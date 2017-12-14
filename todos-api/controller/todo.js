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
                req.flash('error', '失败');
                res.json(utils.resultData(false, '','修改失败'));
            }
        })
    })
}

/**
 * @desc 获取待完成任务列表
 * @param {object} req 
 * @param {object} res 
 */
module.exports.getTodosUnfinished = (req, res) => {
    var currentPage = req.body.currentPage||0;
    var pageSize = req.body.pageSize||0;

    var user=req.session.user;
    todoModel.get({
        "user._id":user._id,
        "isDelete":false,
        "isOver":false
    },{
        currentPage: currentPage,
        pageSize: pageSize,
        sort:{'sort':1}
    }, function (err, todos) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        req.flash('success', '查询成功');
        res.json(utils.resultData(true,todos));
    })
}

/**
 * @desc 更新任务排序
 * @param {object} req 
 * @param {object} res 
 */
module.exports.updateSort = (req, res) => {
    var sorts = req.body.sorts||[];
    if(sorts.length==0){
        return res.json(utils.resultData(false, null, "无可排序数据"));
    }

    var user=req.session.user;

    let sortsLen=sorts.length;
    let updateCount=0;
    for(let i=0;i<sortsLen;i++){
        (function(index){
            var newTodo = new todoModel()
            newTodo.updateByContent({ _id: ObjectID(sorts[index]) },{
                "sort":index
            }, function (err, result) {
                if (err) {
                    req.flash('error', err);
                    return res.json(utils.resultData(false, null, err.message));
                }
                if(result===1){
                    updateCount++;
                    if(updateCount===sortsLen){
                        req.flash('success', '修改成功');
                        res.json(utils.resultData(true));
                    }
                }else{
                    req.flash('error', '失败');
                    res.json(utils.resultData(false, '','修改失败'));
                }
            })
        })(i)
    }
}