var mongodb = require('./db');

class User{
    constructor(user){
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
    }

    // 保存用户
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
        mongodb.open(function(err, db){
            if(err){
                return callback(err);
            }
            db.collection('users',function(err,collection){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                collection.insert(user,{
                    safe:true
                },function(err,user){
                    mongodb.close()
                    if(err){
                        return callback(err);
                    }
                    callback(null,user[0]);
                })
            })
        })
    }

    // 根据姓名查询用户
    static get(name,callback){
        mongodb.open(function(err,db){
            if(err){
                return callback(err);
            }
            db.collection('users',function(err,collection){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                collection.findOne({
                    name:name
                },function(err,user){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null,user);
                })
            })
        })
    }
}
module.exports = User;

