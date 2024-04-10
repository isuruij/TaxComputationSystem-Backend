const DataEntryRepository = require("../Repositories/DataEntryRepository");
const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    const userarray = await DataEntryRepository.getusernames();
    if (userarray.status) {
      return { status: true, data: userarray.data };
    } else {
      console.log(userarray.message);
    }
  } catch (error) {
    return { status: false };
  }
};

// dataentry data enter part(under  development)
module.exports.postTaxDetails = async (data) => {
  try {
    const result = await DataEntryRepository.postTaxDetails(data);
  } catch (error) {}
};

//get submisssions in to dataentry submission dashboard
module.exports.getUserSubmission = async () => {
  try {
    const submissionarray = await DataEntryRepository.getUserSubmission();
    if (submissionarray.status) {
      return { status: true, data: submissionarray.data };
    } else {
      console.log(submissionarray.message);
    }
  } catch (error) {
    return { status: false };
  }
};
