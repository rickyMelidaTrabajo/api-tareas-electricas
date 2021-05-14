const UserSchema = require('./userSchema');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = new mongoose.Schema(UserSchema);

User.pre('save', function (next) {
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));

});

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