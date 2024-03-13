const TaxpayerService = require("../Services/TaxpayerService");
const { Taxpayer } = require("../models");
module.exports.addTaxpayer = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }

    const result = await TaxpayerService.addTaxpayer(req.body);
    
    
    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    }
    if(result.message=="already registered"){
      return res.json({ status: false,message:"registered user" });
    }
    
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.authenticateTaxpayer = async (req, res) => {
  
  res.json({ Status: "Success", name: req.name });
};

module.exports.loginTaxpayer = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ error: "empty request" });
  }
  const result = await TaxpayerService.loginTaxpayer(req.body);
  
  
  if (!result.status) {
    console.log("failed login")
    res.json({ Status: "Failed"});
  }else{
    res.cookie("token", result.token);
    res.json({ Status: "Success"});
  }


};

module.exports.logoutTaxpayer = async (req, res) => {
  res.clearCookie("token");
  res.json({ Status: "Success", Data: "Logged out" });
};


module.exports.verifyEmail = async (req, res) => {
  const emailToken = req.body.emailToken;
  if (!emailToken) {
    return res.status(400).json({status:"Failed", error: "empty request" });
  } 
  let user = await Taxpayer.findOne({ where: { emailToken: emailToken } });

  if (!user) {
      return res.status(404).json({status:"Failed", error: "User not found" });
  }

  await Taxpayer.update({ isVerifiedEmail: true,emailToken:null }, { where: { emailToken: emailToken } });
  await Taxpayer.findOne({ where: { emailToken: emailToken } });
  return res.status(200).json({status:"Success" ,message: "User verified successfully"});
};



module.exports.updateBasicDetails = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }

    const result = await TaxpayerService.updateBasicDetails(req.body);
    
    
    if (result.status) {
      console.log("sucesssssssss")
      return res.json({ Status: "Success" });
    }
    
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};



module.exports.getBasicDetails = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "empty request" });
    }
    console.log(req.params.id)
    const result = await TaxpayerService.getBasicDetails(req.params.id);
    
    
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    }

    
    
    
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ error: "empty request" });
    }
    //console.log(req.params.id)
    const result = await TaxpayerService.forgotPassword(req.body.email);
    
    
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    }

    
    
    
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};



