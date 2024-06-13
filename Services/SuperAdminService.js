const SuperAdminRepository = require("../Repositories/SuperAdminRepository");
const JwtService = require("./JwtService");


module.exports.createPolicy = async (data) => {
    try {
      
      const created = await SuperAdminRepository.createPolicy(data);
      return created;
      
  
    } catch (error) {
      return { status: false, message: error.message };
    }
  };


  module.exports.updatePolicy = async (data) => {
    try {
      console.log("ttttttttttaaaaaaaaaaaa");
      const created = await SuperAdminRepository.updatePolicy(data);
      return created;
      
  
    } catch (error) {
      return { status: false, message: error.message };
    }
  };



  module.exports.deletePolicy = async (data) => {
    try {
      console.log("ttttttttttaaaaaaaaaaaa");
      const created = await SuperAdminRepository.deletePolicy(data);
      return created;
      
  
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
  

  module.exports.policy = async () => {
    try {
      // Call the repository function with the provided parameters
      const created = await SuperAdminRepository.policy();
      return created;
  
    } catch (error) {
      console.error(`Error in service: ${error.message}`);
      return { status: false, message: error.message };
    }
  };