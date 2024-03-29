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
    if(created.message=="already registered email"){
      return { status: false,message:"already registered email" };
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
    return created;
  } catch (error) {
    
    return { status: false, message: error.message };
  }
};

module.exports.resetPassword = async (id,token) => {
  try {
    
    const created = await TaxpayerRepository.resetPassword(id,token);
    if (created.status) {
      return { status: true };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.addNewPassword = async (id,token,newPassword) => {
  try {
    
    const created = await TaxpayerRepository.addNewPassword(id,token,newPassword);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getuserincomedetails = async (id) => {
  try {
    console.log("yyyyyyyyy")
    const created = await TaxpayerRepository.getuserincomedetails(id);
    return created;

  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateincomedetails = async (data) => {
  try {
    
    const created = await TaxpayerRepository.updateincomedetails(data);
    return created;
    

  } catch (error) {
    return { status: false, message: error.message };
  }
};