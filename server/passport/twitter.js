var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
const {
    User
} = require('../models/userModel');

module.exports = () => {

    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            passReqToCallback: true
        },
        async function (request, token, tokenSecret, profile, done) {
            // console.log(profile);
            let query = {
                "twitter.twitterId": profile.id
            }
            try {
                let userObject = await User.findOne(query);

                if (!userObject) { //if no user object is found then it means it is new user
                    console.log('no user document/object is found in the collection');
                    let userObjCreated = new User({
                        // email: profile.emails[0].value,//Twitter does not provide u email Addr
                        name: profile.username,
                        imageUrl: profile.photos[0].value,
                        twitter: {
                            twitterId: profile.id,
                            // twitterToken: accessToken
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