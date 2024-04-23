// SuperAdminRepository.js

const { Taxpayer } = require('../models');

module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await Taxpayer.findAll();
    console.log("abs");
    console.log(taxpayers)
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};


module.exports.deleteTaxpayer = async (taxpayerId) => {
  try {
    //check wether taxpayerid exsits
    const existTaxpayer =  await Taxpayer.findOne({where: {id: taxpayerId}});
    if(existTaxpayer){
        await Taxpayer.destroy({where: {id: taxpayerId}});
    }else{
        return {message: "Taxpayer do not found" };  
    }
    
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};

module.exports.toggleApproval = async (taxpayerId, value) => {
  try {
    const existTaxpayer = await Taxpayer.findOne({ where: { id:taxpayerId } });
    console.log(taxpayerId,value)
    if (existTaxpayer) {
      await existTaxpayer.update({ isVerifiedUser: value });
    } else {
      return { message: "Taxpayer do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
  }
};

