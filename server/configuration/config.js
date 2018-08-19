var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {

    var config = require('./config.json')
    if (env === 'development') {
        process.env.PORT = config.development.PORT;
        process.env.MONGODB_URI = config.development.MONGODB_URI;
        process.env.JWT_SECRET = config.development.JWT_SECRET;
        process.env.URL_404 = config.development.URL_404;
        process.env.GOOGLE_CLIENT_ID = config.web.client_id;
        process.env.GOOGLE_CLIENT_SECRET = config.web.client_secret;
        process.env.GOOGLE_URL = config.web.redirect_uris[0];
        process.env.TWITTER_CONSUMER_KEY = config.twitter_web.consumerKey;
        process.env.TWITTER_CONSUMER_SECRET = config.twitter_web.consumerSecret;
        process.env.CALLBACK_URL = config.twitter_web.callbackURL;

    } else {
        process.env.PORT = config.test.PORT;
        process.env.MONGODB_URI = config.test.MONGODB_URI;
        process.env.JWT_SECRET = config.test.JWT_SECRET;
    }

}