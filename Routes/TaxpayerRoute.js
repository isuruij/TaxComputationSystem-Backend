const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JwtService = require("../Services/JwtService");

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

const TaxpayerController = require("../Controllers/TaxpayerController");

const { Taxpayer } = require("../models");

router.post("/register", TaxpayerController.addTaxpayer);

router.get("/auth", JwtService.verifyuser, TaxpayerController.authenticateUser);

router.get("/logout", TaxpayerController.logoutTaxpayer);

router.post("/login", TaxpayerController.loginTaxpayer);

router.patch("/verifyemail", TaxpayerController.verifyEmail);

router.get(
  "/getuserbasicdetails/:id",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["taxpayer", "superAdmin", "secondAdmin"]),
  TaxpayerController.getBasicDetails
);

router.patch(
  "/updatebasicdetails",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["taxpayer", "superAdmin", "secondAdmin"]),
  TaxpayerController.updateBasicDetails
);

router.post("/forgot-password", TaxpayerController.forgotPassword);

router.get("/reset-password/:id/:token", TaxpayerController.resetPassword);

router.post("/addnew-password/:id/:token", TaxpayerController.addNewPassword);

router.get(
  "/getuserincomedetails/:id",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["taxpayer", "superAdmin", "secondAdmin"]),
  TaxpayerController.getuserincomedetails
);

router.patch(
  "/updateincomedetails",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["taxpayer", "superAdmin", "secondAdmin"]),
  TaxpayerController.updateincomedetails
);

router.get(
  "/getNotifications/:id",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["taxpayer", "superAdmin", "secondAdmin"]),
  TaxpayerController.getNotifications
);

router.patch(
  "/updatePassword",
  JwtService.roleBasedAuth(["taxpayer"]),
  TaxpayerController.updatePassword
);

//Upload files into database
router.post(
  "/fileUpload/:userId",
  upload.array("files"),
  TaxpayerController.fileUpload
);

router.get("/getUserDetails/:id", TaxpayerController.getUserDetails);

//under development
router.get("/getTaxCalDetails/:id", TaxpayerController.getTaxCalDetails);

router.get("/getNotifications/:id", TaxpayerController.getNotifications);

router.patch(
  "/updateNotificationStatus",
  JwtService.roleBasedAuth(["taxpayer"]),
  TaxpayerController.updateNotificationStatus
);

router.get(
  "/authtaxpayer",
  JwtService.authtaxpayer,
  TaxpayerController.authenticateUser
);

module.exports = router;
