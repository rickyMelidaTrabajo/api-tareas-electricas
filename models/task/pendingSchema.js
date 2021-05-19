const mongoose = require('mongoose');

const pendingTaskSchema = new mongoose.Schema({
    type: { type: String, require: true },
    state: { type: String, require: true },
    description: { type: String, require: true },
    date_generation: { type: Date, require: true },
    turn: { type: String, require: true },
    technician: { type: String, require: true },
    position: { type: String, require: true }
});

module.exports = mongoose.model('PendingTask', pendingTaskSchema);