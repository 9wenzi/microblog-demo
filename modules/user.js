var mongoose=require('./db').mongoose;
var schema=new mongoose.Schema({
    name:'string',
    password:'string'
});
var User=mongoose.model('User',schema);
module.exports=User;






/*var mongodb=require("./db");

function User(user) {
	this.name=user.name;
	this.password=user.password
}


User.prototype.save=function save(callback){
	var user={
		name:this.name,
		password:this.password
	}
	mongodb.open(function(err,db){
		if (err) {
			return callback(err)
		}
		db.collection("users",function(err,collection){
			if (err) {
				mongodb.close();
				callback(err)
			}

			collection.ensureIndex("name",{unique:true});

			collection.insert(user,{safe:true},function(err,user){
				mongodb.close();
				callback(err,user)
			})
		})
	})
};



//User对象方法：从数据库中查找指定用户的信息
User.get = function get(username, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //从users集合中查找name属性为username的记录
            collection.findOne({name: username}, function(err, doc) {
                mongodb.close();
                if (doc) {
                    //封装查询结果为User对象
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};


module.exports=User;*/