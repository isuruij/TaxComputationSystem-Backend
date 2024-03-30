const express = require("express");
const router = express.Router();
const { Taxpayer } = require("../models");

const DataEntryController = require("../Controllers/DataEntryController");

//get user names and is verified by admin detals to dataentry dashboard
router.get("/getusernames", DataEntryController.getusernames);

module.exports = router;
