const TaxpayerRepository = require("../Repositories/TaxpayerRepository");
const JwtService = require("../Services/JwtService");
module.exports.addTaxpayer = async (data) => {
  try {
    const created = await TaxpayerRepository.addTaxpayer(data);
    if (created.status) {
      const tokenData = { name: data.name, role: "taxpayer" };
      const recived = JwtService.createToken(tokenData);
      console.log(recived);
      return recived;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
