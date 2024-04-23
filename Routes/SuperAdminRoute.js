const express = require('express')

const router = express.Router()



const SuperAdminController = require('../Controllers/SuperAdminController')

const {Taxpayer} = require("../models")

router.get("/getusers",SuperAdminController.getTaxpayers);

router.delete("/deletetaxpayers/:id", SuperAdminController.deleteTaxpayer);
router.put("/updateUserApprovalStatus", SuperAdminController.toggleApproval);

module.exports = router;
