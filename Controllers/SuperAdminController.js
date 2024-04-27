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


  module.exports.updatePolicy = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "empty request" });
      }
      console.log("tttttttnnnnnnnnnnn");
      const result = await SuperAdminService.updatePolicy(req.body);
      
      
      if (result.status) {
        console.log("sucesssssssss")
        return res.json({ Status: "Success" });
      }
  
      
    } catch (error) {
      return res.status(400).json({Status: "NotSuccess", message: error.message });
    }
  };



  module.exports.deletePolicy = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "empty request" });
      }
      console.log("tttttttnnnnnnnnnnn");
      const result = await SuperAdminService.deletePolicy(req.body);
      
      
      if (result.status) {
        console.log("sucesssssssss")
        return res.json({ Status: "Success" });
      }
  
      
    } catch (error) {
      return res.status(400).json({Status: "NotSuccess", message: error.message });
    }
  };