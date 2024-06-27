const express = require("express");
const router = express.Router();
const { Taxpayer } = require("../models");

//For upload docs
const multer = require("multer");
// Importing the file system module for directory creation
const fs = require("fs");
//For upload docs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const uploadPath = `./public/files/${userId}`;

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    console.log(req.params);
    const uniqueSuffix = Date.now() + "_TaxPayerID_" + req.params.userId;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const DataEntryController = require("../Controllers/DataEntryController");

//get user names and is verified by admin detals to dataentry dashboard
router.get("/getusernames", DataEntryController.getusernames);

//Post income data into database
router.post("/enterData", DataEntryController.postTaxDetails);

//Get user submissions
router.get("/getusersubmission", DataEntryController.getUserSubmission);

//Get user name and tin number
router.get("/getUserDetails/:id", DataEntryController.getUserDetails);

//under development
router.get("/getTaxCalDetails/:id", DataEntryController.getTaxCalDetails);

//Upload files into database
router.post(
  "/fileUpload/:userId",
  upload.array("files"),
  DataEntryController.fileUpload
);

module.exports = router;
