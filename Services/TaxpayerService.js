const TaxpayerRepository = require("../Repositories/TaxpayerRepository");
const JwtService = require("../Services/JwtService");

module.exports.addTaxpayer = async (data) => {
  try {
    
    const created = await TaxpayerRepository.addTaxpayer(data);
    if (created.status) {
      const tokenData = { name: data.name, role: "taxpayer" };
      
      const recived = JwtService.createToken(tokenData);
      return recived;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.loginTaxpayer = async (data) => {
  try {
    const avalable = await TaxpayerRepository.loginTaxpayer(data);
    
    if (avalable.status) {
      const tokenData = {id:avalable.id, name: avalable.name, role: "taxpayer" };
      const recived = JwtService.createToken(tokenData);
      
      return recived;
    }else{
      return { status: false, message: "Invalid credentials" };
    }
  } catch (error) { 
    return { status: false, message: error.message };
  }
};
