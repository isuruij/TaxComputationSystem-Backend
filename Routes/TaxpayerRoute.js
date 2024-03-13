const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const TaxpayerController =require('../Controllers/TaxpayerController')


const {Taxpayer} = require("../models")

router.post('/register',TaxpayerController.addTaxpayer)


router.get("/auth",JwtService.verifyuser,TaxpayerController.authenticateTaxpayer);
 
router.get("/logout",TaxpayerController.logoutTaxpayer);
 
router.post('/login',TaxpayerController.loginTaxpayer);

router.patch('/verifyemail',TaxpayerController.verifyEmail);

router.get('/getuserbasicdetails/:id',TaxpayerController.getBasicDetails); 

router.patch('/updatebasicdetails',TaxpayerController.updateBasicDetails);

router.post('/forgot-password',TaxpayerController.forgotPassword);    


module.exports = router;