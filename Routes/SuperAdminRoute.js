const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const superAdminController =require('../Controllers/SuperAdminController')


router.patch('/updatePolicy',superAdminController.updatePolicy);

router.delete('/deletePolicy',superAdminController.deletePolicy);

router.get('/policy',superAdminController.policy);

// optional policies

router.get('/optionalpolicy',superAdminController.optionalpolicy);

router.patch('/updateoptionalpolicy',superAdminController.updateoptionalpolicy);

router.post('/createPolicy',superAdminController.createPolicy);


module.exports = router;