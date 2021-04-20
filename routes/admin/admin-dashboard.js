var express = require('express');
var router = express.Router();
var adminUserModule=require('../../modules/adminUser');
var teacherModule=require('../../modules/teacher');
var getTeacher= teacherModule.find({});

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));





function checkUsername(req,res,next){
  var uname=req.body.uname;
  var checkexitemail=adminUserModule.findOne({username:uname});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('signup', { title: 'Password Management System', msg:'Username Already Exit' });

 }
 next();
  });
}

function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=adminUserModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('signup', { title: 'Password Management System', msg:'Email Already Exit' });

 }
 next();
  });
}
router.get('/',function(req, res, next) {
 
  getTeacher.exec(function(err,data){
    if(err) throw err;
    res.render('admin-dashboard', { title: 'TechBista Solutions',msg:'',records:data });
  });
});


  module.exports = router;