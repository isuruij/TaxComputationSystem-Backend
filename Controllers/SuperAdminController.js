// SuperAdminController.js
const SuperAdminService = require("../Services/SuperAdminService")


module.exports.getTaxpayers = async (req, res) => {
  try {
    const taxpayers = await SuperAdminService.getTaxpayers()
    return res.json(taxpayers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
//   const result = await SuperAdminService.getTaxpayers(req.body)
};

// module.exports.updateTaxpayer = async (req, res) => {
//   try {
//     const { taxpayerId } = req.params;
//     const { taxpayerName } = req.body;

//     const updatedTaxpayer = await Taxpayer.findByIdAndUpdate(
//       taxpayerId,
//       { name: taxpayerName },
//       { new: true }
//     );

//     res.json(updatedTaxpayer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
    
    await SuperAdminService.toggleApproval(req.params.id);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
