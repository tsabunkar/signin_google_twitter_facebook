const passport = require('passport');

module.exports = (app) => {
    //using Passport
    app.use(passport.initialize());
    app.use(passport.session());

    //using express-session
    // app.use(session({ secret: '123salt' }))

    passport.serializeUser((user, done) => {
        done(null, user); //keeping the whole userobject in the session
    }); //using this serializeUser() fun we can place userObject into the session

    passport.deserializeUser((user, done) => {
        done(null, user);
    }) //using deserializeUser() fun we can get/fetch the userObject which was stored in the session


    require('./passport/google')(); //using the google strategy logic/implementation here
    require('./passport/twitter')();
    require('./passport/facebook')();
}