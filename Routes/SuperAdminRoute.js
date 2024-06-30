const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const SuperAdminController =require('../Controllers/SuperAdminController')


router.post('/register',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.addSuperAdmin);

router.post('/createfirstadmin',SuperAdminController.addFirstAdmin);

router.post('/login',SuperAdminController.loginSuperAdmin);

router.post('/addnotifications',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.addNotifications);
router.post('/addnotifications2',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.addNotifications2);
router.get("/getusers",JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.getTaxpayers);

router.get("/getBusinessIncome/",JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.getBusinessIncome);

router.delete("/deletetaxpayers/:id",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.deleteTaxpayer);
router.put("/updateUserApprovalStatus",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.toggleApproval);

router.get("/fetchTaxpayer/:userId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.fetchTaxpayer);
router.put("/updateNoOfSubmissions/:userId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateNoOfSubmissions);




//get income details
router.get('/getbusinessincome/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getBusinessIncomeByTaxpayerId);
router.get('/getemployeeincome/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getEmployeeIncomeByTaxpayerId);
router.get('/getinvestmentincome/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getInvestIncomeByTaxpayerId);
router.get('/getotherincome/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getOtherIncomeByTaxpayerId);
router.get('/getcapitalvaluegain/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getCapitalValueGain);
router.get('/getapit/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getApit);
router.get('/getreliefforexpenditure/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getReliefForExpenditure);
router.get('/getreliefforrentincome/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getReliefForRentIncome);
router.get('/getselfassessmentpayment/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getSelfAssessmentPayment);
router.get('/getTerminalBenefits/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getTerminalBenefits);
router.get('/getwhtoninvestmentincome/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]),SuperAdminController.getWhtOnInvestmentIncome);
router.get('/getwhtonservicefeereceived/:taxpayerId', JwtService.roleBasedAuth(["superAdmin","secondAdmin"]),SuperAdminController.getWhtOnServiceFeeReceived);
router.get('/getwhtwhichisnotdeducted/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getWhtWhichIsNotDeducted);
router.get('/getqualifyingpayments/:taxpayerId',JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.getQualifyingPayments);
 
router.put("/verifyBusinessIncome",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyBusinessIncome);
router.put("/verifyEmploymentIncome",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyEmploymentIncome);
router.put("/verifyInvestmentIncome",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyInvestmentIncome);
router.put("/verifyOtherIncome",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyOtherIncome);

router.put("/verifyCapitalValueGain",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyCapitalValueGain);
router.put("/verifyReliefForExpenditure",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyReliefForExpenditure);
router.put("/verifyReliefForRentIncome",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyReliefForRentIncome);
router.put("/verifyQualifyingPayments",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyQualifyingPayments);
router.put("/verifyTerminalBenefits",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyTerminalBenefits);


router.put("/verifyApit",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyApit);
router.put("/verifyWhtOnServiceFeeReceived",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifyWhtOnServiceFeeReceived);
router.put("/verifyWhtWhichIsNotDeducted", JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.verifyWhtWhichIsNotDeducted);
router.put("/verifyWhtOnInvestmentIncome", JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.verifyWhtOnInvestmentIncome);
router.put("/verifySelfAssessmentPayment",JwtService.roleBasedAuth(["superAdmin"]), SuperAdminController.verifySelfAssessmentPayment);


router.post("/requestDocument",JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.requestDocument);
router.post("/requestAgainDocument",JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.requestAgainDocument);

//update submission status
router.put("/updateSubmissionStatusBusinessIncome/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusBusinessIncome);
router.put("/updateSubmissionStatusEmploymentIncome/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusEmploymentIncome);
router.put("/updateSubmissionStatusInvestmentIncome/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusInvestmentIncome);
router.put("/updateSubmissionStatusOtherIncome/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusOtherIncome);
router.put("/updateSubmissionStatusreliefForExpenditure/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusreliefForExpenditure);
router.put("/updateSubmissionStatusCapitalValueGain/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusCapitalValueGain);
router.put("/updateSubmissionStatusReliefForRentIncome/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusReliefForRentIncome);
router.put("/updateSubmissionStatusQualifyingPayments/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusQualifyingPayments);
router.put("/updateSubmissionStatusTerminalBenefits/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusTerminalBenefits);
router.put("/updateSubmissionStatusWhtOnInvestmentIncome/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusWhtOnInvestmentIncome);
router.put("/updateSubmissionStatusWhtOnServiceFeeReceived/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusWhtOnServiceFeeReceived);
router.put("/updateSubmissionStatusWhtWhichIsNotDeducted/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusWhtWhichIsNotDeducted);
router.put("/updateSubmissionStatusApit/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusApit);
router.put("/updateSubmissionStatusSelfAssessmentPayment/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusSelfAssessmentPayment);
router.put("/updateSubmissionStatusreliefForExpenditure/:incomeId",JwtService.roleBasedAuth(["superAdmin","secondAdmin"]), SuperAdminController.updateSubmissionStatusreliefForExpenditure);


router.patch('/updatePolicy',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.updatePolicy);

router.delete('/deletePolicy',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.deletePolicy);

router.get('/policy',SuperAdminController.policy);

router.post('/createPolicy',JwtService.roleBasedAuth(["superAdmin"]),SuperAdminController.createPolicy);

router.get("/authtsuperAdmin", JwtService.authtsuperAdmin, SuperAdminController.authtsuperAdmin);


//Mailbox

router.get("/getinboxemail",SuperAdminController.getinboxMail);
router.delete("/deletetInboxemail/:emailId", SuperAdminController.deletetInboxmail);


router.get("/getsentemail",SuperAdminController.getSentMail);
router.delete("/deleteSentemail/:emailId", SuperAdminController.deleteSentMail);

router.post("/composemail", SuperAdminController.composemail);


 

module.exports = router;