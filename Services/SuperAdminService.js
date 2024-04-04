// SuperAdminServices.js

const SuperAdminRepository = require('../repositories/SuperAdminRepository');

module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await SuperAdminRepository.getTaxpayers();
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};

// module.exports.updateTaxpayer = async (taxpayerId, taxpayerName) => {
//   try {
//     const updatedTaxpayer = await SuperAdminRepository.updateTaxpayer(taxpayerId, taxpayerName);
//     return updatedTaxpayer;
//   } catch (error) {
//     throw new Error(`Error while updating taxpayer: ${error.message}`);
//   }
// };

module.exports.deleteTaxpayer = async (taxpayerId) => {
  try {
    await SuperAdminRepository.deleteTaxpayer(taxpayerId);
    return { message: 'Taxpayer deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};

// module.exports.approveTaxpayer = async (taxpayerId) => {
//   try {
//     await SuperAdminRepository.approveTaxpayer(taxpayerId);
//     return { message: 'Approval status toggled successfully' };
//   } catch (error) {
//     throw new Error(`Error while toggling approval status: ${error.message}`);
//   }
// };
