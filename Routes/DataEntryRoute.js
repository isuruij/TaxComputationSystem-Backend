const express = require("express");
const router = express.Router();
const { Taxpayer } = require("../models");

const DataEntryController = require("../Controllers/DataEntryController");

//get user names and is verified by admin detals to dataentry dashboard
router.get("/getusernames", DataEntryController.getusernames);

//Post income data into database
router.post("/enterData", DataEntryController.postTaxDetails);

//Get user submissions
router.get("/getusersubmission", DataEntryController.getUserSubmission);

//Get user name and tin number
router.get("/getUserDetails/:id", DataEntryController.getUserDetails);

module.exports = router;
