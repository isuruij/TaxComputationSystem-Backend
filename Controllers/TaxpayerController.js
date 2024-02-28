const TaxpayerService = require("../Services/TaxpayerService");
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
