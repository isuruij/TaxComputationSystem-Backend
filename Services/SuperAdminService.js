// SuperAdminServices.js

const SuperAdminRepository = require('../Repositories/SuperAdminRepository');

module.exports.getTaxpayers = async () => {
  try {
    const taxpayers = await SuperAdminRepository.getTaxpayers();
    return taxpayers;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};

module.exports.deleteTaxpayer = async (taxpayerId) => {
  try {
    await SuperAdminRepository.deleteTaxpayer(taxpayerId);
    return { message: 'Taxpayer deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};

module.exports.toggleApproval = async (taxpayerId,value) => {
  try {
    await SuperAdminRepository.toggleApproval(taxpayerId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

