// var settings=require("../settings");
// var Db=require("../node_modules/mongodb").Db;
// var Connection=require("../node_modules/mongodb").Connection;
// var Server=require("../node_modules/mongodb").Server;

// module.exports=new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT,{}))

// var settings = require('../settings'),
//     Db = require('../node_modules/mongodb').Db,
// 	Connection = require('../node_modules/mongodb').Connection,
// 	Server = require('../node_modules/mongodb').Server;
// module.exports = new Db(settings.db,new Server(settings.host,27017,{}),{safe:true})

// var settings=require("./settings");
// var mongoose=require('mongoose');
// mongoose.connect("mongodb://"+settings.ip+"/"+settings.db);
// var db=mongoose.connection;
// module.exports={
//     "dbCon":db,
//     "mongoose":mongoose
// };

var settings=require("../settings");
var mongoose=require("../node_modules/mongoose");
mongoose.connect("mongodb://"+settings.ip+"/"+settings.db);
var db=mongoose.connection;
module.exports={
	"dbCon":db,
	"mongoose":mongoose
}