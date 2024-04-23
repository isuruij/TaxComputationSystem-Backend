
const SuperAdminService = require("../Services/SuperAdminService")


module.exports.getTaxpayers = async (req, res) => {
  try {
    const taxpayers = await SuperAdminService.getTaxpayers()
    return res.json(taxpayers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

module.exports.deleteTaxpayer = async (req, res) => {
  try {
    await SuperAdminService.deleteTaxpayer(req.params.id)
    return res.json({ message: "Taxpayer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.toggleApproval = async (req, res) => {
  try {
    await SuperAdminService.toggleApproval(req.body.id,req.body.isVerifiedUser);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
