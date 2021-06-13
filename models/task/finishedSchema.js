const mongoose = require('mongoose');

const finishedTaskSchema = new mongoose.Schema({
    taskNumber: { type: Number, require: true },
    type: { type: String, require: true },
    state: { type: String, require: true },
    description: { type: String, require: true },
    date_generation: { type: Date, require: true },
    date_closing: { type: Date, require: true },
    start_time: { type: String, require: true },
    end_time: { type: String, require: true },
    hour_man: { type: String, require: true },
    imageBefore: { type: String, require: true },
    imageAfter: { type: String, require: true },
    turn: { type: String, require: true },
    name: { type: String, require: true },
    position: { type: String, require: true },
});

module.exports = mongoose.model('FinishedTask', finishedTaskSchema);