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
    else if(created.message=="already registered user"){
      return { status: false,message:"already registered user" };
    }else{
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginSuperAdmin = async (data) => {
    try {
        const avalable = await SuperAdminRepository.loginSuperAdmin(data);
        
        
        if (avalable.status) {
          const tokenData = {id:avalable.id, name: avalable.name, role: "superAdmin" };
          const recived = JwtService.createToken(tokenData);
          
          return recived;
        }else{
          return { status: false, message: "Invalid credentials" };
        }
      } catch (error) { 
        return { status: false, message: error.message };
      }
  };