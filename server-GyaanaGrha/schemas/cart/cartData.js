const mongoose = require("mongoose");

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
