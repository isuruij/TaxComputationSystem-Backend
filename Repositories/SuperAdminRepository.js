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



  module.exports.updatePolicy = async (obj) => {
   // const transaction = await db.sequelize.transaction();
    try {
      console.log(",,,,,,,,,");
      // Update policy title
      await Policies.update(
        { policyTitle: obj.policyTitle },
        { where: { policyId: obj.id } }
      );
      
      // Update policy details
      await Policies.update(
        { policyDetails: obj.policyDetails },
        { where: { policyId: obj.id }}
      );
      
      // Commit transaction
     // await transaction.commit();
      
      return { status: true };
    } catch (error) {

      // Rollback transaction on error
      //await transaction.rollback();
      console.error('Error updating policy:', error);
      return { status: false };
    }
  };
  