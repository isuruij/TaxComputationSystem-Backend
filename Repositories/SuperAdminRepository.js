const {
    Policies
  } = require("../models");


  module.exports.createPolicy = async (data) => {
    try {
      console.log(data)
      await Policies.create({
        policyTitle: data.policyTitle,
        policyDetails: data.policyDetails
    });
  
      return { status: true};
    } catch (error) {
      console.error(`Error: ${error}`);
      return { status: false };
    }
  };