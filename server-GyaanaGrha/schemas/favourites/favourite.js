const mongoose = require("mongoose");

// Schema for the Favourite Data mailnly of Type String and required....
const favouriteeDataSchema = new mongoose.Schema(
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

module.exports = mongoose.model("favourites", favouriteeDataSchema);

// JSON Example : 

// {
//   "circlename": "West Bengal Circle",
//   "regionname": "Kolkata Region",
//   "divisionname": "Howrah Division",
//   "officename": "Howrah Head Office",
//   "pincode": "711101",
//   "officetype": "Head Office",
//   "delivery": "Yes",
//   "district": "Howrah",
//   "statename": "West Bengal",
//   "latitude": "22.5958",
//   "longitude": "88.2636",
//   "createdAt": "2025-06-28T10:30:00.000Z",
//   "updatedAt": "2025-06-28T10:30:00.000Z"
// }
