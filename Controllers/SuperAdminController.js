const SuperAdminService = require("../Services/SuperAdminService");
const { SuperAdmin } = require("../models");

module.exports.addSuperAdmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == "" 
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await SuperAdminService.addSuperAdmin(req.body);

    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    }
    else if (result.message == "already registered email") {
      return res.json({ status: false, message: "already registered email" });
    }else{
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};