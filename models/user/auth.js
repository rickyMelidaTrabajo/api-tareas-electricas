const User = require('./user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

User.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, same)=> {
        if(err) {
            callback(err);
        }else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', User);