const fetchPincodeData = require("../utils/fetchPincodeData");

// Function to get filtered data from the SERVER....
const getFilteredData = async (req, res) => {
  try {
    // Getting the data from the request body...
    const { statename, pincode, district } = req.body;
    const records = await fetchPincodeData(); // Fetching the data from the API...

    // Filtering the data : for the given statename, pincode, district.....
    const filtered = records.filter(record => {
      // Checks for the StateName Matches or not...
      const matchesState = statename ? record.statename.toLowerCase() === statename.toLowerCase() : true;
      // Checks for the Pincode Matches or not...
      const matchesPincode = pincode ? record.pincode === pincode.toString() : true;
      // Checks for the District Matches or not...
      const matchesDistrict = district ? record.district.toLowerCase() === district.toLowerCase() : true;
      // returns the filtered data...
      return matchesState && matchesPincode && matchesDistrict;
    });
    // Sending the filtered data...
    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (err) {
    console.error("Error in getFilteredData:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getFilteredData };
