const SuperAdminService = require("../Services/SuperAdminService");
const { SuperAdmin } = require("../models");

module.exports.addSuperAdmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }
    console.log("came here");
    const result = await SuperAdminService.addSuperAdmin(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else if (result.message == "already registered user") {
      return res.json({ status: false, message: "already registered user" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.addFirstAdmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await SuperAdminService.addFirstAdmin(req.body);

    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    } else if (result.message == "user exist") {
      return res.json({ Status: "Failed", message: "user exist" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.loginSuperAdmin = async (req, res) => {
  if (
    req.body.userName == undefined ||
    req.body.userName == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    return res.status(400).json({ status: false, message: "empty fields" });
  }
  const result = await SuperAdminService.loginSuperAdmin(req.body);
  if (!result.status) {
    res.json({ Status: "Failed" });
  } else {
    if (result.type === "superAdmin") {
      res.cookie("token", result.token);
      res.json({ Status: "Success", Type: "superAdmin" });
    } else {
      res.cookie("token", result.token);
      res.json({ Status: "Success", Type: "secondAdmin" });
    }
  }
};

module.exports.addNotifications = async (req, res) => {
  try {
    const result = await SuperAdminService.addNotifications(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.addNotifications2 = async (req, res) => {
  try {
    const result = await SuperAdminService.addNotifications2(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

//Dashboard
module.exports.getTaxpayers = async (req, res) => {
  try {
    const taxpayers = await SuperAdminService.getTaxpayers();
    return res.json(taxpayers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteTaxpayer = async (req, res) => {
  try {
    await SuperAdminService.deleteTaxpayer(req.params.id);
    return res.json({ message: "Taxpayer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.toggleApproval = async (req, res) => {
  try {
    await SuperAdminService.toggleApproval(
      req.body.id,
      req.body.isVerifiedUser
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.fetchTaxpayer = async (req, res) => {
  try {
    const taxpayerName = await SuperAdminService.fetchTaxpayer(
      req.params.userId
    );
    return res.json(taxpayerName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateNoOfSubmissions = async (req, res) => {
  try {
    await SuperAdminService.updateNoOfSubmissions(req.params.userId);
    return res.json({ message: "No of Submissions updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//SubmissionList
module.exports.getBusinessIncome = async (req, res) => {
  try {
    const businessIncome = await SuperAdminService.getBusinessIncome();
    return res.json(businessIncome);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get income details

module.exports.getBusinessIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await SuperAdminService.getBusinessIncomeByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getEmployeeIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await SuperAdminService.getEmployeeIncomeByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getInvestIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await SuperAdminService.getInvestIncomeByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getOtherIncomeByTaxpayerId = async (req, res) => {
  try {
    const result = await SuperAdminService.getOtherIncomeByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCapitalValueGain = async (req, res) => {
  try {
    const result = await SuperAdminService.getCapitalValueGainByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getApit = async (req, res) => {
  try {
    const result = await SuperAdminService.getApitByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getReliefForExpenditure = async (req, res) => {
  try {
    const result = await SuperAdminService.getReliefForExpenditureByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getReliefForRentIncome = async (req, res) => {
  try {
    const result = await SuperAdminService.getReliefForRentIncomeByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getSelfAssessmentPayment = async (req, res) => {
  try {
    const result = await SuperAdminService.getSelfAssessmentPaymentByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getTerminalBenefits = async (req, res) => {
  try {
    const result = await SuperAdminService.getTerminalBenefitsByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getWhtOnInvestmentIncome = async (req, res) => {
  try {
    const result = await SuperAdminService.getWhtOnInvestmentIncomeByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getWhtOnServiceFeeReceived = async (req, res) => {
  try {
    const result =
      await SuperAdminService.getWhtOnServiceFeeReceivedByTaxpayerId(
        req.params.taxpayerId
      );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getWhtWhichIsNotDeducted = async (req, res) => {
  try {
    const result = await SuperAdminService.getWhtWhichIsNotDeductedByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getQualifyingPayments = async (req, res) => {
  try {
    const result = await SuperAdminService.getQualifyingPaymentsByTaxpayerId(
      req.params.taxpayerId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//verify buttons
module.exports.verifyBusinessIncome = async (req, res) => {
  try {
    await SuperAdminService.verifyBusinessIncome(
      req.body.incomeId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyEmploymentIncome = async (req, res) => {
  try {
    await SuperAdminService.verifyEmploymentIncome(
      req.body.incomeId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.verifyInvestmentIncome(
      req.body.incomeId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyOtherIncome = async (req, res) => {
  try {
    await SuperAdminService.verifyOtherIncome(
      req.body.incomeId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.verifyCapitalValueGain = async (req, res) => {
  try {
    await SuperAdminService.verifyCapitalValueGain(
      req.body.assessmentId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyReliefForExpenditure = async (req, res) => {
  try {
    await SuperAdminService.verifyReliefForExpenditure(
      req.body.reliefid,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyReliefForRentIncome = async (req, res) => {
  try {
    await SuperAdminService.verifyReliefForRentIncome(
      req.body.reliefid,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyQualifyingPayments = async (req, res) => {
  try {
    await SuperAdminService.verifyQualifyingPayments(
      req.body.reliefid,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyTerminalBenefits = async (req, res) => {
  try {
    await SuperAdminService.verifyTerminalBenefits(
      req.body.assessmentId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyApit = async (req, res) => {
  try {
    await SuperAdminService.verifyApit(req.body.APITId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyWhtOnServiceFeeReceived = async (req, res) => {
  try {
    await SuperAdminService.verifyWhtOnServiceFeeReceived(
      req.body.taxCreditId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (req, res) => {
  try {
    await SuperAdminService.verifyWhtWhichIsNotDeducted(
      req.body.assessmentId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.verifyWhtOnInvestmentIncome(
      req.body.taxCreditId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifySelfAssessmentPayment = async (req, res) => {
  try {
    await SuperAdminService.verifySelfAssessmentPayment(
      req.body.taxCreditId,
      req.body.isverified
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.requestDocument = async (req, res) => {
  try {
    await SuperAdminService.requestDocument(
      req.body.taxpayerId,
      req.body.documentName
    );
    return res.json({ message: "rquest document status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.requestAgainDocument = async (req, res) => {
  try {
    await SuperAdminService.requestAgainDocument(
      req.body.taxpayerId,
      req.body.documentName
    );
    return res.json({ message: "rquest document status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createPolicy = async (req, res) => {
  try {
    if (req.body.title == undefined || req.body.title == "") {
      return res.status(400).json({ status: false, message: "empty fields" });
    }
    console.log("hhhjjhjjj");
    const result = await SuperAdminService.createPolicy(req.body);

    //console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return { status: false };
  }
};

module.exports.updatePolicy = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }
    const result = await SuperAdminService.updatePolicy(req.body);
    if (result.status) {
      return res.json({ Status: "Success" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ Status: "NotSuccess", message: error.message });
  }
};

module.exports.deletePolicy = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }
    console.log("tttttttnnnnnnnnnnn");
    console.log(req.body);
    const result = await SuperAdminService.deletePolicy(req.body);

    if (result.status) {
      console.log("sucesssssssss");
      return res.json({ Status: "Success" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ Status: "NotSuccess", message: error.message });
  }
};

module.exports.policy = async (req, res) => {
  try {
    const result = await SuperAdminService.policy();
    console.log("------------------");
    // Return the result as a JSON response with a status code of 200
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Error in controller: ${error.message}`);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.authtsuperAdmin = async (req, res) => {
  res.json({ Status: "Success", name: req.name });
};

//update request and request agaian


module.exports.updateRequestBusinessIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestBusinessIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestEmploymentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestEmploymentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestInvestmentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestOtherIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestOtherIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestCapitalValueGain = async (req, res) => {
  try {
    await SuperAdminService.updateRequestCapitalValueGain(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestReliefForExpenditure = async (req, res) => {
  try {
    await SuperAdminService.updateRequestReliefForExpenditure(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestReliefForRentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestReliefForRentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestSelfAssessmentPayment = async (req, res) => {
  try {
    await SuperAdminService.updateRequestSelfAssessmentPayment(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestTerminalBenefits = async (req, res) => {
  try {
    await SuperAdminService.updateRequestTerminalBenefits(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestQualifyingPayments = async (req, res) => {
  try {
    await SuperAdminService.updateRequestQualifyingPayments(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestWhtOnInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestWhtOnInvestmentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestWhtOnServiceFeeReceived = async (req, res) => {
  try {
    await SuperAdminService.updateRequestWhtOnServiceFeeReceived(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestWhtWhichIsNotDeducted = async (req, res) => {
  try {
    await SuperAdminService.updateRequestWhtWhichIsNotDeducted(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestApit = async (req, res) => {
  try {
    await SuperAdminService.updateRequestApit(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Again functions

module.exports.updateRequestAgainBusinessIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainBusinessIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainEmploymentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainEmploymentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainInvestmentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainOtherIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainOtherIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainCapitalValueGain = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainCapitalValueGain(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainReliefForExpenditure = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainReliefForExpenditure(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainReliefForRentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainReliefForRentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainSelfAssessmentPayment = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainSelfAssessmentPayment(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainTerminalBenefits = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainTerminalBenefits(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainQualifyingPayments = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainQualifyingPayments(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainWhtOnInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainWhtOnInvestmentIncome(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainWhtOnServiceFeeReceived = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainWhtOnServiceFeeReceived(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainWhtWhichIsNotDeducted = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainWhtWhichIsNotDeducted(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateRequestAgainApit = async (req, res) => {
  try {
    await SuperAdminService.updateRequestAgainApit(req.params.incomeId);
    return res.json({ message: "request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update submission status

module.exports.updateSubmissionStatusBusinessIncome = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusBusinessIncome(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusEmploymentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusEmploymentIncome(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusInvestmentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusInvestmentIncome(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusOtherIncome = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusOtherIncome(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusCapitalValueGain = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusCapitalValueGain(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusReliefForRentIncome = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusReliefForRentIncome(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusQualifyingPayments = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusQualifyingPayments(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusTerminalBenefits = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusTerminalBenefits(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusWhtOnInvestmentIncome = async (
  req,
  res
) => {
  try {
    await SuperAdminService.updateSubmissionStatusWhtOnInvestmentIncome(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusWhtOnServiceFeeReceived = async (
  req,
  res
) => {
  try {
    await SuperAdminService.updateSubmissionStatusWhtOnServiceFeeReceived(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusWhtWhichIsNotDeducted = async (
  req,
  res
) => {
  try {
    await SuperAdminService.updateSubmissionStatusWhtWhichIsNotDeducted(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusApit = async (req, res) => {
  try {
    await SuperAdminService.updateSubmissionStatusApit(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusSelfAssessmentPayment = async (
  req,
  res
) => {
  try {
    await SuperAdminService.updateSubmissionStatusSelfAssessmentPayment(
      req.params.incomeId
    );
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusreliefForExpenditure = async (
  req,
  res
) => {
  try {
    await SuperAdminService.updateSubmissionStatusreliefForExpenditure(
      req.params.incomeId
    );
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Mailbox
module.exports.getinboxMail = async (req, res) => {
  try {
    const inboxMail = await SuperAdminService.getinboxMail();
    return res.json(inboxMail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deletetInboxmail = async (req, res) => {
  try {
    await SuperAdminService.deletetInboxmail(req.params.emailId);
    return res.json({ message: "Inboxmail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getSentMail = async (req, res) => {
  try {
    const sentMail = await SuperAdminService.getSentMail();
    return res.json(sentMail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteSentMail = async (req, res) => {
  try {
    await SuperAdminService.deleteSentMail(req.params.emailId);
    return res.json({ message: "sentmail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.composemail = async (req, res) => {
  try {
    console.log(req.body);
    await SuperAdminService.composemail(req.body);
    return res.json({ message: "mail sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getReport = async (req, res) => {
  try {
    const report = await SuperAdminService.getReport();
    return res.json({
      message: "Successfully Fetched reports",
      data: report.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyTaxReport = async (req, res) => {
  try {
    const { reportId } = req.body;
    const result = await SuperAdminService.verifyTaxReport(reportId);
    return res.json({
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.updatePassword = async (req, res) => {
  try {
    const result = await SuperAdminService.updatePassword(
      req.cookies.token,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return { status: false };
  }
};

module.exports.getname = async (req, res) => {
  try {
    const result = await SuperAdminService.getname(
      req.cookies.token,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return { status: false };
  }
};

module.exports.updatename = async (req, res) => {
  try {
    const result = await SuperAdminService.updatename(
      req.cookies.token,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return { status: false };
  }
};