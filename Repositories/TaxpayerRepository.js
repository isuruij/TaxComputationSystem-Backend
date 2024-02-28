const bcrypt = require("bcrypt");
const { Taxpayer } = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

module.exports.addTaxpayer = async (obj) => {
  try {
    const hashedPw = await bcrypt.hash(obj.password.toString(), 8);
    var data = obj;
    console.log(data)
    data.password = hashedPw;
    
    const r = await Taxpayer.create(data);
    console.log("------------")
    console.log(r);
    return { status: true };
  } catch (error) {
    return { status: false };
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
