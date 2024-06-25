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
router.post('/addnotifications2',SuperAdminController.addNotifications2);
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

//update submission status
router.put("/updateSubmissionStatusBusinessIncome/:incomeId", SuperAdminController.updateSubmissionStatusBusinessIncome);
router.put("/updateSubmissionStatusEmploymentIncome/:incomeId", SuperAdminController.updateSubmissionStatusEmploymentIncome);
router.put("/updateSubmissionStatusInvestmentIncome/:incomeId", SuperAdminController.updateSubmissionStatusInvestmentIncome);
router.put("/updateSubmissionStatusOtherIncome/:incomeId", SuperAdminController.updateSubmissionStatusOtherIncome);
router.put("/updateSubmissionStatusreliefForExpenditure/:incomeId", SuperAdminController.updateSubmissionStatusreliefForExpenditure);
router.put("/updateSubmissionStatusCapitalValueGain/:incomeId", SuperAdminController.updateSubmissionStatusCapitalValueGain);
router.put("/updateSubmissionStatusReliefForRentIncome/:incomeId", SuperAdminController.updateSubmissionStatusReliefForRentIncome);
router.put("/updateSubmissionStatusQualifyingPayments/:incomeId", SuperAdminController.updateSubmissionStatusQualifyingPayments);
router.put("/updateSubmissionStatusTerminalBenefits/:incomeId", SuperAdminController.updateSubmissionStatusTerminalBenefits);
router.put("/updateSubmissionStatusWhtOnInvestmentIncome/:incomeId", SuperAdminController.updateSubmissionStatusWhtOnInvestmentIncome);
router.put("/updateSubmissionStatusWhtOnServiceFeeReceived/:incomeId", SuperAdminController.updateSubmissionStatusWhtOnServiceFeeReceived);
router.put("/updateSubmissionStatusWhtWhichIsNotDeducted/:incomeId", SuperAdminController.updateSubmissionStatusWhtWhichIsNotDeducted);
router.put("/updateSubmissionStatusApit/:incomeId", SuperAdminController.updateSubmissionStatusApit);
router.put("/updateSubmissionStatusSelfAssessmentPayment/:incomeId", SuperAdminController.updateSubmissionStatusSelfAssessmentPayment);
router.put("/updateSubmissionStatusreliefForExpenditure/:incomeId", SuperAdminController.updateSubmissionStatusreliefForExpenditure);


router.patch('/updatePolicy',SuperAdminController.updatePolicy);

router.delete('/deletePolicy',SuperAdminController.deletePolicy);

router.get('/policy',SuperAdminController.policy);

// optional policies

router.get('/optionalpolicy',SuperAdminController.optionalpolicy);

router.patch('/updateoptionalpolicy',SuperAdminController.updateoptionalpolicy);

router.post('/createPolicy',SuperAdminController.createPolicy);


//Mailbox

router.get("/getinboxemail",SuperAdminController.getinboxMail);
router.delete("/deletetInboxemail/:emailId", SuperAdminController.deletetInboxmail);


router.get("/getsentemail",SuperAdminController.getSentMail);
router.delete("/deleteSentemail/:emailId", SuperAdminController.deleteSentMail);





 

module.exports = router;