const bcrypt = require("bcrypt");
const { SuperAdmin, SecondAdmin, Notification } = require("../models");
const jwt = require("jsonwebtoken");

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
    const { message, taxpayerId } = obj;
    console.log(obj)

    // Create a new notification
    const newNotification = await Notification.create({
      message,
      isViewed: false, // Default value, can be omitted if not needed
      taxpayerId
    });

    return { status: true, data: newNotification };
  } catch (error) {
    console.error('Error adding notification:', error);
    return { status: false, error: error.message };
  }
};

//Dashboard
const { Taxpayer } = require('../models');

module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await Taxpayer.findAll();
    console.log(taxpayers)
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};


module.exports.deleteTaxpayer = async (taxpayerId) => {
  try {
    //check wether taxpayerid exsits
    const existTaxpayer =  await Taxpayer.findOne({where: {id: taxpayerId}});
    if(existTaxpayer){
        await Taxpayer.destroy({where: {id: taxpayerId}});
    }else{
        return {message: "Taxpayer do not found" };  
    }
    
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};

module.exports.toggleApproval = async (taxpayerId, value) => {
  try {
    const existTaxpayer = await Taxpayer.findOne({ where: { id:taxpayerId } });
    console.log(taxpayerId,value)
    if (existTaxpayer) {
      await existTaxpayer.update({ isVerifiedUser: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};


//submissionList


module.exports.getBusinessIncome = async () => {
  try {
    const BusinessIncome = await businessIncome.findAll();
    console.log(BusinessIncome)
    return BusinessIncome;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};


//get income details
const { businessIncome, employmentIncome, investmentIncome, otherIncome,capitalValueGain,  reliefForExpenditure, reliefForRentIncome,qualifyingPayments, terminalBenefits, whtOnInvestmentIncome,whtOnServiceFeeReceived, whtWhichIsNotDeducted, apit,selfAssessmentPayment } = require('../models');



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
  return await reliefForExpenditure.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getReliefForRentIncomeByTaxpayerId = async (taxpayerId) => {
  return await reliefForRentIncome.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getSelfAssessmentPaymentByTaxpayerId = async (taxpayerId) => {
  return await selfAssessmentPayment.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getTerminalBenefitsByTaxpayerId = async (taxpayerId) => {
  return await terminalBenefits.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getWhtOnInvestmentIncomeByTaxpayerId = async (taxpayerId) => {
  return await whtOnInvestmentIncome.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getWhtOnServiceFeeReceivedByTaxpayerId = async (taxpayerId) => {
  return await whtOnServiceFeeReceived.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getWhtWhichIsNotDeductedByTaxpayerId = async (taxpayerId) => {
  return await whtWhichIsNotDeducted.findAll({ where: { taxpayerId: taxpayerId } });
};

module.exports.getQualifyingPaymentsByTaxpayerId = async (taxpayerId) => {
  return await qualifyingPayments.findAll({ where: { taxpayerId: taxpayerId } });
};


//verify button
module.exports.verifyBusinessIncome = async (incomeId, value) => {
  try {
    const existIncome = await businessIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
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
    const existIncome = await employmentIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
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
    const existIncome = await investmentIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
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
    const existIncome = await otherIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
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
    const existIncome = await whtOnServiceFeeReceived.findOne({ where: { taxCreditId: taxCreditId } });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT on service fee received: ${error.message}`);
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (taxCreditId, value) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({ where: { assessmentId: taxCreditId } });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT which is not deducted: ${error.message}`);
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (taxCreditId, value) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({ where: { taxCreditId: taxCreditId } });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT on investment income: ${error.message}`);
  }
};

module.exports.verifySelfAssessmentPayment = async (paymentId, value) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({ where: { taxCreditId: paymentId } });

    console.log(paymentId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving self-assessment payment: ${error.message}`);
  }
};

// Add these functions in SuperAdminRepository.js

module.exports.verifyCapitalValueGain = async (incomeId, value) => {
  try {
    const existIncome = await capitalValueGain.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Capital Value Gain: ${error.message}`);
  }
};

module.exports.verifyReliefForExpenditure = async (incomeId, value) => {
  try {
    const existIncome = await reliefForExpenditure.findOne({ where: { reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Relief For Expenditure: ${error.message}`);
  }
};

module.exports.verifyReliefForRentIncome = async (incomeId, value) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({ where: {reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Relief For Rent Income: ${error.message}`);
  }
};

module.exports.verifyQualifyingPayments = async (incomeId, value) => {
  try {
    const existIncome = await qualifyingPayments.findOne({ where: { reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Qualifying Payments: ${error.message}`);
  }
};

module.exports.verifyTerminalBenefits = async (incomeId, value) => {
  try {
    const existIncome = await terminalBenefits.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "Taxpayer not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Terminal Benefits: ${error.message}`);
  }
};


