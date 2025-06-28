const fetchPincodeData = require("../utils/fetchPincodeData");

const getFilteredData = async (req, res) => {
  try {
    const { statename, pincode, district } = req.body;

    const records = await fetchPincodeData();

    const filtered = records.filter(record => {
      const matchesState = statename ? record.statename.toLowerCase() === statename.toLowerCase() : true;
      const matchesPincode = pincode ? record.pincode === pincode.toString() : true;
      const matchesDistrict = district ? record.district.toLowerCase() === district.toLowerCase() : true;

      return matchesState && matchesPincode && matchesDistrict;
    });

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
