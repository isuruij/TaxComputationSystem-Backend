const SuperAdminRepository = require("../Repositories/SuperAdminRepository");
const JwtService = require("../Services/JwtService");

module.exports.addSuperAdmin = async (data) => {
  try {
    
    const created = await SuperAdminRepository.addSuperAdmin(data);
    if (created.status) {
      const tokenData = {id:created.id, name: data.name, role: "superAdmin" };
      const recived = JwtService.createToken(tokenData);
      return recived;
    }
    else if(created.message=="already registered email"){
      return { status: false,message:"already registered email" };
    }else{
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};