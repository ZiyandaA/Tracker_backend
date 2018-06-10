var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: String
})

var User = mongoose.model('User', userSchema);

module.exports = User;