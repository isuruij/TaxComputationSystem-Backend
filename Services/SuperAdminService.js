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