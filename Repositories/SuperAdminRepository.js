const bcrypt = require("bcrypt");
const {
  SuperAdmin,
  SecondAdmin,
  Notification,
  Policies,
  TaxSummaryReport,
} = require("../models");
const jwt = require("jsonwebtoken");
const sendRequestAgainDocument = require("../utils/sendRequestAgainDocuments");
const sendRequestDocuments = require("../utils/sendRequestDocuments");

module.exports.addSuperAdmin = async (obj) => {
  try {
    const existingUser1 = await SuperAdmin.findOne({
      where: { userName: obj.userName },
    });
    const existingUser2 = await SecondAdmin.findOne({
      where: { userName: obj.userName },
    });

    if (existingUser1 || existingUser2) {
      return { status: false, message: "already registered user" };
    }
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    const res = await SuperAdmin.create(data);

    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.addFirstAdmin = async (obj) => {
  try {
    const count = await SuperAdmin.count();
    if (count == 0) {
      const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
      var data = obj;
      data.password = hashedPw;
      data.password = obj.password;
      const res = await SuperAdmin.create(data);

      return { status: true, id: res.dataValues.id };
    } else {
      return { status: false, message: "user exist" };
    }
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginSuperAdmin = async (obj) => {
  try {
    const superAdmin = await SuperAdmin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (superAdmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        superAdmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: superAdmin.dataValues.name,
          id: superAdmin.dataValues.id,
          type: "superAdmin",
        };
      }
    }

    const secondAdmin = await SecondAdmin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (secondAdmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        secondAdmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: secondAdmin.dataValues.name,
          id: secondAdmin.dataValues.id,
          type: "secondAdmin",
        };
      }
    }

    return { status: false, message: "Admin not found" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNotifications = async (obj) => {
  try {
    // Assuming obj contains the necessary fields to create a Notification
    const { taxpayerId, documentName } = obj;
    console.log(obj);

    // Create a new notification
    const newNotification = await Notification.create({
      message: `submit your ${documentName} document`,
      isViewed: false, // Default value, can be omitted if not needed
      taxpayerId: taxpayerId,
    });

    return { status: true, data: newNotification };
  } catch (error) {
    console.error("Error adding notification:", error);
    return { status: false, error: error.message };
  }
};

module.exports.addNotifications2 = async (obj) => {
  try {
    // Assuming obj contains the necessary fields to create a Notification
    const { taxpayerId, documentName } = obj;
    console.log(obj);

    // Create a new notification
    const newNotification = await Notification.create({
      message: `submit your ${documentName} document Again Please check your email for more detail`,
      isViewed: false, // Default value, can be omitted if not needed
      taxpayerId: taxpayerId,
    });

    return { status: true, data: newNotification };
  } catch (error) {
    console.error("Error adding notification:", error);
    return { status: false, error: error.message };
  }
};

//Dashboard
const { Taxpayer } = require("../models");

module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await Taxpayer.findAll();
    console.log(taxpayers);
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};

module.exports.deleteTaxpayer = async (taxpayerId) => {
  try {
    //check wether taxpayerid exsits
    const existTaxpayer = await Taxpayer.findOne({ where: { id: taxpayerId } });
    if (existTaxpayer) {
      await Taxpayer.destroy({ where: { id: taxpayerId } });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};

module.exports.toggleApproval = async (taxpayerId, value) => {
  try {
    const existTaxpayer = await Taxpayer.findOne({ where: { id: taxpayerId } });
    console.log(taxpayerId, value);
    if (existTaxpayer) {
      await existTaxpayer.update({ isVerifiedUser: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};

module.exports.fetchTaxpayer = async (userId) => {
  try {
    const existTaxpayer = await Taxpayer.findOne({ where: { id: userId } });
    if (existTaxpayer) {
      return existTaxpayer.name;
    } else {
      throw new Error("Taxpayer not found");
    }
  } catch (error) {
    throw new Error(`Error while fetching taxpayer: ${error.message}`);
  }
};

module.exports.updateNoOfSubmissions = async (userId) => {
  try {
    const taxpayer = await Taxpayer.findOne({ where: { id: userId } });
    if (!taxpayer) {
      throw new Error("Taxpayer not found");
    }
    taxpayer.numOfSubmissions -= 1;
    await taxpayer.save();
    return taxpayer;
  } catch (error) {
    throw new Error(
      `Error while updating number of submissions: ${error.message}`
    );
  }
};

//submissionList

module.exports.getBusinessIncome = async () => {
  try {
    const BusinessIncome = await businessIncome.findAll();
    console.log(BusinessIncome);
    return BusinessIncome;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};

//get income details
const {
  businessIncome,
  employmentIncome,
  investmentIncome,
  otherIncome,
  capitalValueGain,
  reliefForExpenditure,
  reliefForRentIncome,
  qualifyingPayments,
  terminalBenefits,
  whtOnInvestmentIncome,
  whtOnServiceFeeReceived,
  whtWhichIsNotDeducted,
  apit,
  selfAssessmentPayment,
} = require("../models");

module.exports.getBusinessIncomeByTaxpayerId = async (taxpayerId) => {
  return await businessIncome.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getEmployeeIncomeByTaxpayerId = async (taxpayerId) => {
  return await employmentIncome.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getInvestIncomeByTaxpayerId = async (taxpayerId) => {
  return await investmentIncome.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getOtherIncomeByTaxpayerId = async (taxpayerId) => {
  return await otherIncome.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getCapitalValueGainByTaxpayerId = async (taxpayerId) => {
  return await capitalValueGain.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getApitByTaxpayerId = async (taxpayerId) => {
  return await apit.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getReliefForExpenditureByTaxpayerId = async (taxpayerId) => {
  return await reliefForExpenditure.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

module.exports.getReliefForRentIncomeByTaxpayerId = async (taxpayerId) => {
  return await reliefForRentIncome.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

module.exports.getSelfAssessmentPaymentByTaxpayerId = async (taxpayerId) => {
  return await selfAssessmentPayment.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

module.exports.getTerminalBenefitsByTaxpayerId = async (taxpayerId) => {
  return await terminalBenefits.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getWhtOnInvestmentIncomeByTaxpayerId = async (taxpayerId) => {
  return await whtOnInvestmentIncome.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

module.exports.getWhtOnServiceFeeReceivedByTaxpayerId = async (taxpayerId) => {
  return await whtOnServiceFeeReceived.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

module.exports.getWhtWhichIsNotDeductedByTaxpayerId = async (taxpayerId) => {
  return await whtWhichIsNotDeducted.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

module.exports.getQualifyingPaymentsByTaxpayerId = async (taxpayerId) => {
  return await qualifyingPayments.findAll({
    where: { taxpayerId: taxpayerId },
  });
};

//verify button
module.exports.verifyBusinessIncome = async (incomeId, value) => {
  try {
    const existIncome = await businessIncome.findOne({
      where: { incomeId: incomeId },
    });

    console.log(incomeId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};

module.exports.verifyEmploymentIncome = async (incomeId, value) => {
  try {
    const existIncome = await employmentIncome.findOne({
      where: { incomeId: incomeId },
    });

    console.log(incomeId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};

module.exports.verifyInvestmentIncome = async (incomeId, value) => {
  try {
    const existIncome = await investmentIncome.findOne({
      where: { incomeId: incomeId },
    });

    console.log(incomeId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};
module.exports.verifyOtherIncome = async (incomeId, value) => {
  try {
    const existIncome = await otherIncome.findOne({
      where: { incomeId: incomeId },
    });

    console.log(incomeId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};

module.exports.verifyApit = async (APITId, value) => {
  try {
    const existIncome = await apit.findOne({ where: { APITId: APITId } });

    console.log(APITId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving APIT: ${error.message}`);
  }
};

module.exports.verifyWhtOnServiceFeeReceived = async (taxCreditId, value) => {
  try {
    const existIncome = await whtOnServiceFeeReceived.findOne({
      where: { taxCreditId: taxCreditId },
    });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving WHT on service fee received: ${error.message}`
    );
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (taxCreditId, value) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({
      where: { assessmentId: taxCreditId },
    });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving WHT which is not deducted: ${error.message}`
    );
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (taxCreditId, value) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({
      where: { taxCreditId: taxCreditId },
    });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving WHT on investment income: ${error.message}`
    );
  }
};

module.exports.verifySelfAssessmentPayment = async (paymentId, value) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({
      where: { taxCreditId: paymentId },
    });

    console.log(paymentId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving self-assessment payment: ${error.message}`
    );
  }
};

// Add these functions in SuperAdminRepository.js

module.exports.verifyCapitalValueGain = async (incomeId, value) => {
  try {
    const existIncome = await capitalValueGain.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Capital Value Gain: ${error.message}`
    );
  }
};

module.exports.verifyReliefForExpenditure = async (incomeId, value) => {
  try {
    const existIncome = await reliefForExpenditure.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Relief For Expenditure: ${error.message}`
    );
  }
};

module.exports.verifyReliefForRentIncome = async (incomeId, value) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Relief For Rent Income: ${error.message}`
    );
  }
};

module.exports.verifyQualifyingPayments = async (incomeId, value) => {
  try {
    const existIncome = await qualifyingPayments.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Qualifying Payments: ${error.message}`
    );
  }
};

module.exports.verifyTerminalBenefits = async (incomeId, value) => {
  try {
    const existIncome = await terminalBenefits.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Terminal Benefits: ${error.message}`
    );
  }
};

// request Document
module.exports.requestDocument = async (taxpayerId, documentName) => {
  try {
    console.log(taxpayerId);
    const taxpayer = await Taxpayer.findOne({ where: { id: taxpayerId } });

    sendRequestDocuments(taxpayer.name, taxpayer.email, documentName);
  } catch (error) {
    throw new Error(
      `Error while approving Terminal Benefits: ${error.message}`
    );
  }
};

module.exports.requestAgainDocument = async (taxpayerId, documentName) => {
  try {
    console.log(taxpayerId);
    const taxpayer = await Taxpayer.findOne({ where: { id: taxpayerId } });

    sendRequestAgainDocument(taxpayer.name, taxpayer.email, documentName);
  } catch (error) {
    throw new Error(
      `Error while approving Terminal Benefits: ${error.message}`
    );
  }
};

module.exports.createPolicy = async (data) => {
  try {
    console.log(data);
    await Policies.create({
      title: data.title,
      amount: data.amount,
      rate: data.rate,
      optional: true,
    });

    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false, message: error.message };
  }
};

module.exports.updatePolicy = async (obj) => {
  try {
    const { policyId, title, amount, rate } = obj;

    // Find the policy by ID
    const policy = await Policies.findByPk(policyId);

    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Update the policy fields
    policy.title = title;
    policy.amount = amount;
    policy.rate = rate;

    // Save the updated policy
    await policy.save();

    return { status: true };
  } catch (error) {
    console.error("Error updating policy:", error);
    return { status: false, error: error.message };
  }
};

module.exports.deletePolicy = async (data) => {
  try {
    // Find the policy by policyId
    const policy = await Policies.findOne({
      where: { policyId: data.policyId },
    });

    // Check if the policy exists
    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Check if the policy is optional
    if (!policy.optional) {
      console.log("-----------------------------");
      return {
        status: false,
        message: "Policy is not optional and cannot be deleted",
      };
    }

    // Delete the policy
    await Policies.destroy({ where: { policyId: data.policyId } });

    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false, message: `Error: ${error.message}` };
  }
};

module.exports.policy = async () => {
  try {
    // Query the database for records matching the given parameters
    const types = await Policies.findAll();
    return { status: true, data: types };
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};

module.exports.updateoptionalpolicy = async (obj) => {
  try {
    const { policyId, title, amount, rate } = obj;

    // Find the policy by ID
    const policy = await Policies.findByPk(policyId);

    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Update the policy fields
    policy.title = title;
    policy.amount = amount;
    policy.rate = rate;

    // Save the updated policy
    await policy.save();

    return { status: true };
  } catch (error) {
    console.error("Error updating policy:", error);
    return { status: false, error: error.message };
  }
};

//update request and request agaian
module.exports.updateRequestBusinessIncome = async (incomeId) => {
  try {
    const existIncome = await businessIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(`Error while requesting Business Income: ${error.message}`);
  }
};

module.exports.updateRequestEmploymentIncome = async (incomeId) => {
  try {
    const existIncome = await employmentIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Employment Income: ${error.message}`
    );
  }
};

module.exports.updateRequestInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await investmentIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Investment Income: ${error.message}`
    );
  }
};

module.exports.updateRequestOtherIncome = async (incomeId) => {
  try {
    const existIncome = await otherIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(`Error while requesting Other Income: ${error.message}`);
  }
};

module.exports.updateRequestCapitalValueGain = async (incomeId) => {
  try {
    const existIncome = await capitalValueGain.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Capital Value Gain: ${error.message}`
    );
  }
};

module.exports.updateRequestReliefForExpenditure = async (incomeId) => {
  try {
    const existIncome = await reliefForExpenditure.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Relief For Expenditure: ${error.message}`
    );
  }
};

module.exports.updateRequestReliefForRentIncome = async (incomeId) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Relief For Rent Income: ${error.message}`
    );
  }
};

module.exports.updateRequestSelfAssessmentPayment = async (incomeId) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Self Assessment Payment: ${error.message}`
    );
  }
};

module.exports.updateRequestTerminalBenefits = async (incomeId) => {
  try {
    const existIncome = await terminalBenefits.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Terminal Benefits: ${error.message}`
    );
  }
};

module.exports.updateRequestQualifyingPayments = async (incomeId) => {
  try {
    const existIncome = await qualifyingPayments.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Qualifying Payments: ${error.message}`
    );
  }
};

module.exports.updateRequestWhtOnInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Wht On Investment Income: ${error.message}`
    );
  }
};

module.exports.updateRequestWhtOnServiceFeeReceived = async (incomeId) => {
  try {
    const existIncome = await whtOnServiceFeeReceived.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Wht On Service Fee Received: ${error.message}`
    );
  }
};

module.exports.updateRequestWhtWhichIsNotDeducted = async (incomeId) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting Wht Which Is Not Deducted: ${error.message}`
    );
  }
};

module.exports.updateRequestApit = async (incomeId) => {
  try {
    const existIncome = await apit.findOne({ where: { APITId: incomeId } });
    if (existIncome) {
      await existIncome.update({ requested: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(`Error while requesting Apit: ${error.message}`);
  }
};

// Again functions

module.exports.updateRequestAgainBusinessIncome = async (incomeId) => {
  try {
    const existIncome = await businessIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Business Income: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainEmploymentIncome = async (incomeId) => {
  try {
    const existIncome = await employmentIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Employment Income: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await investmentIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Investment Income: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainOtherIncome = async (incomeId) => {
  try {
    const existIncome = await otherIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Other Income: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainCapitalValueGain = async (incomeId) => {
  try {
    const existIncome = await capitalValueGain.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Capital Value Gain: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainReliefForExpenditure = async (incomeId) => {
  try {
    const existIncome = await reliefForExpenditure.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Relief For Expenditure: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainReliefForRentIncome = async (incomeId) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Relief For Rent Income: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainSelfAssessmentPayment = async (incomeId) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Self Assessment Payment: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainTerminalBenefits = async (incomeId) => {
  try {
    const existIncome = await terminalBenefits.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Terminal Benefits: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainQualifyingPayments = async (incomeId) => {
  try {
    const existIncome = await qualifyingPayments.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Qualifying Payments: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainWhtOnInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Wht On Investment Income: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainWhtOnServiceFeeReceived = async (incomeId) => {
  try {
    const existIncome = await whtOnServiceFeeReceived.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Wht On Service Fee Received: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainWhtWhichIsNotDeducted = async (incomeId) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(
      `Error while requesting again Wht Which Is Not Deducted: ${error.message}`
    );
  }
};

module.exports.updateRequestAgainApit = async (incomeId) => {
  try {
    const existIncome = await apit.findOne({ where: { APITId: incomeId } });
    if (existIncome) {
      await existIncome.update({ requestedAgain: true });
    } else {
      return { message: "requested is sent" };
    }
  } catch (error) {
    throw new Error(`Error while requesting again Apit: ${error.message}`);
  }
};

//update submission status

module.exports.updateSubmissionStatusBusinessIncome = async (incomeId) => {
  try {
    const existIncome = await businessIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Business Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusEmploymentIncome = async (incomeId) => {
  try {
    const existIncome = await employmentIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Employment Income: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await investmentIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Investment Income: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusOtherIncome = async (incomeId) => {
  try {
    const existIncome = await otherIncome.findOne({
      where: { incomeId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Other Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusreliefForExpenditure = async (
  reliefid
) => {
  try {
    const existIncome = await reliefForExpenditure.findOne({
      where: { reliefid: reliefid },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Terminal Benefits: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusCapitalValueGain = async (incomeId) => {
  try {
    const existIncome = await capitalValueGain.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Capital Value Gain: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusReliefForRentIncome = async (incomeId) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Relief for Rent Income: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusQualifyingPayments = async (incomeId) => {
  try {
    const existIncome = await qualifyingPayments.findOne({
      where: { reliefid: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Qualifying Payments: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusTerminalBenefits = async (incomeId) => {
  try {
    const existIncome = await terminalBenefits.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Terminal Benefits: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusWhtOnInvestmentIncome = async (
  incomeId
) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving WHT on Investment Income: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusWhtOnServiceFeeReceived = async (
  incomeId
) => {
  try {
    const existIncome = await whtOnServiceFeeReceived.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving WHT on Service Fee Received: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusWhtWhichIsNotDeducted = async (
  incomeId
) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({
      where: { assessmentId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving WHT Which Is Not Deducted: ${error.message}`
    );
  }
};

module.exports.updateSubmissionStatusApit = async (incomeId) => {
  try {
    const existIncome = await apit.findOne({ where: { APITId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving APIT: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusSelfAssessmentPayment = async (
  incomeId
) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({
      where: { taxCreditId: incomeId },
    });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(
      `Error while approving Self Assessment Payment: ${error.message}`
    );
  }
};

//mailbox
const { EmailInbox } = require("../models");

module.exports.getinboxMail = async () => {
  try {
    const inboxMail = await EmailInbox.findAll({
      include: [
        {
          model: Taxpayer, // Assumes Taxpayer is already associated in the EmailInbox model
          as: "Taxpayer",
          attributes: ["name", "email", "id"], // Specify the fields you want to include from the Taxpayer table
        },
      ],
    });

    console.log(inboxMail);
    return inboxMail;
  } catch (error) {
    throw new Error(`Error while fetching inboxMail: ${error.message}`);
  }
};

module.exports.deletetInboxmail = async (emailId) => {
  try {
    //check wether taxpayerid exsits
    const existEmail = await EmailInbox.findOne({
      where: { emailId: emailId },
    });
    if (existEmail) {
      await EmailInbox.destroy({ where: { emailId: emailId } });
    } else {
      return { message: "email do not found" };
    }
  } catch (error) {
    throw new Error(`Error while deleting email: ${error.message}`);
  }
};

const { EmailSent } = require("../models");
const { where } = require("sequelize");

module.exports.getSentMail = async () => {
  try {
    const SentMail = await EmailSent.findAll({
      include: [
        {
          model: Taxpayer, // Assumes Taxpayer is already associated in the EmailInbox model
          as: "Taxpayer",
          attributes: ["name", "email", "id"], // Specify the fields you want to include from the Taxpayer table
        },
      ],
    });

    console.log(SentMail);
    return SentMail;
  } catch (error) {
    throw new Error(`Error while fetching inboxMail: ${error.message}`);
  }
};

module.exports.deleteSentMail = async (emailId) => {
  try {
    //check wether taxpayerid exsits
    const existEmail =  await EmailSent.findOne({where: {emailId: emailId}});
    if(existEmail){
        await EmailSent.destroy({where: {emailId: emailId}});
    }else{
        return {message: "email do not found" };  
    }
  } catch (error) {
    throw new Error(`Error while deleting email: ${error.message}`);
  }
};

module.exports.addsendmail = async (to, subject, body,userId,files, host, protocol) => {
  try {

    let userid = parseInt(userId, 10);

    if (!files || !files.path) {
      throw new Error("Invalid file input: file is missing or file path is missing.");
    }

    const normalizedPath = files.path.replace(/\\/g, "/");
    const parts = normalizedPath.split("/").slice(1); // remove public
    // Construct the URL
    const path = `${protocol}://${host}/${parts.join("/")}`;

    console.log(path); // Log the path after it is defined
    // Check whether taxpayerId exists
    const taxpayer = await Taxpayer.findOne({ where: { email: to } }); // Assuming that `to` contains the email and Taxpayer model has an email field

    // Create a new EmailSent record
    const newEmail = await EmailSent.create({
      sender: "isuruijs@gmail.com", // Replace with the actual sender email or get it dynamically
      recipient: to,
      subject: subject,
      message: body,
      sentDate: new Date(), // Add the current date and time as the sent date
      taxpayerId: taxpayer ? taxpayer.id : 9999, // Use the taxpayerId from the found taxpayer, if available
      filePath: path,
    });
    console.log(newEmail);

    return newEmail;
  } catch (error) {
    throw new Error(`Error while adding email: ${error.message}`);
  }
};

module.exports.getReport = async () => {
  try {
    const reports = await TaxSummaryReport.findAll({
      include: [
        {
          model: Taxpayer,
          attributes: ["name"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    const formattedReports = reports.map((report) => ({
      reportId: report.reportId,
      isVerified: report.isVerified,
      path: report.path,
      taxpayerName: report.Taxpayer.dataValues.name, // Extracting taxpayer name
      updatedAt: report.updatedAt,
    }));
    // console.log(formattedReports);
    return { data: formattedReports };
  } catch (error) {
    throw new Error(`Error while fetching reports: ${error.message}`);
  }
};

module.exports.verifyTaxReport = async (reportId) => {
  try {
    // Find the report by ID
    const report = await TaxSummaryReport.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    // Update the report as verified
    report.isVerified = true;
    await report.save();
    return { message: "Report verified successfully" };
  } catch (error) {
    throw new Error(`Error verifying report: ${error.message}`);
  }
};

module.exports.updatePassword = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const role = decoded.role;
    
    if (role === "superAdmin") {
      const superadmin = await SuperAdmin.findOne({
        where: {
          id: id,
        },
      });
      console.log(data);
      const isMatch = await bcrypt.compare(
        data.OldPassword.toString(),
        superadmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Admin not found" };
      }
      const hashedPassword = await bcrypt.hash(data.Password.toString(), 10);

      await SuperAdmin.update(
        { password: hashedPassword },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      const secondadmin = await SecondAdmin.findOne({
        where: {
          id: id,
        },
      });
      console.log(data);
      const isMatch = await bcrypt.compare(
        data.OldPassword.toString(),
        secondadmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Admin not found" };
      }
      const hashedPassword = await bcrypt.hash(data.Password.toString(), 10);

      await SecondAdmin.update(
        { password: hashedPassword },
        {
          where: {
            id: id,
          },
        }
      );
    }

    return { status: true };
  } catch (error) {
    return { status: false, message: "Failed" };
  }
};


module.exports.getname = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const name = decoded.name;
    const role = decoded.role;
    if(role === "superAdmin"){
      const adminName = await SuperAdmin.findOne({where:{id:id}})
      return {status:true, data:adminName.dataValues.name}
    }else{
      const adminName = await SecondAdmin.findOne({where:{id:id}})
      console.log(adminName.dataValues.name)
      return {status:true, data:adminName.dataValues.name}
    }



  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
};



module.exports.updatename = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const role = decoded.role;
    console.log(data)
    
    if (role === "superAdmin") {
      const admin = await SuperAdmin.findOne({ where: { id: id } });
      if (!admin) {
        throw new Error('SuperAdmin not found');
      }
      admin.name = data.name; // Assuming `data.newName` contains the new name
      await admin.save();
      return { status: true, data: admin.name };
    } else {
      const admin = await SecondAdmin.findOne({ where: { id: id } });
      if (!admin) {
        throw new Error('SecondAdmin not found');
      }
      admin.name = data.name; // Assuming `data.newName` contains the new name
      await admin.save();
      return { status: true, data: admin.name };
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};


module.exports.getadminlist = async () => {
  try {
    const superAdmins = await SuperAdmin.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });
    const secondAdmins = await SecondAdmin.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });

    // Map over superAdmins and secondAdmins to add the superadmin property
    const formattedSuperAdmins = superAdmins.map(admin => ({
      ...admin.toJSON(), // Assuming Sequelize ORM is used; adjust accordingly if not
      issuperadmin:true
    }));
    const formattedSecondAdmins = secondAdmins.map(admin => ({
      ...admin.toJSON(), // Assuming Sequelize ORM is used; adjust accordingly if not
      issuperadmin:false
    }));

    // Concatenate the two arrays
    const combinedAdmins = [...formattedSuperAdmins, ...formattedSecondAdmins];

    return combinedAdmins; // Return the combined array
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.deleteAdmin = async (adminId,isSuperAdmin) => {
  try {
    if(isSuperAdmin==="true"){
      const user = await SuperAdmin.findOne({ where: { id: adminId } });
      if (!user) {
        return { status: false, message: "super Admin not found" };
      }
      await SuperAdmin.destroy({ where: { id: adminId } });
    }else{
      const user = await SecondAdmin.findOne({ where: { id: adminId } });
      if (!user) {
        return { status: false, message: "Admin not found" };
      }
      await SecondAdmin.destroy({ where: { id: adminId } });
    }
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};