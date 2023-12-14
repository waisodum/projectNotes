var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { hashSync } = require('bcrypt');

var app = express();


app.use(cors())
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// app.post('/Register',(req,res) => {
//   const user = new userModel({
//     username : req.body.username,
//     password : hashSync(req.body.password,10)
//   })
//   user.save().then(user=>{
//     res.send({
//       success: true,
//       message: "User created successfully",
//       user: {
//         id : user._id,
//         username : user.username
//       }
//     })
//   }).catch(err=>{
//     res.send({
//       success: false,
//       message: "Something went wrong",
//      error: err
//     })

//   })

// })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen('8000',()=>{
  console.log('server started');
})

