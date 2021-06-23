const mongoose = require('mongoose');

const schema = mongoose.Schema;

let taskSchema = schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  taskNumber: { type: Number, require: true },
  type: { type: String, require: true },
  state: { type: String, require: true },
  description: { type: String, require: true },
  date_generation: { type: Date, require: true },
  date_closing: { type: Date },
  start_time: { type: String },
  end_time: { type: String },
  hour_man: { type: String },
  imageBefore: { type: String },
  imageAfter: { type: String },
  turn: { type: String, require: true },
  name: { type: String, require: true },
  position: { type: String, require: true },
});

module.exports = mongoose.model('Task', taskSchema);
