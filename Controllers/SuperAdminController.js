const SuperAdminService = require("../Services/SuperAdminService");

module.exports.createPolicy = async (req, res) => {
    try {
      if (
        req.body.policyTitle == undefined ||
        req.body.policyTitle == "" ||
        req.body.policyDetails == undefined ||
        req.body.policyDetails == ""

      ) {
        return res.status(400).json({ status: false, message: "empty fields" });
      }
      console.log("hhhjjhjjj");
      const result = await SuperAdminService.createPolicy(req.body);

      //console.log(result);
      return res.status(200).json(result);
  
    } catch (error) {
      return { status: false };
    }
  };