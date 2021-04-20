var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var addNewCateRouter = require('./routes/add-new-category');
var ViewPassCateRouter = require('./routes/passwordCategory');
var addNewPassRouter = require('./routes/add-new-password');
var viewAllPassRouter = require('./routes/view-all-password');
var passwordDetailsRouter = require('./routes/password-detail');
var usersRouter = require('./routes/users');
var joinRouter = require('./routes/join');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add-new-category', addNewCateRouter);
app.use('/passwordCategory', ViewPassCateRouter);
app.use('/add-new-password', addNewPassRouter);
app.use('/view-all-password', viewAllPassRouter);
app.use('/password-detail', passwordDetailsRouter);
app.use('/users', usersRouter);
app.use('/joinResult', joinRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;












var express = require('express');
var router = express.Router();
var studentUserModule=require('../../modules/studentUser');
var classModule=require('../../modules/class');


var bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');

/* GET home page. */




router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  
    
      res.render('studentUserLogin', { title: 'Password Management System', msg:'' });
    
  
});


router.post('/', function(req, res, next) {
  var teacher_id=req.body.teacher_id;
  var class_name=req.body.class_name;
  var student_name=req.body.student_name;
  var password=req.body.password;
  var checkUser=studentUserModule.findOne({student_name:student_name});
  checkUser.exec((err, data)=>{
  var cls_name =data.class_name;
  var std_name = data.student_name;
  
   if(data==null){

    res.send('new2');

  }else if(class_name==cls_name){ 
    if(err) throw err;
    var getPassword=data.password;
    if(bcrypt.compareSync(password,getPassword)){ 
      res.redirect('/getClass/'+teacher_id);
    }else{
     
     res.send('new'); 

    }
   }else{
    
    res.send('new1');

   }
  });
});





/*router.post('/', function(req, res, next) {
  var teacher_id=req.body.teacher_id;
  var class_name=req.body.class_name;
  var student_name=req.body.student_name;
  var password=req.body.password;
  var checkUser=studentUserModule.findOne({student_name:student_name});
  checkUser.exec((err, data)=>{
   if(data==null){
    res.render('studentUserLogin', { title: 'Password Management System', msg:"Invalid Student User Name." });

   }else{
if(err) throw err;
var getPassword=data.password;
if(bcrypt.compareSync(password,getPassword)){ 
  
  res.redirect('/getClass/'+teacher_id);
}else{
  res.render('studentUserLogin', { title: 'Password Management System', msg:"Invalid Password." });

}
   }
  });
 
});*/




/*router.get('/getClass/:id',checkLoginUserss, function(req, res, next) {
  var loginUserss=localStoragess.getItem('loginUserss');
    var id = req.params.id;
    var getClass=classModule.findOne({teacher_id:id});
    getClass.exec(function(err,data){
      
    console.log(data.class_name); 
      if(err) throw err;
     res.render('getClass', { title: 'Get Class' ,records:data,loginUserss:loginUserss});
  
    });
  });*/







router.get('/logoutss', function(req, res, next) {
  localStoragess.removeItem('userTokenss');
  localStoragess.removeItem('loginUserss');
  res.redirect('/');
});

module.exports = router;

