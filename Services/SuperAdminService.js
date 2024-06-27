const SuperAdminRepository = require("../Repositories/SuperAdminRepository");
const DataEntryRepository = require("../Repositories/DataEntryRepository");
const JwtService = require("../Services/JwtService");

module.exports.addSuperAdmin = async (data) => {
  try {
    if (data.adminType === "superadmin" || data.adminType == undefined) {
      const created = await SuperAdminRepository.addSuperAdmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "superAdmin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    } else {
      console.log("new here")
      const created = await DataEntryRepository.addSecondAdmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "superAdmin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addFirstAdmin = async (data) => {
  try {
    const created = await SuperAdminRepository.addFirstAdmin(data);
    if (created.status) {
      const tokenData = {
        id: created.id,
        name: data.name,
        role: "superAdmin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginSuperAdmin = async (data) => {
  try {
    const avalable = await SuperAdminRepository.loginSuperAdmin(data);
    if (avalable.status && avalable.type === "superAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "superAdmin",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else if (avalable.status && avalable.type === "secondAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "secondAdmin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNotifications = async (data) => {
  try {
    const result = await SuperAdminRepository.addNotifications(data);
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNotifications2 = async (data) => {
  try {
    const result = await SuperAdminRepository.addNotifications2(data);
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Dashboard
module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await SuperAdminRepository.getTaxpayers();
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};

module.exports.fetchTaxpayer = async (userId) => {
  try {
    const taxpayerName = await  SuperAdminRepository.fetchTaxpayer(userId);
    return taxpayerName;
  } catch (error) {
    throw new Error(`Error while geting taxpayer: ${error.message}`);
  }
};

module.exports.toggleApproval = async (taxpayerId,value) => {
  try {
    await SuperAdminRepository.toggleApproval(taxpayerId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.updateNoOfSubmissions = async (userId) => {
  try {
    await SuperAdminRepository.updateNoOfSubmissions(userId);
    return res.json({ message: "No of Submissions updated successfully" });
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};





//submissionlist
module.exports.getBusinessIncome = async (req, res) => {
  try {
    const businessIncome = await SuperAdminRepository.getBusinessIncome()
    return res.json(businessIncome);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};


// get income details




module.exports.getBusinessIncomeByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getBusinessIncomeByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching business income');
    }
};

module.exports.getEmployeeIncomeByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getEmployeeIncomeByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching employee income');
    }
};

module.exports.getInvestIncomeByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getInvestIncomeByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching investment income');
    }
};

module.exports.getOtherIncomeByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getOtherIncomeByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching other income');
    }
};


module.exports.getCapitalValueGainByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getCapitalValueGainByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching capital value gain');
    }
};

module.exports.getApitByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getApitByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching APIT');
    }
};

module.exports.getReliefForExpenditureByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getReliefForExpenditureByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching relief for expenditure');
    }
};

module.exports.getReliefForRentIncomeByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getReliefForRentIncomeByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching relief for rent income');
    }
};

module.exports.getSelfAssessmentPaymentByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getSelfAssessmentPaymentByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching self assessment payment');
    }
};

module.exports.getTerminalBenefitsByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getTerminalBenefitsByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching terminal benefits');
    }
};

module.exports.getWhtOnInvestmentIncomeByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getWhtOnInvestmentIncomeByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching WHT on investment income');
    }
};

module.exports.getWhtOnServiceFeeReceivedByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getWhtOnServiceFeeReceivedByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching WHT on service fee received');
    }
};

module.exports.getWhtWhichIsNotDeductedByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getWhtWhichIsNotDeductedByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching WHT which is not deducted');
    }
};

module.exports.getQualifyingPaymentsByTaxpayerId = async (taxpayerId) => {
    try {
        return await SuperAdminRepository.getQualifyingPaymentsByTaxpayerId(taxpayerId);
    } catch (error) {
        throw new Error('Error fetching qualifying payments');
    }
};


//verify buttons
module.exports.verifyBusinessIncome = async (incomeId,value) => {
  try {
    await SuperAdminRepository.verifyBusinessIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.verifyEmploymentIncome = async (incomeId,value) => {
  try {
    await SuperAdminRepository.verifyEmploymentIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.verifyInvestmentIncome = async (incomeId,value) => {
  try {
    await SuperAdminRepository.verifyInvestmentIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.verifyOtherIncome = async (incomeId,value) => {
  try {
    await SuperAdminRepository.verifyOtherIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

// Add these functions in SuperAdminService.js

module.exports.verifyCapitalValueGain = async (incomeId, value) => {
  try {
    await SuperAdminRepository.verifyCapitalValueGain(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyReliefForExpenditure = async (incomeId, value) => {
  try {
    await SuperAdminRepository.verifyReliefForExpenditure(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyReliefForRentIncome = async (incomeId, value) => {
  try {
    await SuperAdminRepository.verifyReliefForRentIncome(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyQualifyingPayments = async (incomeId, value) => {
  try {
    await SuperAdminRepository.verifyQualifyingPayments(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyTerminalBenefits = async (incomeId, value) => {
  try {
    await SuperAdminRepository.verifyTerminalBenefits(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyApit = async (APITId, value) => {
  try {
    await SuperAdminRepository.verifyApit(APITId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};



module.exports.verifyWhtOnServiceFeeReceived = async (taxCreditId, value) => {
  try {
    await SuperAdminRepository.verifyWhtOnServiceFeeReceived(taxCreditId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (taxCreditId, value) => {
  try {
    await SuperAdminRepository.verifyWhtWhichIsNotDeducted(taxCreditId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (taxCreditId, value) => {
  try {
    await SuperAdminRepository.verifyWhtOnInvestmentIncome(taxCreditId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifySelfAssessmentPayment = async (paymentId, value) => {
  try {
    await SuperAdminRepository.verifySelfAssessmentPayment(paymentId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.requestDocument = async (taxpayerId, documentName) => {
  try {
    await SuperAdminRepository.requestDocument(taxpayerId, documentName);
    return { message: 'rquest document status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.requestAgainDocument = async (taxpayerId, documentName) => {
  try {
    await SuperAdminRepository.requestAgainDocument(taxpayerId, documentName);
    return { message: 'rquest document status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};


module.exports.createPolicy = async (data) => {
  try {
    const created = await SuperAdminRepository.createPolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.updatePolicy = async (data) => {
  try {
    const created = await SuperAdminRepository.updatePolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};



module.exports.deletePolicy = async (data) => {
  try {
    const created = await SuperAdminRepository.deletePolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.policy = async () => {
  try {
    const created = await SuperAdminRepository.policy();
    return created;
  } catch (error) {
    console.error(`Error in service: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.optionalpolicy = async () => {
  try {
    const created = await SuperAdminRepository.optionalpolicy();
    return created;
  } catch (error) {
    console.error(`Error in service: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.updateoptionalpolicy = async (data) => {
  try {
    const created = await SuperAdminRepository.updateoptionalpolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


//update submission status

module.exports.updateSubmissionStatusBusinessIncome = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusBusinessIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusEmploymentIncome = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusEmploymentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusInvestmentIncome = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusInvestmentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusOtherIncome = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusOtherIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusreliefForExpenditure = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusreliefForExpenditure(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusCapitalValueGain = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusCapitalValueGain(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusReliefForRentIncome = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusReliefForRentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusQualifyingPayments = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusQualifyingPayments(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusTerminalBenefits = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusTerminalBenefits(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtOnInvestmentIncome = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusWhtOnInvestmentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtOnServiceFeeReceived = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusWhtOnServiceFeeReceived(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtWhichIsNotDeducted = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusWhtWhichIsNotDeducted(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusApit = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusApit(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusSelfAssessmentPayment = async (incomeId) => {
  try {
    await SuperAdminRepository.updateSubmissionStatusSelfAssessmentPayment(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};


//Mailbox
module.exports.getinboxMail = async () => {
  try {
    const inboxMail = await SuperAdminRepository.getinboxMail();
    return inboxMail;
  } catch (error) {
    throw new Error(`Error while fetching inboxmail: ${error.message}`);
  }
};

module.exports.deletetInboxmail = async (emailId) => {
  try {
    await SuperAdminRepository.deletetInboxmail(emailId);
    return { message: 'Email deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting inboxmail: ${error.message}`);
  }
};

module.exports.getSentMail = async () => {
  try {
    const sentMail = await SuperAdminRepository.getSentMail();
    return sentMail;
  } catch (error) {
    throw new Error(`Error while fetching sentmail: ${error.message}`);
  }
};

module.exports.deleteSentMail = async (emailId) => {
  try {
    await SuperAdminRepository.deleteSentMail(emailId);
    return { message: 'Email deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting sentmail: ${error.message}`);
  }
};


const composeMail = require("../utils/composeMail");




module.exports.composemail = async (data) => {
  try {
    composeMail(data.to, data.subject, data.body);
    return { message: 'Email deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting sentmail: ${error.message}`);
  }
};