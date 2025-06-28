const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model('Test', TestSchema);
module.exports = Test;
