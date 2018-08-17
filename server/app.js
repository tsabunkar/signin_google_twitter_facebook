require('./configuration/config')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var session = require('express-session')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;//Using OAuth 2 strategy 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
/* console.log(path.join(__dirname, '../server/views'));
console.log(path.join(__dirname,  '../server/public')); */
app.set('views', path.join(__dirname, '../server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../server/public')));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


//using Passport
app.use(passport.initialize());
app.use(passport.session());


//GoogleStrategy
/* let GOOGLE_CLIENT_ID = '633736947972-d7fvf30rkr7an1dtl697i7urpv6ua9de.apps.googleusercontent.com';
let GOOGLE_CLIENT_SECRET = 'pi-6Aq2xGuL667A8O0K2m795'
let URL = 'http://localhost:3000/auth/google/callback/tejas' */

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_URL
},
  function (accessToken, refreshToken, profile, done) {
    console.log("----------------------");
    console.log(profile);
    return done(null, profile);

  }
));

//using express-session
// app.use(session({ secret: '123salt' }))

passport.serializeUser((user, done) => {
  done(null, user);//keeping the whole userobject in the session
});//using this serializeUser() fun we can place userObject into the session

passport.deserializeUser((user, done) => {
  done(null, user);
})//using deserializeUser() fun we can get/fetch the userObject which was stored in the session


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
