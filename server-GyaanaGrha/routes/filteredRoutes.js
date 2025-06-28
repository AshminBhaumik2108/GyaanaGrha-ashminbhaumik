const express = require("express");
const router = express.Router();
const { getFilteredData } = require("../controllers/getFilteredData");

router.post("/getFiltereddata/getData", getFilteredData);

module.exports = router;
