const axios = require("axios");
require("dotenv").config();

const Statename = "Tripura"; // Test State...
const Pincode = "799006"; // Test Pincode...
const District = "";

const fetchPincodeData = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_API_URL}5c2f62fe-5afa-4119-a499-fec9d604d5bd`, {
      params: {
        "api-key": process.env.API_KEY,
        format: "json",
        limit: 100000, // Data Source to Scale... 
      },
      timeout: 10000,
    });
    const records = response.data.records;
    return records;
  } catch (error) {
    console.error("Error fetching data ashminbhaumik :", error.message);
    return [];
  }
};

// 🧠 Filter Function: by statename, pincode, district
const filterRecords = (records, { statename, pincode, district }) => {
  return records.filter(record => {
    const matchesState = statename ? record.statename.toLowerCase() === statename.toLowerCase() : true;
    const matchesPincode = pincode ? record.pincode === pincode.toString() : true;
    const matchesDistrict = district ? record.district.toLowerCase() === district.toLowerCase() : true;

    return matchesState && matchesPincode && matchesDistrict;
  });
};

// Example Usage just testing...
(async () => {
  const data = await fetchPincodeData();

  const filtered = filterRecords(data, {
    statename: Statename,
    pincode: Pincode,
    district: District,
  });

  console.log("\nFiltered Results:");
  console.log(filtered);
  console.log(" \n✅ Raw Data fetched successfully ashminbhaumik....");
})();
