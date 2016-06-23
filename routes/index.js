var express = require('express');
var router = express.Router();

var crypto=require("crypto")
var db=require('../modules/db')
var User=require("../modules/user")
var Post=require("../modules/post")//发布文章

/* GET home page. */
router.get('/', function(req, res, next) {
  	Post.find({/*name:user.name*/},function(err,posts){
	  	if (err) {
  				req.flash("error",err)
  				return res.redirect("/")
  			}
  			res.render("index",{
  				title:"Home",
  				posts:posts
  			})
 	})
});
//user
router.get('/u/:username', function(req, res, next) {
  	User.findOne({name:req.params.username},function(err,user){
  		if (!user) {
  			req.flash("error",err)
  			return res.redirect("/")
  		}

  		Post.find({/*name:user.name*/},function(err,posts){
  			if (err) {
  				req.flash("error",err)
  				return res.redirect("/")
  			}
  			res.render("user",{
  				title:user.name,
  				posts:posts
  			})
  		})
  	})
});
//post something 先检查是否登陆
router.post("/post",checkLogin)
router.post("/post",function(req, res, next){
	var currentUser=req.session.user;
	var post=new Post({
		user:currentUser.name,
		post:req.body.article,
		update:getTime(new Date())
	})
	post.save(function(err){
		if(err){
			req.flash("error",err.message)
			return res.redirect("/")
		}
		req.flash('success','发布成功')
		res.redirect("/u/"+currentUser.name)
	})

})

function getTime(date){
	var year=date.getFullYear();
	var month=parseInt(date.getMonth(),10)+1;
	var dat=date.getDate();
	var hour=date.getHours();
	var min=date.getMinutes();
    return year+"-"+month+"-"+dat+" "+hour+":"+min;
}
//register check 检查是否注册
router.get("/reg",checkNotLogin)
router.get("/reg",function(req, res, next){
	res.render("reg",{title:"用户注册"})
});

router.post("/reg",checkNotLogin)
router.post("/reg",function(req,res,next){
	if(req.body["password-repeat"]!=req.body["password"]){
		req.flash("error","两次密码不一致")
		return res.redirect("/reg")
	}

	var md5=crypto.createHash("md5");
	var password=md5.update(req.body.password).digest("base64")

	var newUser=new User({
		name:req.body["username"],
		password:password
	})

	User.findOne({name:newUser.name},function(err,user){
		if(user){
			req.flash("error","用户已存在")
			return res.redirect("/reg")
		}
		if (err) {
			req.flash("error",err)
			return res.redirect("/reg")
		}
		newUser.save(function(err){
			if (err) {
				req.flash("error",err.message)
				return  res.redirect('/reg')
			}

			req.session.user=newUser;
			req.flash("success","注册成功")
			res.redirect("/")
		})	
	})
})
//user log in check whether 是否登陆
router.get("/login",checkNotLogin);
router.get("/login",function(req,res,next){
	res.render("login",{title:"用户登录"})

})

router.post("/login",checkNotLogin)
router.post("/login",function(req,res,next){
	var md5=crypto.createHash("md5");
	var password=md5.update(req.body.password).digest("base64")

	User.findOne({name:req.body.username},function(err,user){
		if(!user){
			req.flash("error","用户不存在")
			return res.redirect("/login")
		}
		if(user.password!=password){
			req.flash("error","密码错误")
			return res.redirect("/login")
		}
		req.session.user=user;
		req.flash("success","登录成功");
		res.redirect("/")
	})	
})
//user log out checked login 
router.get("/logout",checkLogin)
router.get("/logout",function(req,res,next){
	req.flash("error","已登出")
	req.session.user=null;
	res.redirect("/")
});

function checkLogin(req,res,next){
	if(!req.session.user){
		req.flash("error","未登录")
		return res.redirect("/login")
	}
	next()	
}

function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash("error","已登录")
		return res.redirect("/")
	}
	next()	
}
module.exports = router;
