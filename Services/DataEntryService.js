const DataEntryRepository = require("../Repositories/DataEntryRepository");
const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    console.log("This is data entry service layer");
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
