const mongoose = require('mongoose');

// Schema for the Prompt Data mailnly of Type String and required....
const inputSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // We Can give Like the timestamps: true : It will work as well same only....
  },
});

const Prompt = mongoose.model('Prompt', inputSchema);

module.exports = Prompt;

// Example JSON :

// {
//   "input": "Which location in Delhi is best suited for JEE preparation with low noise and access to coaching centers?",
//   "timestamp": "2025-06-28T11:05:00.000Z"
// }
