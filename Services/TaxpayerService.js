const TaxpayerRepository = require("../Repositories/TaxpayerRepository");
const JwtService = require("../Services/JwtService");

module.exports.addTaxpayer = async (data) => {
  try {
    const created = await TaxpayerRepository.addTaxpayer(data);
    if (created.status) {
      const tokenData = { id: created.id, name: data.name, role: "taxpayer" };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else if (created.message == "already registered email") {
      return { status: false, message: "already registered email" };
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginTaxpayer = async (data) => {
  try {
    const avalable = await TaxpayerRepository.loginTaxpayer(data);

    if (avalable.status) {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "taxpayer",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else {
      return { status: false, message: "Invalid credentials" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateBasicDetails = async (data) => {
  try {
    const created = await TaxpayerRepository.updateBasicDetails(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getBasicDetails = async (id) => {
  try {
    const created = await TaxpayerRepository.getBasicDetails(id);
    if (created.status) {
      return { status: true, data: created.data };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.forgotPassword = async (email) => {
  try {
    const created = await TaxpayerRepository.forgotPassword(email);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.resetPassword = async (id, token) => {
  try {
    const created = await TaxpayerRepository.resetPassword(id, token);
    if (created.status) {
      return { status: true };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNewPassword = async (id, token, newPassword) => {
  try {
    const created = await TaxpayerRepository.addNewPassword(
      id,
      token,
      newPassword
    );
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getuserincomedetails = async (id) => {
  try {
    const created = await TaxpayerRepository.getuserincomedetails(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateincomedetails = async (data) => {
  try {
    const created = await TaxpayerRepository.updateincomedetails(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.verifyEmail = async (emailToken) => {
  try {
    const created = await TaxpayerRepository.verifyEmail(emailToken);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getNotifications = async (id) => {
  try {
    const created = await TaxpayerRepository.getNotifications(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updatePassword = async (token, data) => {
  try {
    const created = await TaxpayerRepository.updatePassword(token, data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// thimira file upload part
module.exports.fileUpload = async (userId, fileData, host, protocol) => {
  try {
    // Process the files as needed (e.g., save to the database)
    await TaxpayerRepository.fileUpload(userId, fileData, host, protocol);
  } catch (error) {
    throw new Error("Error processing files: " + error.message);
  }
};

//get tin and name
module.exports.getUserDetails = async (userId) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await TaxpayerRepository.getUserDetails(userId);

    if (values.status) {
      return { status: true, data: values.data };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false };
  }
};

//get tax calculations
module.exports.getTaxCalDetails = async (userId) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await TaxpayerRepository.getTaxCalDetails(userId);

    if (values.status) {
      return { status: true, data: values.data, data2: values.data2 };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false };
  }
};

//generate tax report
module.exports.generateTaxReport = async (userId, protocol, host) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await TaxpayerRepository.generateTaxReport(
      userId,
      protocol,
      host
    );
    if (values.status) {
      return { status: true };
    } else {
      return { status: false, msg: values.msg };
    }
  } catch (error) {
    return { status: false, msg: "Error generateTaxReport in service" };
  }
};

//download tax report
module.exports.downloadSummaryReport = async (userId) => {
  try {
    if (!userId) {
      return { status: false };
    }
    const values = await TaxpayerRepository.downloadSummaryReport(userId);
    if (values.status) {
      return { status: true, data: values.data };
    } else {
      return { status: false, msg: values.msg };
    }
  } catch (error) {
    return { status: false, msg: "Error generateTaxReport in service" };
  }
};

module.exports.getNotifications = async (id) => {
  try {
    const created = await TaxpayerRepository.getNotifications(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getCalculatedTax = async (id) => {
  try {
    const created = await TaxpayerRepository.getCalculatedTax(id);
    if (created.status) {
      return { status: true, data: created.data };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getTaxPayments = async (id) => {
  try {
    const created = await TaxpayerRepository.getTaxPayments(id);
    if (created.status) {
      return { status: true, data: created.data };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.deleteTaxPayment = async (id) => {
  try {
    const created = await TaxpayerRepository.deleteTaxPayment(id);
    if (created.status) {
      return { status: true};
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.postpaidtax = async (id, cat, amnt) => {
  try {
    const created = await TaxpayerRepository.postpaidtax(id, cat, amnt);
    if (created.status) {
      return { status: true};
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false};
  }
};

module.exports.updateNotificationStatus = async (id) => {
  try {
    const created = await TaxpayerRepository.updateNotificationStatus(id);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// get income details

module.exports.getBusinessIncomeByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getBusinessIncomeByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching business income");
  }
};

module.exports.getEmploymentIncomeByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getEmploymentIncomeByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching employment income");
  }
};

module.exports.getInvestmentIncomeByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getInvestmentIncomeByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching investment income");
  }
};

module.exports.getOtherIncomeByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getOtherIncomeByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching other income");
  }
};

module.exports.getCapitalValueGainByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getCapitalValueGainByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching capital value gain");
  }
};

module.exports.getReliefForExpenditureByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getReliefForExpenditureByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching relief for expenditure");
  }
};

module.exports.getReliefForRentIncomeByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getReliefForRentIncomeByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching relief for rent income");
  }
};

module.exports.getQualifyingPaymentsByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getQualifyingPaymentsByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching qualifying payments");
  }
};

module.exports.getTerminalBenefitsByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getTerminalBenefitsByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching terminal benefits");
  }
};

module.exports.getWhtOnInvestmentIncomeByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getWhtOnInvestmentIncomeByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching withholding tax on investment income");
  }
};

module.exports.getWhtOnServiceFeeReceivedByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getWhtOnServiceFeeReceivedByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching withholding tax on service fee received");
  }
};

module.exports.getWhtWhichIsNotDeductedByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getWhtWhichIsNotDeductedByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching withholding tax which is not deducted");
  }
};

module.exports.getApitByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getApitByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching APIT");
  }
};

module.exports.getSelfAssessmentPaymentByTaxpayerId = async (id) => {
  try {
    return await TaxpayerRepository.getSelfAssessmentPaymentByTaxpayerId(id);
  } catch (error) {
    throw new Error("Error fetching self-assessment payment");
  }
};

// mail box
module.exports.composemail = async (userId,data) => {
  try {
    // composeMail(data.to, data.subject, data.body);
    TaxpayerRepository.addsendmail(userId,data.to, data.subject, data.body);
    return { message: 'Email deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting sentmail: ${error.message}`);
  }
};
