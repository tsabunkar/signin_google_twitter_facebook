var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            // console.log(profile);
            let userObj = {
                // email: profile.emails[0].value,
                name: profile.displayName,
                // imageUrl: profile.photos[0].value,// facebook will not give image during oauth authentication, for that we need to do authorization[Want to access image]
                facebook: {
                    facebookId: profile.id,
                    facebookToken: accessToken
                }
            };

            // return done(null, profile);
            return done(null, userObj);

        }
    ));
}