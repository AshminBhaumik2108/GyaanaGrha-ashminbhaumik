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

const mgptAI = mongoose.model('mgptPrompt', inputSchema);

module.exports = mgptAI;
