var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const {
    User
} = require('../models/userModel');

let facebookStrategyImplemn = () => {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            passReqToCallback: true
        },
        async function (request, accessToken, refreshToken, profile, done) {
            // console.log(profile);

            let query = {
                "facebook.facebookId": profile.id
            }

            try {
                let userObject = await User.findOne(query);


                if (!userObject) { //if no user object is found then it means it is new user
                    console.log('no user document/object is found in the collection');
                    
                    let userObjCreated = new User({
                        // email: profile.emails[0].value,
                        name: profile.displayName,
                        // imageUrl: profile.photos[0].value,// facebook will not give image during oauth authentication, for that we need to do authorization[Want to access image]
                        facebook: {
                            facebookId: profile.id,
                            facebookToken: accessToken
                        }
                    });

                    await userObjCreated.save();

                    // return done(null, profile);
                    return done(null, userObjCreated);

                } else { //user object is found which means it is exisiting user
                    console.log('user document/object is found in the collection');
                    return done(null, userObject)
                }
            } catch (error) {
                console.log('error');
                return done(null, error);
            }

        }
    ));
}

module.exports = {
    facebookStrategyImplemn
}