const express = require("express");
const router = express.Router();
const { Taxpayer } = require("../models");

//For upload docs
const multer = require("multer");
//For upload docs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Images"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
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

//Upload files into database
router.post(
  "/fileUpload/:userId",
  upload.array("files"),
  DataEntryController.fileUpload
);

module.exports = router;