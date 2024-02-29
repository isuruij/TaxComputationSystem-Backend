const bcrypt = require("bcrypt");
const { Taxpayer } = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports.addTaxpayer = async (obj) => {
  try {
    const hashedPw = await bcrypt.hash(obj.password.toString(), 8);
    var data = obj;
    data.password = hashedPw;
    data.emailToken = crypto.randomBytes(64).toString("hex");
    const r = await Taxpayer.create(data);
    return { status: true };
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

// module.exports.createToken = async (obj) => {
//   try {
//     const token = jwt.sign(obj, "key");
//     //console.log(token)
//     // res.cookie("token", token);
//     // res.json({ Status: "Success", Data: taxpayer });
//     return { status: true,token:token };
//   } catch (error) {
//     return { status: false };
//   }
// };
