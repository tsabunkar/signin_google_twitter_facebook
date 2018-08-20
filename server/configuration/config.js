var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {

    var config = require('./config.json')
    if (env === 'development') {
        process.env.PORT = config.development.PORT;
        process.env.MONGODB_URI = config.development.MONGODB_URI;
        process.env.JWT_SECRET = config.development.JWT_SECRET;
        process.env.URL_404 = config.development.URL_404;

        process.env.GOOGLE_CLIENT_ID = config.development.google_web.client_id;
        process.env.GOOGLE_CLIENT_SECRET = config.development.google_web.client_secret;
        process.env.GOOGLE_URL = config.development.google_web.redirect_uris[0];

        process.env.TWITTER_CONSUMER_KEY = config.development.twitter_web.consumerKey;
        process.env.TWITTER_CONSUMER_SECRET = config.development.twitter_web.consumerSecret;
        process.env.TWITTER_CALLBACK_URL = config.development.twitter_web.callbackURL;

        process.env.FACEBOOK_APP_ID = config.development.facebook_web.clientID;
        process.env.FACEBOOK_APP_SECRET = config.development.facebook_web.clientSecret;
        process.env.FACEBOOK_CALLBACK_URL = config.development.facebook_web.callbackURL;

    } else {
        process.env.PORT = config.test.PORT;
        process.env.MONGODB_URI = config.test.MONGODB_URI;
        process.env.JWT_SECRET = config.test.JWT_SECRET;
    }

}