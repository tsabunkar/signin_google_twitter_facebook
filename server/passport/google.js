var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //Using OAuth 2 strategy 
const {
  User
} = require('../models/userModel');


//GoogleStrategy
/* let GOOGLE_CLIENT_ID = '633736947972-d7fvf30rkr7an1dtl697i7urpv6ua9de.apps.googleusercontent.com';
let GOOGLE_CLIENT_SECRET = 'pi-6Aq2xGuL667A8O0K2m795'
let URL = 'http://localhost:3000/auth/google/callback/tejas' */
module.exports = () => {

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_URL
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      let query = {
        "google.googleId": profile.id
      }
      
      try {
        let userObject = await User.findOne(query);


        if (!userObject) { //if no user object is found then it means it is new user

          console.log('no user document/object is found in the collection');

          let userObjCreated = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            imageUrl: profile._json.image.url,
            google: {
              googleId: profile.id,
              googleToken: accessToken
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

    }));

}