const express = require("express");
const router = express.Router();
const { Taxpayer } = require("../models");


const JwtService = require("../Services/JwtService")

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
    // console.log(req.params);
    const uniqueSuffix =
      Date.now() +
      "_TaxPayerID_" +
      req.params.userId +
      "_docs_" +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const DataEntryController = require("../Controllers/DataEntryController");

//get user names and is verified by admin detals to dataentry dashboard
router.get("/getusernames",JwtService.roleBasedAuth(["secondAdmin"]), DataEntryController.getusernames);

//Post income data into database
router.post("/enterData",JwtService.roleBasedAuth(["secondAdmin"]), DataEntryController.postTaxDetails);

//Get user submissions
router.get("/getusersubmission",JwtService.roleBasedAuth(["secondAdmin"]), DataEntryController.getUserSubmission);

//Get user name and tin number
router.get("/getUserDetails/:id",JwtService.roleBasedAuth(["secondAdmin"]), DataEntryController.getUserDetails);

//get tax into taxview page
router.get("/getTaxCalDetails/:id",JwtService.roleBasedAuth(["secondAdmin"]), DataEntryController.getTaxCalDetails);

//get documents from server
router.get("/getfiles/:id",JwtService.roleBasedAuth(["secondAdmin"]), DataEntryController.getfiles);

//Upload files into database
router.post(
  "/fileUpload/:userId",
  upload.array("files"),
  JwtService.roleBasedAuth(["secondAdmin"]),
  DataEntryController.fileUpload
);

///////////view files



router.get("/authtsecondAdmin", JwtService.authtsecondAdmin, DataEntryController.authtsecondAdmin);

module.exports = router;
