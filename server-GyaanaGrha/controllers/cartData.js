const PincodeData = require("../schemas/cart/cartData");

// Create new data
const createData = async (req, res) => {
  try {
    const newEntry = new PincodeData(req.body);
    const saved = await newEntry.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all saved data
const getData = async (req, res) => {
  try {
    const allData = await PincodeData.find();
    res.status(200).json({ success: true, data: allData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete data by _id
const deleteData = async (req, res) => {
  try {
    const deleted = await PincodeData.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Data not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createData,
  getData,
  deleteData,
};
