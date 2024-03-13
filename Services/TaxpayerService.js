const TaxpayerRepository = require("../Repositories/TaxpayerRepository");
const JwtService = require("../Services/JwtService");

module.exports.addTaxpayer = async (data) => {
  try {
    
    const created = await TaxpayerRepository.addTaxpayer(data);
    if (created.status) {
      const tokenData = {id:created.id, name: data.name, role: "taxpayer" };
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
    console.log(avalable)
    
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



module.exports.updateBasicDetails = async (data) => {
  try {
    
    const created = await TaxpayerRepository.updateBasicDetails(data);
    return created;

  } catch (error) {
    return { status: false, message: error.message };
  }
};




module.exports.getBasicDetails = async (id) => {
  try {
    
    const created = await TaxpayerRepository.getBasicDetails(id);
    if (created.status) {
      return { status: true, data: created.data };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.forgotPassword = async (email) => {
  try {
    
    const created = await TaxpayerRepository.forgotPassword(email);
    if (created.status) {
      return { status: true };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};