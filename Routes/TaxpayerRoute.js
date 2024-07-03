const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JwtService = require("../Services/JwtService");

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
      "_TaxPayer_" +
      req.params.userId +
      "_docs_" +
      file.originalname;
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

//Get tax details for view
router.get("/getTaxCalDetails/:id", TaxpayerController.getTaxCalDetails);

//Generate tax report
router.get("/generate-report/:id", TaxpayerController.generateTaxReport);

//download tax report
router.get("/getSummaryReport/:id", TaxpayerController.downloadSummaryReport);

//download tax report
// router.get("/files/:id/:filename", TaxpayerController.taxReportDownload);

router.get("/getNotifications/:id", TaxpayerController.getNotifications);

//for tax history
router.get("/getCalculatedTax/:id", TaxpayerController.getCalculatedTax);

//get tax payments
router.get("/getTaxPayments/:id", TaxpayerController.getTaxPayments);

//delete taxpayment 
router.delete("/deletePaidTax/:taxpaymentid", TaxpayerController.deleteTaxPayment);

//add paid tax
router.post("/paidtax/:id", TaxpayerController.postpaidtax);

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

router.get(
  "/getbusinessincome/:id",
  TaxpayerController.getBusinessIncomeByTaxpayerId
);
router.get(
  "/getemploymentincome/:id",
  TaxpayerController.getEmploymentIncomeByTaxpayerId
);
router.get(
  "/getinvestmentincome/:id",
  TaxpayerController.getInvestmentIncomeByTaxpayerId
);
router.get(
  "/getotherincome/:id",
  TaxpayerController.getOtherIncomeByTaxpayerId
);
router.get(
  "/getcapitalvaluegain/:id",
  TaxpayerController.getCapitalValueGainByTaxpayerId
);
router.get(
  "/getreliefforexpenditure/:id",
  TaxpayerController.getReliefForExpenditureByTaxpayerId
);
router.get(
  "/getreliefforrentincome/:id",
  TaxpayerController.getReliefForRentIncomeByTaxpayerId
);
router.get(
  "/getqualifyingpayments/:id",
  TaxpayerController.getQualifyingPaymentsByTaxpayerId
);
router.get(
  "/getterminalbenefits/:id",
  TaxpayerController.getTerminalBenefitsByTaxpayerId
);
router.get(
  "/getwhtoninvestmentincome/:id",
  TaxpayerController.getWhtOnInvestmentIncomeByTaxpayerId
);
router.get(
  "/getwhtonservicefeereceived/:id",
  TaxpayerController.getWhtOnServiceFeeReceivedByTaxpayerId
);
router.get(
  "/getwhtwhichisnotdeducted/:id",
  TaxpayerController.getWhtWhichIsNotDeductedByTaxpayerId
);
router.get("/getapit/:id", TaxpayerController.getApitByTaxpayerId);
router.get(
  "/getselfassessmentpayment/:id",
  TaxpayerController.getSelfAssessmentPaymentByTaxpayerId
);

module.exports = router;
