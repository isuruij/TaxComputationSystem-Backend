const bcrypt = require("bcrypt");
const {
  Taxpayer,
  businessIncome,
  employmentIncome,
  investmentIncome,
  otherIncome,
  reliefForRentIncome,
  reliefForExpenditure,
  qualifyingPayments,
  apit,
  whtOnInvestmentIncome,
  whtOnServiceFeeReceived,
  selfAssessmentPayment,
  terminalBenefits,
  capitalValueGain,
  whtWhichIsNotDeducted,
  Notification,
  sumOfCat,
} = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const sendVerificationMail = require("../utils/sendVerificationMail");

//register taxpayer
module.exports.addTaxpayer = async (obj) => {
  try {
    const existingEmail = await Taxpayer.findOne({
      where: { email: obj.email },
    });
    if (existingEmail) {
      return { status: false, message: "already registered email" };
    }
    //hashing password
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    data.emailToken = crypto.randomBytes(64).toString("hex");
    const res = await Taxpayer.create(data);

    // add intial values to income tables
    await businessIncome.create({
      businessIncome: "0",
      businessIncome2: "0",
      taxpayerId: res.dataValues.id,
    });
    await employmentIncome.create({
      employmentIncome: "0",
      employmentIncome2: "0",
      taxpayerId: res.dataValues.id,
    });
    await investmentIncome.create({
      investmentIncome: "0",
      investmentIncome2: "0",
      taxpayerId: res.dataValues.id,
    });
    await otherIncome.create({
      otherIncome: "0",
      otherIncome2: "0",
      taxpayerId: res.dataValues.id,
    });
    await sumOfCat.create({
      TotAssessableIncome: "0",
      TotQPnR: "0",
      totTaxCredit: "0",
      terminal: "0",
      capitalGain: "0",
      WHT: "0",
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
    return { status: false, message: error.message };
  }
};

//update taxpayer details
module.exports.updateBasicDetails = async (obj) => {
  try {
    //checking is there any taxpayer with given id and email
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

// get taxpayer details
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

    if (!oldUser) {
      return { status: false, message: "User Not Exist" };
    }
    const secret = process.env.JWT_SECRET + oldUser.dataValues.password;
    const decoded = jwt.verify(token, secret);
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
    if (!oldUser) {
      return { status: false, message: "User Not Exist" };
    }
    const secret = process.env.JWT_SECRET + oldUser.dataValues.password;
    const decoded = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(newPassword.toString(), 8);
    await Taxpayer.update(
      { password: encryptedPassword },
      { where: { id: id } }
    );

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
    const bussinessrow = await businessIncome.findOne({
      where: { taxpayerId: obj.id },
    });
    if (bussinessrow) {
      await bussinessrow.update({ businessIncome: obj.businessIncome });
    }

    const employmentIncomerow = await employmentIncome.findOne({
      where: { taxpayerId: obj.id },
    });
    if (employmentIncomerow) {
      await employmentIncomerow.update({
        employmentIncome: obj.employmentIncome,
      });
    }

    const investmentIncomerow = await investmentIncome.findOne({
      where: { taxpayerId: obj.id },
    });
    if (investmentIncomerow) {
      await investmentIncomerow.update({
        investmentIncome: obj.investmentIncome,
      });
    }

    const otherIncomerow = await otherIncome.findOne({
      where: { taxpayerId: obj.id },
    });
    if (investmentIncomerow) {
      await otherIncomerow.update({ otherIncome: obj.otherIncome });
    }

    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

module.exports.verifyEmail = async (emailToken) => {
  try {
    let user = await Taxpayer.findOne({ where: { emailToken: emailToken } });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", error: "User not found" });
    }

    await Taxpayer.update(
      { isVerifiedEmail: true, emailToken: null },
      { where: { emailToken: emailToken } }
    );
    return { status: "Success", message: "User verified successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getNotifications = async (id) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        taxpayerId: id,
      },
    });

    const messages = notifications.map(
      (notification) => notification.dataValues.message
    );

    console.log(messages);

    return { status: true, data: messages };
  } catch (error) {
    console.error(`Error fetching notifications: ${error}`);
    return { status: false };
  }
};

module.exports.updatePassword = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const taxpayer = await Taxpayer.findOne({
      where: {
        id: id,
      },
    });
    console.log(data);
    const isMatch = await bcrypt.compare(
      data.OldPassword.toString(),
      taxpayer.password
    );

    if (!isMatch) {
      return { status: false, message: "Taxpayer not found" };
    }
    const hashedPassword = await bcrypt.hash(data.Password.toString(), 10);

    await Taxpayer.update(
      { password: hashedPassword },
      {
        where: {
          id: id,
        },
      }
    );

    return { status: true };
  } catch (error) {
    return { status: false, message: "Failed" };
  }
};

// thimira file upload part
module.exports.fileUpload = async (userId, files) => {
  try {
    //dataObject.UserId is a string and want to convert to integer to compare
    let id = parseInt(userId, 10);
    console.log(id, files, files[0].id, files.length);

    for (let i = 0; i < files.length; i++) {
      //01.Employment Income table
      if (files[i].id == 1) {
        // 1.update employment income table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await employmentIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("Employemnet income row updated:", existingRow1.toJSON());
        } else {
          console.log("Employemnet income row created:", existingRow1.toJSON());
        }
      }

      //02.Bussiness Income table
      if (files[i].id == 2) {
        // 1.update business Income table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await businessIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("business income row updated:", existingRow1.toJSON());
        } else {
          console.log("business income row created:", existingRow1.toJSON());
        }
      }

      //03.investment Income table
      if (files[i].id == 3) {
        // 1.update investment Income table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await investmentIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("investment income row updated:", existingRow1.toJSON());
        } else {
          console.log("investment income row created:", existingRow1.toJSON());
        }
      }

      //04.other Income table
      if (files[i].id == 4) {
        // 1.update other  Income table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await otherIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("other income row updated:", existingRow1.toJSON());
        } else {
          console.log("other income row created:", existingRow1.toJSON());
        }
      }

      //05.reliefForRentIncome table
      if (files[i].id == 5) {
        // 1.update reliefForRentIncome table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await reliefForRentIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log(
            "reliefForRentIncome row updated:",
            existingRow1.toJSON()
          );
        } else {
          console.log(
            "reliefForRentIncome row created:",
            existingRow1.toJSON()
          );
        }
      }

      //06.reliefForExpenditure table
      if (files[i].id == 6) {
        // 1.update reliefForExpenditure table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await reliefForExpenditure.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log(
            "reliefForExpenditure row updated:",
            existingRow1.toJSON()
          );
        } else {
          console.log(
            "reliefForExpenditure row created:",
            existingRow1.toJSON()
          );
        }
      }

      //07.qualifyingPayments table
      if (files[i].id == 7) {
        // 1.update qualifyingPaymentse table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await qualifyingPayments.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("qualifyingPayments row updated:", existingRow1.toJSON());
        } else {
          console.log("qualifyingPayments row created:", existingRow1.toJSON());
        }
      }

      //08.apit table
      if (files[i].id == 8) {
        // 1.update apit table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await apit.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("apit row updated:", existingRow1.toJSON());
        } else {
          console.log("apit income row created:", existingRow1.toJSON());
        }
      }

      //09.whtOnInvestmentIncome table
      if (files[i].id == 9) {
        // 1.update whtOnInvestmentIncome table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await whtOnInvestmentIncome.findOrCreate(
          {
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: files[i].path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          }
        );
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log(
            "whtOnInvestmentIncome row updated:",
            existingRow1.toJSON()
          );
        } else {
          console.log(
            "whtOnInvestmentIncome row created:",
            existingRow1.toJSON()
          );
        }
      }

      //10.whtOnServiceFeeReceived table
      if (files[i].id == 10) {
        // 1.update whtOnServiceFeeReceived table
        // First, attempt to find the existing row
        let [existingRow1, created1] =
          await whtOnServiceFeeReceived.findOrCreate({
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: files[i].path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log(
            "whtOnServiceFeeReceived row updated:",
            existingRow1.toJSON()
          );
        } else {
          console.log(
            "whtOnServiceFeeReceived row created:",
            existingRow1.toJSON()
          );
        }
      }

      //11.selfAssessmentPayment table
      if (files[i].id == 11) {
        // 1.update selfAssessmentPayment table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await selfAssessmentPayment.findOrCreate(
          {
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: files[i].path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          }
        );
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log(
            "selfAssessmentPayment row updated:",
            existingRow1.toJSON()
          );
        } else {
          console.log(
            "selfAssessmentPayment row created:",
            existingRow1.toJSON()
          );
        }
      }

      //12.terminalBenefits table
      if (files[i].id == 12) {
        // 1.update business Income table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await terminalBenefits.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("terminalBenefits row updated:", existingRow1.toJSON());
        } else {
          console.log("terminalBenefits row created:", existingRow1.toJSON());
        }
      }

      //13.capitalValueGain table
      if (files[i].id == 13) {
        // 1.update capitalValueGain table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await capitalValueGain.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log("capitalValueGain row updated:", existingRow1.toJSON());
        } else {
          console.log("capitalValueGain row created:", existingRow1.toJSON());
        }
      }

      //14.whtWhichIsNotDeducted table
      if (files[i].id == 14) {
        // 1.update business Income table
        // First, attempt to find the existing row
        let [existingRow1, created1] = await whtWhichIsNotDeducted.findOrCreate(
          {
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: files[i].path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          }
        );
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: files[i].path,
            docname: files[i].filename,
            isnewsubmission: 1,
          });
          console.log(
            "whtWhichIsNotDeducted row updated:",
            existingRow1.toJSON()
          );
        } else {
          console.log(
            "whtWhichIsNotDeducted row created:",
            existingRow1.toJSON()
          );
        }
      }
    }
  } catch (error) {
    throw new Error("Error saving or updating file: " + error.message);
  }
};

//thimira get username name and tin no
module.exports.getUserDetails = async (userId) => {
  try {
    const result = await Taxpayer.findOne({
      attributes: ["name", "tin"],
      where: { id: userId },
    });
    if (!result) {
      return { status: false };
    }
    return { status: true, data: result };
  } catch (error) {
    return { status: false };
  }
};

//thimira get tax calculations(under development)
module.exports.getTaxCalDetails = async (userId) => {
  try {
    const result = await Taxpayer.findOne({
      attributes: ["name", "tin"],
      where: { id: userId },
    });
    if (!result) {
      return { status: false };
    }
    return { status: true, data: result };
  } catch (error) {
    return { status: false };
  }
};

module.exports.getNotifications = async (id) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        taxpayerId: id,
      },
    });

    const messages = notifications.map((notification) => {
      return {
        message: notification.dataValues.message,
        isViewed: notification.dataValues.isViewed,
        id: notification.dataValues.notificationId,
      };
    });

    console.log(messages);

    // Count the number of notifications where isViewed is false
    const unviewedCount = messages.filter(
      (message) => !message.isViewed
    ).length;

    console.log(messages);
    // await Notification.update(
    //   { isViewed: false },
    //   { where: { taxpayerId: id } }
    // );
    return { status: true, data: messages, count: unviewedCount };
  } catch (error) {
    console.error(`Error fetching notifications: ${error}`);
    return { status: false };
  }
};

module.exports.updateNotificationStatus = async (id) => {
  try {
    await Notification.update(
      { isViewed: true },
      { where: { notificationId: id } }
    );
    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false };
  }
};
