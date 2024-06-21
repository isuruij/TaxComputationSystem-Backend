const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const SuperAdminController =require('../Controllers/SuperAdminController')


router.post('/register',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.addSuperAdmin);

router.post('/createfirstadmin',SuperAdminController.addFirstAdmin);

router.post('/login',SuperAdminController.loginSuperAdmin);

router.post('/addnotifications',SuperAdminController.addNotifications);
router.get("/getusers",SuperAdminController.getTaxpayers);

router.get("/getBusinessIncome/",SuperAdminController.getBusinessIncome);

router.delete("/deletetaxpayers/:id", SuperAdminController.deleteTaxpayer);
router.put("/updateUserApprovalStatus", SuperAdminController.toggleApproval);

//get income details
router.get('/getbusinessincome/:taxpayerId', SuperAdminController.getBusinessIncomeByTaxpayerId);
router.get('/getemployeeincome/:taxpayerId', SuperAdminController.getEmployeeIncomeByTaxpayerId);
router.get('/getinvestmentincome/:taxpayerId', SuperAdminController.getInvestIncomeByTaxpayerId);
router.get('/getotherincome/:taxpayerId', SuperAdminController.getOtherIncomeByTaxpayerId);
router.get('/getcapitalvaluegain/:taxpayerId', SuperAdminController.getCapitalValueGain);
router.get('/getapit/:taxpayerId', SuperAdminController.getApit);
router.get('/getreliefforexpenditure/:taxpayerId', SuperAdminController.getReliefForExpenditure);
router.get('/getreliefforrentincome/:taxpayerId', SuperAdminController.getReliefForRentIncome);
router.get('/getselfassessmentpayment/:taxpayerId', SuperAdminController.getSelfAssessmentPayment);
router.get('/getTerminalBenefits/:taxpayerId', SuperAdminController.getTerminalBenefits);
router.get('/getwhtoninvestmentincome/:taxpayerId', SuperAdminController.getWhtOnInvestmentIncome);
router.get('/getwhtonservicefeereceived/:taxpayerId', SuperAdminController.getWhtOnServiceFeeReceived);
router.get('/getwhtwhichisnotdeducted/:taxpayerId', SuperAdminController.getWhtWhichIsNotDeducted);
router.get('/getqualifyingpayments/:taxpayerId', SuperAdminController.getQualifyingPayments);
 
router.put("/verifyBusinessIncome", SuperAdminController.verifyBusinessIncome);
router.put("/verifyEmploymentIncome", SuperAdminController.verifyEmploymentIncome);
router.put("/verifyInvestmentIncome", SuperAdminController.verifyInvestmentIncome);
router.put("/verifyOtherIncome", SuperAdminController.verifyOtherIncome);

router.put("/verifyCapitalValueGain", SuperAdminController.verifyCapitalValueGain);
router.put("/verifyReliefForExpenditure", SuperAdminController.verifyReliefForExpenditure);
router.put("/verifyReliefForRentIncome", SuperAdminController.verifyReliefForRentIncome);
router.put("/verifyQualifyingPayments", SuperAdminController.verifyQualifyingPayments);
router.put("/verifyTerminalBenefits", SuperAdminController.verifyTerminalBenefits);


router.put("/verifyApit", SuperAdminController.verifyApit);
router.put("/verifyWhtOnServiceFeeReceived", SuperAdminController.verifyWhtOnServiceFeeReceived);
router.put("/verifyWhtWhichIsNotDeducted", SuperAdminController.verifyWhtWhichIsNotDeducted);
router.put("/verifyWhtOnInvestmentIncome", SuperAdminController.verifyWhtOnInvestmentIncome);
router.put("/verifySelfAssessmentPayment", SuperAdminController.verifySelfAssessmentPayment);


router.post("/requestDocument",SuperAdminController.requestDocument);
router.post("/requestAgainDocument",SuperAdminController.requestAgainDocument);


router.patch('/updatePolicy',SuperAdminController.updatePolicy);

router.delete('/deletePolicy',SuperAdminController.deletePolicy);

router.get('/policy',SuperAdminController.policy);

// optional policies

router.get('/optionalpolicy',SuperAdminController.optionalpolicy);

router.patch('/updateoptionalpolicy',SuperAdminController.updateoptionalpolicy);

router.post('/createPolicy',SuperAdminController.createPolicy);

router.get("/authtsuperAdmin", JwtService.authtsuperAdmin, SuperAdminController.authtsuperAdmin);


 

module.exports = router;