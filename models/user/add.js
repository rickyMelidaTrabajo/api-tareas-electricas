const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userSchema');

User.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hashedPassword) => {
            if (err) {
                next(err)
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('User', User);