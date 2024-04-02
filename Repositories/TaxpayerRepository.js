const bcrypt = require("bcrypt");
const {
  Taxpayer,
  businessIncome,
  employmentIncome,
  investmentIncome,
  otherIncome,
} = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const sendVerificationMail = require("../utils/sendVerificationMail");

module.exports.addTaxpayer = async (obj) => {
  try {
    const existingEmail = await Taxpayer.findOne({
      where: { email: obj.email },
    });
    if (existingEmail) {
      return { status: false, message: "already registered email" };
    }
    const hashedPw = await bcrypt.hash(obj.password, 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    data.emailToken = crypto.randomBytes(64).toString("hex");
    const res = await Taxpayer.create(data);

    // add intial values to income tables
    await businessIncome.create({
      businessIncome: "0",
      taxpayerId: res.dataValues.id,
    });
    await employmentIncome.create({
      employmentIncome: "0",
      taxpayerId: res.dataValues.id,
    });
    await investmentIncome.create({
      investmentIncome: "0",
      taxpayerId: res.dataValues.id,
    });
    await otherIncome.create({
      otherIncome: "0",
      taxpayerId: res.dataValues.id,
    });

    sendMail(data.name, data.email, data.emailToken);
    return { status: true, id: res.dataValues.id };
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

    if (!taxpayer) {
      return { status: false, message: "Taxpayer not found" };
    }

    const isMatch = await bcrypt.compare(
      obj.password.toString(),
      taxpayer.password
    );

    if (!isMatch) {
      return { status: false, message: "Invalid credentials" };
    } else {
      return {
        status: true,
        name: taxpayer.dataValues.name,
        id: taxpayer.dataValues.id,
      };
    }
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

module.exports.updateBasicDetails = async (obj) => {
  try {
    //checking is there ant taxpayer with given id and email
    const existingEmail = await Taxpayer.findOne({
      where: { id: obj.id, email: obj.email },
    });
    const { password, ...dataWithoutPassword } = obj;
    if (existingEmail) {
      console.log("yes");
      await Taxpayer.update(dataWithoutPassword, { where: { id: obj.id } });
      console.log("done");
    } else {
      //checking user enterd email is previously entered or not
      const existingEmail = await Taxpayer.findOne({
        where: { email: obj.email },
      });
      if (existingEmail) {
        return { status: false, message: "already registered email" };
      }

      dataWithoutPassword.emailToken = crypto.randomBytes(64).toString("hex");
      dataWithoutPassword.isVerifiedEmail = false;
      await Taxpayer.update(dataWithoutPassword, { where: { id: obj.id } });
      sendMail(
        dataWithoutPassword.name,
        dataWithoutPassword.email,
        dataWithoutPassword.emailToken
      );
      console.log(dataWithoutPassword.name);
      console.log(dataWithoutPassword.email);
      console.log("no");
    }

    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

module.exports.getBasicDetails = async (id) => {
  try {
    const user = await Taxpayer.findOne({ where: { id: id } });
    const {
      password,
      emailToken,
      createdAt,
      updatedAt,
      ...userWithoutSensitiveInfo
    } = user.dataValues;

    return { status: true, data: userWithoutSensitiveInfo };
  } catch (error) {
    return { status: false };
  }
};

module.exports.forgotPassword = async (email) => {
  try {
    const existingEmail = await Taxpayer.findOne({ where: { email: email } });

    if (!existingEmail) {
      console.log("no email");
      return { status: false, message: "Email not found" };
    }
    const secret = process.env.JWT_SECRET + existingEmail.password;
    const token = jwt.sign(
      { id: existingEmail.id, email: existingEmail.email },
      secret,
      { expiresIn: "15m" }
    );
    const link = `http://localhost:3000/api/taxpayer/reset-password/${existingEmail.id}/${token}`;
    console.log(link);
    // sendMail here
    sendVerificationMail(existingEmail.id, existingEmail.email, token);

    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

module.exports.resetPassword = async (id, token) => {
  try {
    const oldUser = await Taxpayer.findOne({ where: { id: id } });
    //console.log("old user pw :" , oldUser.dataValues.password);
    if (!oldUser) {
      return { status: false, message: "User Not Exist" };
    }
    const secret = process.env.JWT_SECRET + oldUser.dataValues.password;
    const decoded = jwt.verify(token, secret);
    //const link = `http://localhost:3000/api/taxpayer/reset-password/${existingEmail.id}/${token}`;
    console.log(decoded);

    return { status: true };
  } catch (error) {
    console.log("not verified");
    return { status: false };
  }
};

module.exports.addNewPassword = async (id, token, newPassword) => {
  try {
    const oldUser = await Taxpayer.findOne({ where: { id: id } });
    //console.log("old user pw :" , oldUser.dataValues.password);
    if (!oldUser) {
      return { status: false, message: "User Not Exist" };
    }
    const secret = process.env.JWT_SECRET + oldUser.dataValues.password;
    const decoded = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(newPassword, 8);
    await Taxpayer.update(
      { password: encryptedPassword },
      { where: { id: id } }
    );

    //const link = `http://localhost:3000/api/taxpayer/reset-password/${existingEmail.id}/${token}`;
    console.log(decoded);

    return { status: true };
  } catch (error) {
    console.log("not verified");
    return { status: false };
  }
};

module.exports.getuserincomedetails = async (id) => {
  try {
    const businessIncomeValue = await businessIncome.findOne({
      where: { taxpayerId: id },
    });
    const employmentIncomeValue = await employmentIncome.findOne({
      where: { taxpayerId: id },
    });
    const investmentIncomeValue = await investmentIncome.findOne({
      where: { taxpayerId: id },
    });
    const otherIncomeValue = await otherIncome.findOne({
      where: { taxpayerId: id },
    });

    console.log("llllllll");
    console.log(businessIncome);
    return {
      status: true,
      data: {
        businessIncome: businessIncomeValue.dataValues.businessIncome,
        employmentIncome: employmentIncomeValue.dataValues.employmentIncome,
        investmentIncome: investmentIncomeValue.dataValues.investmentIncome,
        otherIncome: otherIncomeValue.dataValues.otherIncome,
      },
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateincomedetails = async (obj) => {
  try {
    await businessIncome.update(
      { businessIncome: obj.businessIncome },
      { where: { taxpayerId: obj.id } }
    );
    await employmentIncome.update(
      { employmentIncome: obj.employmentIncome },
      { where: { taxpayerId: obj.id } }
    );
    await investmentIncome.update(
      { investmentIncome: obj.investmentIncome },
      { where: { taxpayerId: obj.id } }
    );
    await otherIncome.update(
      { otherIncome: obj.otherIncome },
      { where: { taxpayerId: obj.id } }
    );
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

module.exports.verifyEmail = async (emailToken) => {
  try {
    let user = await Taxpayer.findOne({ where: { emailToken: emailToken } });
    console.log(user)
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", error: "User not found" });
    }

    await Taxpayer.update(
      { isVerifiedEmail: true, emailToken: null },
      { where: { emailToken: emailToken } }
    );
    await Taxpayer.findOne({ where: { emailToken: emailToken } });
    return { status: "Success", message: "User verified successfully" };
  } catch (error) {
    return { status: false, message: error.message};
  }
};

