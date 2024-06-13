const {
    Policies
  } = require("../models");


  module.exports.createPolicy = async (data) => {
    try {
      console.log(data)
      await Policies.create({
        title: data.title,
        details: data.details
    });
  
      return { status: true};
    } catch (error) {
      console.error(`Error: ${error}`);
      return { status: false , message:error.message};
    }
  };



  module.exports.updatePolicy = async (obj) => {
   // const transaction = await db.sequelize.transaction();
    try {
      console.log(",,,,,,,,,");
      // Update policy title
      await Policies.update(
        { policyTitle: obj.title },
        { where: { policyId: obj.id } }
      );
      
      // Update policy details
      await Policies.update(
        { policyDetails: obj.details },
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



  module.exports.deletePolicy = async (data) => {
    try {
      console.log(data)
      console.log("sdhfkfjh")
      await Policies.destroy( { where: { policyId: data.id }});
  
      return { status: true};
    } catch (error) {
      console.error(`Error: ${error}`);
      return { status: false };
    }
  };


  module.exports.policy = async () => {
    try {
      // Query the database for records matching the given parameters
      const types = await Policies.findAll();
  
      // Map the results to return the desired format
      const messages = types.map(record => {
        return {
          title: record.dataValues.title,
          details: record.dataValues.details,
          
        };
      });
  
      return { status: true, data: messages };
  
    } catch (error) {
      console.error(`Error in repository: ${error.message}`);
      return { status: false, message: error.message };
    }
  };
  