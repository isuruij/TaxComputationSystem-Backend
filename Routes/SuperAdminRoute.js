const express = require('express')
// const jwt = require("jsonwebtoken");
const router = express.Router()
// const JwtService = require("../Services/JwtService")

// const TaxpayerController =require('../Controllers/TaxpayerController')
const SuperAdminController = require('../Controllers/SuperAdminController')

const {Taxpayer} = require("../models")

router.get("/getusers",SuperAdminController.getTaxpayers);
// router.patch('/updatebasicdetails',TaxpayerController.updateBasicDetails);

// router.put("/taxpayers/:id", SuperAdminController.updateTaxpayer);
router.delete("/deletetaxpayers/:id", SuperAdminController.deleteTaxpayer);
// router.put("/approvetaxpayers/:id", SuperAdminController.toggleApproval);

module.exports = router;
