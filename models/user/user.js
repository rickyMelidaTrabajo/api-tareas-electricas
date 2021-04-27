const mongoose = require('mongoose');

const schema = mongoose.Schema;

let userSchema = ({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);