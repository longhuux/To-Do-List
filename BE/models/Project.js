// models/Project.js
const mongoose = require('mongoose');
const TaskSchema = require('./Task').schema;

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [TaskSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);
