const express = require("express");
const router = express.Router();
const { createData, getData, deleteData } = require("../controllers/cartData");

router.post("/create", createData);
router.get("/all", getData);
router.delete("/delete/:id", deleteData);

module.exports = router;
