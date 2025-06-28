const Test = require("../schemas/test/test");

// Create a test document....
exports.createTest = async (req, res) => {
  try {
    const { message } = req.body;
    const newTest = new Test({ message });
    const saved = await newTest.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all test documents....
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: tests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

