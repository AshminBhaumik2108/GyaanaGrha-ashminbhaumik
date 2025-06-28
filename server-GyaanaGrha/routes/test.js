const express = require('express');
const testController = require('../controllers/test');
const router = express.Router();

router.post('/createtest', testController.createTest);
router.get('/gettest', testController.getTests);
// Gives a Route to create a new test....
module.exports = router;
