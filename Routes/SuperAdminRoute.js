const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const superAdminController =require('../Controllers/SuperAdminController')

router.post('/createPolicy',superAdminController.createPolicy);

router.patch('/updatePolicy',superAdminController.updatePolicy);

router.delete('/deletePolicy',superAdminController.deletePolicy);

module.exports = router;