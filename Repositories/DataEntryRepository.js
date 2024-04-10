const {
  Taxpayer,
  employmentIncome,
  businessIncome,
  investmentIncome,
  otherIncome,
  reliefforrentincome,
  reliefforexpenditure,
  qualifyingpayments,
  apit,
  whtoninvestmentincome,
  whtonservicefeereceived,
  selfassessmentpayment,
  terminalbenefits,
  capitalValueAndGain,
  whtWhichIsNotDeducted,
} = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    const listOfUsers = await Taxpayer.findAll({
      attributes: ["id", "name", "isVerifiedUser"],
    });
    console.log(listOfUsers);
    return { status: true, data: listOfUsers };
  } catch (error) {
    return { status: false, message: error };
  }
};

// dataentry data enter part(under  development)
module.exports.postTaxDetails = async (dataObject) => {
  try {
    console.log(dataObject.amount[0], dataObject.note[0], dataObject.UserId);
    //update employment income table
    const res = await employmentIncome.create({
      employmentIncome: dataObject.amount[0],
      eI_Note: dataObject.note[0],
      taxpayerId: dataObject.UserId,
    });
    console.log("updated");
    // await businessIncome.create({
    //   businessIncome: "0",
    //   taxpayerId: res.dataValues.id,
    // });
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

//get username and is verified details to dataentry dashboard
module.exports.getUserSubmission = async () => {
  try {
    const listOfSubmissions = await Taxpayer.findAll({
      attributes: ["id", "name", "numOfSubmissions"],
    });
    console.log(listOfSubmissions);
    return { status: true, data: listOfSubmissions };
  } catch (error) {
    return { status: false, message: error };
  }
};
