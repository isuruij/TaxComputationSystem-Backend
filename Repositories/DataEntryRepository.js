const { Taxpayer } = require("../models");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    console.log("This is data entry Repo layer");

    const listOfUsers = await Taxpayer.findAll({
      attributes: ["name", "isVerifiedUser"],
    });
    console.log(listOfUsers);
    return { status: true, data: listOfUsers };
  } catch (error) {
    return { status: false };
  }
};
