var mongodb = require('./db');

/**
 * @class
 * @classdesc 用户信息model类
 * @desc 初始化用户实例
 */
class User{
    constructor(user){
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
    }

    /**
     * @desc 保存用户
     * @param {function} callback 回调函数
     */
    save(callback){
        let user = {
            name: this.name,
            password: this.password,
            email: this.email,
            meta:{
                createTime: new Date(),
                updateTime: 0
            }
        };
        mongodb.insertOne("users",user,function(err,user){
            if(err){
                return callback(err);
            }
            callback(null,user[0]);
        })
    }

    /**
     * @static
     * @desc 根据姓名查询用户
     * @param {string} name 用户名称
     * @param {function} callback 回调函数
     */
    static get(name,callback){
        mongodb.find("users",{
            name:name
        },function(err,user){
            if(err){
                return callback(err);
            }
            callback(null,user);
        })
    }
}
module.exports = User;

