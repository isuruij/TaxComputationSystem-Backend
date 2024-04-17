const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const SuperAdminController =require('../Controllers/SuperAdminController')


router.post('/register',SuperAdminController.addSuperAdmin);

module.exports = router;