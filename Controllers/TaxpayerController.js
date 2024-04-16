const TaxpayerService = require("../Services/TaxpayerService");
const { Taxpayer } = require("../models");

module.exports.addTaxpayer = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.email == undefined ||
      req.body.email == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await TaxpayerService.addTaxpayer(req.body);

    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    }
    else if (result.message == "already registered email") {
      return res.json({ status: false, message: "already registered email" });
    }else{
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.authenticateTaxpayer = async (req, res) => {
  res.json({ Status: "Success", name: req.name });
};

module.exports.loginTaxpayer = async (req, res) => {
  if (
    req.body.email == undefined ||
    req.body.email == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    return res.status(400).json({ status: false, message: "empty fields" });
  }
  const result = await TaxpayerService.loginTaxpayer(req.body);

  if (!result.status) {
    console.log("failed login");
    res.json({ Status: "Failed" });
  } else {
    res.cookie("token", result.token);
    res.json({ Status: "Success" });
  }
};

module.exports.logoutTaxpayer = async (req, res) => {
  res.clearCookie("token");
  res.json({ Status: "Success", Data: "Logged out" });
};

module.exports.verifyEmail = async (req, res) => {
  const emailToken = req.body.emailToken;
  if (!emailToken) {
    return res.status(400).json({ status: "Failed", error: "empty request" });
  }
  const result = await TaxpayerService.verifyEmail(emailToken);
  return res.json(result);
};

module.exports.updateBasicDetails = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (req.body.email == undefined || req.body.email == "" || req.body.id == undefined || req.body.id == ""  ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await TaxpayerService.updateBasicDetails(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    }

    if (result.message == "already registered email") {
      return res.json({
        Status: "NotSuccess",
        message: "already registered email",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ Status: "NotSuccess", message: error.message });
  }
};

module.exports.getBasicDetails = async (req, res) => {
  try {
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
      return res.json({ Status: "Success" });
    }
    if (result.message == "Email not found") {
      return res.json({ Status: "NotSuccess", message: "Email not found" });
    }
  } catch (error) {
    return res.status(400).json({ Status: "NotSuccess" });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const result = await TaxpayerService.resetPassword(id, token);
    if (result.status) {
      return res.json({ Status: "Verified" });
    } else {
      return res.status(200).json({ Status: "NotVerified" });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ Status: "NotVerified", message: error.message });
  }
};

module.exports.addNewPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const newPassword = req.body.password;
    const result = await TaxpayerService.addNewPassword(id, token, newPassword);
    if (result.status) {
      return res.json({ Status: "Verified" });
    } else {
      return res.status(200).json({ Status: "NotVerified" });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ Status: "NotVerified", message: error.message });
  }
};

module.exports.getuserincomedetails = async (req, res) => {
  try {

    const result = await TaxpayerService.getuserincomedetails(req.params.id);

    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.updateincomedetails = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    const result = await TaxpayerService.updateincomedetails(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else {
      return res.status(400).json({ Status: "NotSuccess" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ Status: "NotSuccess", message: error.message });
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

module.exports.updatePassword = async (req, res) => {
  try {
    const result = await TaxpayerService.updatePassword(req.cookies.token,req.body);
    return res.status(200).json(result);
  } catch (error) {
    return { status: false };
  }
};
