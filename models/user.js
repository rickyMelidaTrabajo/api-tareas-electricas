const mongoose = require('mongoose');

const schema = mongoose.Schema;

let userSchema = ({
    name: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);