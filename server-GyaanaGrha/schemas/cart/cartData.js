const mongoose = require("mongoose");

// Schema for the CART Data mailnly of Type String and required....
const pincodeDataSchema = new mongoose.Schema(
  {
    circlename: { type: String, required: true },
    regionname: { type: String, required: true },
    divisionname: { type: String, required: true },
    officename: { type: String, required: true },
    pincode: { type: String, required: true },
    officetype: { type: String, required: true },
    delivery: { type: String, required: true },
    district: { type: String, required: true },
    statename: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CartAreas", pincodeDataSchema);

// Example JSON :

// {
//   "circlename": "Maharashtra Circle",
//   "regionname": "Mumbai Region",
//   "divisionname": "Mumbai Central Division",
//   "officename": "Dadar Post Office",
//   "pincode": "400014",
//   "officetype": "Sub Office",
//   "delivery": "Yes",
//   "district": "Mumbai",
//   "statename": "Maharashtra",
//   "latitude": "19.0176",
//   "longitude": "72.8562",
//   "createdAt": "2025-06-28T10:45:00.000Z",
//   "updatedAt": "2025-06-28T10:45:00.000Z"
// }
