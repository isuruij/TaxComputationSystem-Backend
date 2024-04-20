const bcrypt = require("bcrypt");
const { SecondAdmin, SuperAdmin, Notification } = require("../models");
const jwt = require("jsonwebtoken");

module.exports.addSecondAdmin = async (obj) => {
  try {
    const existingUser1 = await SecondAdmin.findOne({
      where: { userName: obj.userName },
    });

    const existingUser2 = await SuperAdmin.findOne({
      where: { userName: obj.userName },
    });
    if (existingUser1 || existingUser2) {
      return { status: false, message: "already registered user" };
    }
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    const res = await SecondAdmin.create(data);

    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};
