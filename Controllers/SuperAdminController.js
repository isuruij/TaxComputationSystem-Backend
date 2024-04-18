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
    else if (result.message == "already registered user") {
      return res.json({ status: false, message: "already registered user" });
    }else{
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.loginSuperAdmin = async (req, res) => {
  if (
    req.body.userName == undefined ||
    req.body.userName == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    return res.status(400).json({ status: false, message: "empty fields" });
  }
  const result = await SuperAdminService.loginSuperAdmin(req.body);
  //console.log(result)
  if (!result.status) {
    res.json({ Status: "Failed" });
  } else {
    if(result.type==="superAdmin"){
      res.cookie("token", result.data.token);
      res.json({ Status: "Success" , Type:"superAdmin"});
    }else{
      res.cookie("token", result.data.token);
      res.json({ Status: "Success" , Type:"secondAdmin"});
    }
  }
};
