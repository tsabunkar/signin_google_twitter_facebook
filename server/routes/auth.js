var express = require('express');
var passport = require('passport');
var router = express.Router();

//---------------------GOOGLE---------------------------------------
router.get('/google/callback/tejas',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('Successfully authenticated !!!');
        res.redirect('/users');
    });


router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] //this scope url we will get from  -> https://developers.google.com/oauthplayground/
    }))

//---------------------TWITTER---------------------------------------


//http://192.168.0.103:3000/auth/twitter/callback
router.get('/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('Successfully authenticated !!!');
        res.redirect('/users');
    });



router.route('/twitter')
    .get(passport.authenticate('twitter'))


//---------------------FACEBOOK---------------------------------------

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('Successfully authenticated !!!');
        res.redirect('/users');
    });


router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['email']
    }))


module.exports = router;