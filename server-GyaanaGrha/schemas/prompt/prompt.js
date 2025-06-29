const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = mongoose.model('Prompt', inputSchema);

module.exports = Prompt;
