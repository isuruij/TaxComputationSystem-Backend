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


//Dashboard
module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await SuperAdminRepository.getTaxpayers();
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};

module.exports.deleteTaxpayer = async (taxpayerId) => {
  try {
    await SuperAdminRepository.deleteTaxpayer(taxpayerId);
    return { message: 'Taxpayer deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
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
