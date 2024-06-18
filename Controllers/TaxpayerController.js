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
    if(result.message=="already registered email"){
      return res.json({ status: false,message:"already registered email" });
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

    if(result.message=="already registered email"){
      return res.json({ Status: "NotSuccess" , message:"already registered email"});
    }
    
  } catch (error) {
    return res.status(400).json({Status: "NotSuccess", message: error.message });
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

    const result = await TaxpayerService.forgotPassword(req.body.email);

    if (result.status) {
      return res.json({ Status: "Success"});
    }
    if(result.message=="Email not found"){
      return res.json({ Status: "NotSuccess",message:"Email not found"});
    }
  } catch (error) {
    return res.status(400).json({ Status: "NotSuccess" });
  }
};


module.exports.resetPassword = async (req, res) => {
  try {
    
    const {id,token} = req.params;
    const result = await TaxpayerService.resetPassword(id,token);
    if (result.status) {
      return res.json({ Status: "Verified" });
    }else{
      return res.status(200).json({ Status: "NotVerified"});
    }
  } catch (error) {
    return res.status(200).json({ Status: "NotVerified", message: error.message });
  }
};

module.exports.addNewPassword = async (req, res) => {
  try {
    console.log(",,,,,,,,,,,,,,,,,")
    console.log(req.body)
    const {id,token} = req.params;
    const newPassword = req.body.password;
    console.log(id,token)
    console.log(newPassword)
    console.log("++++++++++++")
    const result = await TaxpayerService.addNewPassword(id,token,newPassword);
    console.log("---------------------")
    console.log(result)
    if (result.status) {
      return res.json({ Status: "Verified" });
    }else{
      return res.status(200).json({ Status: "NotVerified"});
    }

  } catch (error) {
    return res.status(200).json({ Status: "NotVerified", message: error.message });
  }
};

module.exports.getuserincomedetails = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "empty request" });
    }
    console.log(req.params.id)
    const result = await TaxpayerService.getuserincomedetails(req.params.id);
    
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    }else{
      return res.status(400).json({ status: false });
    }

  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};


module.exports.updateincomedetails = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }
    const result = await TaxpayerService.updateincomedetails(req.body);
    
    if (result.status) {
      return res.json({ Status: "Success" });
    }else{
      return res.status(400).json({Status: "NotSuccess" });
    }

    
  } catch (error) {
    return res.status(400).json({Status: "NotSuccess", message: error.message });
  }
};


module.exports.getNotifications = async (req, res) => {
  try {
    
    console.log(req.params.id);
    const result = await TaxpayerService.getNotifications(req.params.id);
    
    console.log(result);
    return res.status(200).json(result);

  } catch (error) {
    return { status: false };
  }
};


module.exports.updateNotificationStatus = async (req, res) => {
  try {
    
    const result = await TaxpayerService.updateNotificationStatus(req.body.id);
    return res.status(200).json(result);

  } catch (error) {
    return { status: false };
  }
};


module.exports.taxHistoryType = async (req, res) => {
  try {
    // Use req.query.date and req.query.description
    const { id } = req.params;

    // Call the service function with the parameters
    const result = await TaxpayerService.taxHistoryType(id);
    
    // Log the result
    console.log(result);

    // Return the result as a JSON response with a status code of 200
    return res.status(200).json(result);

  } catch (error) {
    console.error(`Error in controller: ${error.message}`);
    return res.status(500).json({ status: false, message: error.message });
  }
};


