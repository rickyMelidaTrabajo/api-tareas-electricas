const mongoose = require('mongoose');

const schema = mongoose.Schema;

let technicianSchema = schema({
    name: String,
    position: String,
    turn: String
});

module.exports = mongoose.model('Technician', technicianSchema);