const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    const listOfUsers = await Taxpayer.findAll({
      attributes: ["name", "isVerifiedUser"],
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
    console.log(dataObject);
  } catch (error) {}
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
