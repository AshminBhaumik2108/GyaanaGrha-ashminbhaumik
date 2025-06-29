const Input = require("../schemas/prompt/prompt");

// Save input from frontend to MongoDB.......
exports.createInput = async (req, res) => {
  try {
    if (!req.body || !req.body.input) {
      return res.status(400).json({
        success: false,
        error: "Input text is required",
      });
    }
    const { input } = req.body;
    // Chack for the Value if Input is present or not....
    if (!input) {
      return res
        .status(400)
        .json({ success: false, error: "Input text is required" });
    }
    const newInput = new Input({ input });
    const savedInput = await newInput.save();
    // Return the Success....
    res.status(201).json({ success: true, data: savedInput });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all inputs for the recentPrompts....
exports.getInputs = async (req, res) => {
  try {
    const inputs = await Input.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: inputs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE Prompt by _id...
exports.deletePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Prompt _id is required." });
    }
    const deleted = await Input.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Prompt not found." });
    }
    res.status(200).json({ message: "Prompt deleted successfully." });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
