var mongodb = require('./db');

/**
 * @class
 * @classdesc 任务信息model类
 * @desc 初始化任务信息
 */
class Todo {
    constructor(todo) {
        this.label = todo.label;
    }

    /**
     * @desc 保存todo任务
     * @param {object} user 编辑用户
     * @param {function} callback 回调函数
     */
    save(user, callback) {
        let todo = {
            label: this.label,
            isDelete: false,
            isOver: false,
            user: user,
            meta: {
                createTime: new Date(),
                updateTime: 0,
                overTime: 0,
                deleteTime: 0
            }
        };
        mongodb.insertOne("todos", todo, function (err, todo) {
            if (err) {
                return callback(err);
            }
            callback(null, todo[0]);
        })
    }

    /**
     * @desc 更新todo任务
     * @param {object} params 查询条件
     * @param {function} callback 回调函数
     */
    update(params = null, callback) {
        if (!params) {
            callback(new Error('缺少参数'))
        }
        mongodb.updateMany("todos", params, {
            $set: {
                "label": this.label,
                "meta.update":new Date() 
            }
        }, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    }

    /**
     * @static
     * @desc 根据条件查询todo列表
     * @param {string} name 用户名称
     * @param {function} callback 回调函数
     */
    static get(params = {}, callback) {
        mongodb.find("todos", params, function (err, todo) {
            if (err) {
                return callback(err);
            }
            callback(null, todo);
        })
    }
}
module.exports = Todo;

