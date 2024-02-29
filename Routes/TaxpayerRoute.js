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

router.patch('/verify-email/:emailToken',TaxpayerController.verifyEmail);

 
// router.get('/register',async (req,res)=>{
//     try{

//         const taxpayer  = await Taxpayer.findAll({where:{name:req.body.name}})
//         res.json({Status:"Success",Data:taxpayer})
//         // await service.addTaxpayer(req.body)
//         // const data = req.body
//         // const token = jwt.sign({data},"key")
//         // res.cookie("token",token)
//         // res.json({Status:"Success",Data:data})
//         // res.status(201).send('created successfully !.')
//     }catch(error){
//         res.json({Status:"Falied to register"})
//     }
// })

// router.post('/login',async (req,res)=>{
//     try{
//         const data = await service.loginTaxpayer(req.body)
//         const token = jwt.sign({data},"key")
//         res.cookie("token",token)
//         res.json({Status:"Success",Data:data})
//         //res.status(201).send('created successfully !.')
//     }catch(error){
//         res.json({Status:"Falied to login"})
//     } 
// })






module.exports = router;