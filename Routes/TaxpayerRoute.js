const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const TaxpayerController =require('../Controllers/TaxpayerController')

const {Taxpayer} = require("../models")

router.post('/register',TaxpayerController.addTaxpayer)

router.get("/auth",JwtService.verifyuser,TaxpayerController.authenticateUser);

router.get("/logout",TaxpayerController.logoutTaxpayer);
 
router.post('/login',TaxpayerController.loginTaxpayer);

router.patch('/verifyemail',TaxpayerController.verifyEmail);

router.get('/getuserbasicdetails/:id',JwtService.verifyuser,JwtService.roleBasedAuth(["taxpayer","superAdmin","admin"]),TaxpayerController.getBasicDetails);

router.patch('/updatebasicdetails',JwtService.verifyuser,JwtService.roleBasedAuth(["taxpayer","superAdmin","admin"]),TaxpayerController.updateBasicDetails);

router.post('/forgot-password',TaxpayerController.forgotPassword);    

router.get('/reset-password/:id/:token',TaxpayerController.resetPassword);

router.post('/addnew-password/:id/:token',TaxpayerController.addNewPassword);

router.get('/getuserincomedetails/:id',JwtService.verifyuser,JwtService.roleBasedAuth(["taxpayer","superAdmin","admin"]),TaxpayerController.getuserincomedetails);

router.patch('/updateincomedetails',JwtService.verifyuser,JwtService.roleBasedAuth(["taxpayer","superAdmin","admin"]),TaxpayerController.updateincomedetails);

router.get('/getNotifications/:id',JwtService.verifyuser,JwtService.roleBasedAuth(["taxpayer","superAdmin","admin"]),TaxpayerController.getNotifications);

router.patch('/updatePassword',TaxpayerController.updatePassword);


module.exports = router;