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

// module.exports.updateTaxpayer = async (taxpayerId, taxpayerName) => {
//   try {
//     const updatedTaxpayer = await Taxpayer.findByIdAndUpdate(
//       taxpayerId,
//       { name: taxpayerName },
//       { new: true }
//     );
//     return updatedTaxpayer;
//   } catch (error) {
//     throw new Error(`Error while updating taxpayer: ${error.message}`);
//   }
// };

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

module.exports.toggleApproval = async (taxpayerId) => {
 try {
  const { approved, isVerifiedUser } = req.body;
  const taxpayer = await Taxpayer.findById(id);
  //check wether taxpayerid exsits
  const existTaxpayer =  await Taxpayer.findOne({where: {id: taxpayerId}});
  if(existTaxpayer){
    await Taxpayer.findByIdAndUpdate(id, { approved, isVerifiedUser }); // Toggle approval status
    await taxpayer.save();
  }else{
      return {message: "Taxpayer do not found" };  
  }
} catch (error) {
  throw new Error(`Error while approveTaxpayer taxpayer: ${error.message}`);
}
};
