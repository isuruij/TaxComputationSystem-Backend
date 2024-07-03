const TaxpayerService = require("../Services/TaxpayerService");
const { Taxpayer } = require("../models");
const path = require("path");

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
    const protocol = req.protocol;
    const host = req.get("host");
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
    await TaxpayerService.fileUpload(userId, fileData, host, protocol);

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
    console.log(id);

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

//get tax calculations
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

//generate Tax Report
module.exports.generateTaxReport = async (req, res) => {
  try {
    const id = req.params.id;
    const protocol = req.protocol;
    const host = req.get("host");

    const result = await TaxpayerService.generateTaxReport(id, protocol, host);
    if (result.status) {
      return res.json({
        Status: "Successfully Generated",
      });
    } else {
      return res.status(400).json({ Status: result.msg });
    }
  } catch (error) {
    res.status(500).send("Error generating tax report");
  }
};

//download Tax Report
module.exports.downloadSummaryReport = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await TaxpayerService.downloadSummaryReport(id);
    if (result.status) {
      return res.json({
        Status: "Successfull",
        Data: result.data,
      });
    } else {
      return res.status(400).json({ Status: result.msg });
    }
  } catch (error) {
    res.status(500).send("Error generating tax report");
  }
};

//tax report download
// module.exports.taxReportDownload = async (req, res) => {
//   try {
//     const { id, filename } = req.params;
//     const filePath = path.join(__dirname, "public", "files", id, filename);

//     res.download(filePath, filename, (err) => {
//       if (err) {
//         console.error("Error downloading file:", err);
//         return res.status(500).json({ Status: "Error downloading file" });
//       }
//     });
//   } catch (error) {
//     res.status(500).send("Error downloading tax report");
//   }
// };

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

module.exports.getCalculatedTax = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await TaxpayerService.getCalculatedTax(req.params.id);

    if (result.status) {
      return res
        .status(200)
        .json({ Status: "successfully fetched", Data: result.data });
    } else {
      return res.status(400).json({ Status: "Error fetching taxes" });
    }
  } catch (error) {
    return res.status(500).send("Error fetching taxes");
  }
};

module.exports.getTaxPayments = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await TaxpayerService.getTaxPayments(req.params.id);

    if (result.status) {
      return res
        .status(200)
        .json({ Status: "successfully fetched", Data: result.data });
    } else {
      return res.status(400).json({ Status: "Error fetching taxes" });
    }
  } catch (error) {
    return res.status(500).send("Error fetching taxes");
  }
};

module.exports.deleteTaxPayment = async (req, res) => {
  try {
    console.log(req.params.taxpaymentid);
    const result = await TaxpayerService.deleteTaxPayment(req.params.taxpaymentid);

    if (result.status) {
      return res
        .status(200)
        .json({ Status: "successfully Deleted"});
    } else {
      return res.status(400).json({ Status: "Error deleting tax payments" });
    }
  } catch (error) {
    return res.status(500).send("Error deleting tax payments");
  }
};

//post paid tax
module.exports.postpaidtax = async (req, res) => {
  try {
    console.log(req.body);
    const cat = req.body.category;
    const amnt = req.body.amount;
    const result = await TaxpayerService.postpaidtax(req.params.id, cat, amnt);
    if (result.status) {
      return res
        .status(200)
        .json({ Status: "successfully updated" });
    } else {
      return res.status(400).json({ Status: "Error posting Paid tax" });
    }
  } catch (error) {
    return res.status(500).send("Error fetching taxes");
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

//get income details

module.exports.getBusinessIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getBusinessIncomeByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getEmploymentIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getEmploymentIncomeByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getInvestmentIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getInvestmentIncomeByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getOtherIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getOtherIncomeByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCapitalValueGainByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getCapitalValueGainByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getReliefForExpenditureByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getReliefForExpenditureByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getReliefForRentIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getReliefForRentIncomeByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getQualifyingPaymentsByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getQualifyingPaymentsByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getTerminalBenefitsByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getTerminalBenefitsByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getWhtOnInvestmentIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getWhtOnInvestmentIncomeByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getWhtOnServiceFeeReceivedByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getWhtOnServiceFeeReceivedByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getWhtWhichIsNotDeductedByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getWhtWhichIsNotDeductedByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getApitByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getApitByTaxpayerId(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getSelfAssessmentPaymentByTaxpayerId = async (req, res) => {
  try {
    const result = await TaxpayerService.getSelfAssessmentPaymentByTaxpayerId(
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
