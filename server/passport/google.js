var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //Using OAuth 2 strategy 

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
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      let userObj = { //Storing the required information which was provided by google inside the userObject
        email: profile.emails[0].value,
        name: profile.displayName,
        imageUrl: profile._json.image.url,
        google: {
          googleId: profile.id,
          googleToken: accessToken
        }
      };

      // return done(null, profile);
      return done(null, userObj);

    }
  ));
}