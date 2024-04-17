const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const SuperAdminController =require('../Controllers/SuperAdminController')


router.post('/register',SuperAdminController.addSuperAdmin);

router.post('/login',SuperAdminController.loginSuperAdmin);

//router.get("/logout",SuperAdminController.logoutSuperAdmin);
 

module.exports = router;