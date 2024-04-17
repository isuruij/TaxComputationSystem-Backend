const bcrypt = require("bcrypt");
const {
    SuperAdmin,
  Notification
} = require("../models");
const jwt = require("jsonwebtoken");

module.exports.addSuperAdmin = async (obj) => {
  try {
    const existingUser = await SuperAdmin.findOne({
      where: { userName: obj.userName },
    });
    if (existingUser) {
      return { status: false, message: "already registered user" };
    }
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    const res = await SuperAdmin.create(data);

    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginSuperAdmin = async (obj) => {
    try {
        const superAdmin = await SuperAdmin.findOne({
          where: {
            userName: obj.userName,
          },
        });
    
        if (!superAdmin) {
          return { status: false, message: "SuperAdmin not found" };
        }
    
        const isMatch = await bcrypt.compare(
          obj.password.toString(),
          superAdmin.password
        );
    
        if (!isMatch) {
          return { status: false, message: "Invalid credentials" };
        } else {
          return {
            status: true,
            name: superAdmin.dataValues.name,
            id: superAdmin.dataValues.id,
          };
        }
      } catch (error) {
        console.error("Error in login:", error);
        throw error;
      }
  };