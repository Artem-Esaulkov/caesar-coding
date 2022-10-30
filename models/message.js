const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: false,
    minlength: 2,
  },
  rot: {
    type: Number,
    required: false,
    min: 0,
    max: 26,
  },
  usages: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  }
});

module.exports = mongoose.model('message', messageSchema);
