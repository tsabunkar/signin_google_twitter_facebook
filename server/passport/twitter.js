var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {

    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            passReqToCallback: true
        },
        function (request, token, tokenSecret, profile, done) {
            // console.log(profile);
            let userObj = {
                // email: profile.emails[0].value,//Twitter does not provide u email Addr
                name: profile.username,
                imageUrl: profile.photos[0].value,
                twitter: {
                    twitterId: profile.id,
                    // twitterToken: accessToken
                }
            };

            // return done(null, profile);
            return done(null, userObj);

        }
    ));
}