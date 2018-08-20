const {
    mongoose
} = require('../db/mongoose_config')

var UserSchema = new mongoose.Schema({

    email: {
        type: String
    },
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    google: {
        type: Object
    },
    facebook: {
        type: Object
    },
    twitter: {
        type: Object
    }

})

var User = mongoose.model('user_social_aggregator', UserSchema)

module.exports = {
    User
}