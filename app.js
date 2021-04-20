
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var teacherRouter = require('./routes/admin/teacher/teacher');

var adminPanelRouter = require('./routes/admin/admin-panel');
var adminClassTeacherRouter = require('./routes/admin/classTeacher/classTeacher');

var totalAdminClassRouter = require('./routes/admin/totalAdminClass/totalAdminClass'); 
var adminTotalClassListRouter = require('./routes/admin/totalAdminClass/totalAdminClassList');

var adminDashboardRouter = require('./routes/admin/admin-dashboard');
var adminTeacherListRouter = require('./routes/admin/teacher/teacherList');
var adminStudentListRouter = require('./routes/admin/student/studentList');

var studentUserRouter = require('./routes/admin/student/studentUser');
var teacherAdminPanelRouter = require('./routes/adminTeacher/teacher-admin-panel');
var teacherAdminDashboardRouter = require('./routes/adminTeacher/teacher-admin-dashboard');
var getStudentUserRouter = require('./routes/studentUser/getStudentUser');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret:'~K]d9@5LEpD}t267',
  resave:false,
  saveUninitialized:true,
}));

app.get('/room/:id', (req, res) => {
  var abcd = req.params.id;
  res.redirect('/'+abcd) 
  app.get('/:id',function(req, res, next) {
    res.render('room', {roomId: req.params.id});
  });
}); 

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/teacher', teacherRouter);

app.use('/admin-panel', adminPanelRouter);
app.use('/classTeacher', adminClassTeacherRouter);

app.use('/totalAdminClass', totalAdminClassRouter);
app.use('/totalAdminClassList', adminTotalClassListRouter);

app.use('/teacherList', adminTeacherListRouter);
app.use('/studentList', adminStudentListRouter);

app.use('/studentUser', studentUserRouter);
app.use('/admin-dashboard', adminDashboardRouter);
app.use('/teacher-admin-panel', teacherAdminPanelRouter);
app.use('/teacher-admin-dashboard', teacherAdminDashboardRouter);
app.use('/getStudentUser', getStudentUserRouter);




module.exports = app;