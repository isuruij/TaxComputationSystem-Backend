const bcrypt = require("bcrypt");
const {
    SuperAdmin,
  Notification
} = require("../models");
const jwt = require("jsonwebtoken");

module.exports.addSuperAdmin = async (obj) => {
  try {
    const existingEmail = await SuperAdmin.findOne({
      where: { userName: obj.userName },
    });
    if (existingEmail) {
      return { status: false, message: "already registered email" };
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