// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'inProgress', 'done'],
    default: 'new'
  }
});

module.exports = mongoose.model('Task', TaskSchema);
