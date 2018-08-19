var express = require('express');
var passport = require('passport');
var router = express.Router();


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
        ]
    }))

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

    
module.exports = router;