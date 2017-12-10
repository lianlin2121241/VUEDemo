/**
 * @file db服务
 * @author limingle
 * @copyright Synway SFE
 * @createDate 2017-12-09 09:40:11
 */

// 公共设置
var Settings = require('../settings');
// 这个模块里面封装了所有对数据库的常用操作
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://' + Settings.host;

/**
 * @desc 连接数据库
 * @param {function} callback 回调函数
 */
function _connectDB(callback) {
    //连接数据库
    MongoClient.connect(dburl, function (err, mc) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, mc);
    });
}

/**
 * @desc 插入数据
 * @param {string} collectionName 集合名
 * @param {object} json 存储对象
 * @param {function} callback 回调函数
 */
exports.insertOne = function (collectionName, json, callback) {
    _connectDB(function (err, mc) {
        var db = mc.db(Settings.db);
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result.ops);
            mc.close(); //关闭数据库
        })
    })
};

/**
 * @desc 查询数据
 * @param {string} collectionName 集合名称
 * @param {object} json 查询条件
 * @param {function or object} C 回调函数或者过滤对象
 * 例如：
 *  {
 *      "pageamount":10, 每页条数
 *      "page":10, 第几页
 *      "sort":{} 排序
 *  }
 * @param {undefind or function} D 不传或者回调函数
 */
exports.find = function (collectionName, json, C, D) {
    var result = [];    //结果数组
    if (arguments.length == 3) {
        //那么参数C就是callback，参数D没有传。
        var callback = C;
        var skipnumber = 0;
        //数目限制
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        //args是个对象，里面有sort，pageamount,page属性
        //应该省略的条数
        var skipnumber = args.pageamount * args.page || 0;
        //数目限制
        var limit = args.pageamount || 0;
        //排序方式
        var sort = args.sort || {};
    } else {
        throw new Error("find函数的参数个数，必须是3个，或者4个。");
        return;
    }

    //连接数据库，连接之后查找所有
    _connectDB(function (err, mc) {
        var db = mc.db(Settings.db);
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                mc.close(); //关闭数据库
                return;
            }
            if (doc != null) {
                result.push(doc);   //放入结果数组
            } else {
                //遍历结束，没有更多的文档了
                callback(null, result);
                mc.close(); //关闭数据库
            }
        });
    });
}

/**
 * @desc 根据条件删除数据
 * @param {string} collectionName 集合名称
 * @param {object} json 查询条件
 * @param {function} callback 回调函数
 */
exports.deleteMany = function (collectionName, json, callback) {
    _connectDB(function (err, mc) {
        var db = mc.db(Settings.db);
        //删除
        db.collection(collectionName).deleteMany(
            json,
            function (err, results) {
                callback(err, results);
                mc.close(); //关闭数据库
            }
        );
    });
}

/**
 * @desc 更新数据
 * @param {string} collectionName 集合名称
 * @param {object} json1 查询条件
 * @param {object} json2 要修改的数据
 * 例如：
 *  {$set: {b: 1}}
 * @param {function} callback 回调函数
 */
exports.updateMany = function (collectionName, json1, json2, callback) {
    _connectDB(function (err, mc) {
        var db = mc.db(Settings.db);
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function (err, results) {
                callback(err, results.result.ok);
                mc.close();
            });
    })
}