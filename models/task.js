const mongoose = require('mongoose');

const schema = mongoose.Schema;

let taskSchema = schema({
    type: String,
    state: String,
    description: String,

    date_generation: Date,
    date_closing: Date,
    start_time: String,
    end_time: String,

    turn: String,
    technician: String,
    position: String
});

module.exports = mongoose.model('Task', taskSchema);