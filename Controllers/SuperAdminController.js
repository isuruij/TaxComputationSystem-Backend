const SuperAdminService = require("../Services/SuperAdminService");

module.exports.createPolicy = async (req, res) => {
    try {
      if (
        req.body.title == undefined ||
        req.body.title == ""

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
      const result = await SuperAdminService.updatePolicy(req.body);
      if (result.status) {
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
      console.log(req.body)
      const result = await SuperAdminService.deletePolicy(req.body);
      
      
      if (result.status) {
        console.log("sucesssssssss")
        return res.json({ Status: "Success" });
      }
  
      
    } catch (error) {
      return res.status(400).json({Status: "NotSuccess", message: error.message });
    }
  };



  module.exports.policy = async (req, res) => {
    try {
      const result = await SuperAdminService.policy();
      // Return the result as a JSON response with a status code of 200
      return res.status(200).json(result);
  
    } catch (error) {
      console.error(`Error in controller: ${error.message}`);
      return res.status(500).json({ status: false, message: error.message });
    }
  };


  module.exports.optionalpolicy = async (req, res) => {
    try {
      const result = await SuperAdminService.optionalpolicy();
      // Return the result as a JSON response with a status code of 200
      return res.status(200).json(result);
  
    } catch (error) {
      console.error(`Error in controller: ${error.message}`);
      return res.status(500).json({ status: false, message: error.message });
    }
  };



  module.exports.updateoptionalpolicy = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "empty request" });
      }
      const result = await SuperAdminService.updateoptionalpolicy(req.body);
      if (result.status) {
        return res.json({ Status: "Success" });
      }
  
      
    } catch (error) {
      return res.status(400).json({Status: "NotSuccess", message: error.message });
    }
  };