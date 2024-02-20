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
    // console.log(result)
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.authenticateTaxpayer = async (req, res) => {
  res.json({ Status: "Success", Data: req.name });
};

module.exports.loginTaxpayer = async (req, res) => {

  };

module.exports.logoutTaxpayer = async (req, res) => {
  res.clearCookie("token");
  res.json({ Status: "Success", Data: "Logged out" });
};
