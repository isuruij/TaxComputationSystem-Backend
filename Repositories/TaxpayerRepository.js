const bcrypt = require("bcrypt");
const { Taxpayer } = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

module.exports.addTaxpayer = async (obj) => {
  try {
    const hashedPw = await bcrypt.hash(obj.password.toString(), 8);
    var data = obj;
    data.password = hashedPw;
    data.emailToken = crypto.randomBytes(64).toString("hex");
    const res = await Taxpayer.create(data);
    sendMail(data.name,data.email,data.emailToken);
    return { status: true , id:res.dataValues.id};
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginTaxpayer = async (obj) => {
  try {
    const taxpayer = await Taxpayer.findOne({
      where: {
        email: obj.email,
      },
    });
   
    console.log(taxpayer.dataValues.id)
    

    if (!taxpayer) {
      return { status: false, message:"Taxpayer not found"};
    }

    const isMatch = await bcrypt.compare(
      obj.password.toString(),
      taxpayer.password
    );

    

    if (!isMatch) {
      return { status: false, message:"Invalid credentials"};
    } else {
      return { status: true, name: taxpayer.dataValues.name ,id:taxpayer.dataValues.id};
    }
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

// working on

module.exports.updateBasicDetails = async (obj) => {
  try {
    const hashedPw = await bcrypt.hash(obj.password.toString(), 8);
    var data = obj;
    data.password = hashedPw;
    data.emailToken = crypto.randomBytes(64).toString("hex");
    const r = await Taxpayer.create(data);
    sendMail(data.name,data.email,data.emailToken);
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};


// working on

module.exports.getBasicDetails = async (id) => {
  try {
    const user = await Taxpayer.findOne({ where: { id: id } });
    const { password, isVerifiedEmail, emailToken, isVerifiedUser, createdAt, updatedAt, ...userWithoutSensitiveInfo } = user.dataValues;
    console.log("----------------")
    console.log(userWithoutSensitiveInfo)
    return { status: true, data: userWithoutSensitiveInfo };
  } catch (error) {
    return { status: false };
  }
};