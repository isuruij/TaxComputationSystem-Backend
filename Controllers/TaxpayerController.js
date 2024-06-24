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
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await TaxpayerService.addTaxpayer(req.body);

    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    } else if (result.message == "already registered email") {
      return res.json({ status: false, message: "already registered email" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.authenticateUser = async (req, res) => {
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
    if (
      req.body.email == undefined ||
      req.body.email == "" ||
      req.body.id == undefined ||
      req.body.id == ""
    ) {
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
    const result = await TaxpayerService.updatePassword(
      req.cookies.token,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return { status: false };
  }
};

// thimira file upload
module.exports.fileUpload = async (req, res) => {
  try {
    const userId = req.params.userId;
    const files = req.files;
    const ids = req.body.fileIds;

    // Check if no files were uploaded
    if (!files || files.length === 0) {
      return res.status(400).json({ Status: "No files selected" });
    }

    // Ensure ids is an array even if there's only one ID
    const idsArray = Array.isArray(ids) ? ids : [ids];

    // Combine files and their respective IDs
    const fileData = files.map((file, index) => ({
      ...file,
      id: idsArray[index],
    }));

    // Call the service to handle the file data
    await TaxpayerService.fileUpload(userId, fileData);

    // Respond to the client
    return res.json({ Status: "Files uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error uploading files" });
  }
};

//get name and tin
module.exports.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await TaxpayerService.getUserDetails(id);
    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    } else {
      return res.status(400).json({ Status: "NotSuccess" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get tax calculations(under development)
module.exports.getTaxCalDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await TaxpayerService.getTaxCalDetails(id);
    if (result.status) {
      return res.json({
        Status: "Success",
        Data: result.data,
        Data2: result.data2,
      });
    } else {
      return res.status(400).json({ Status: "NotSuccess" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getNotifications = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await TaxpayerService.getNotifications(req.params.id);

    // console.log(result.data);
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
