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
  totalTax,
  TaxSummaryReport,
  PaidTax,
} = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const sendVerificationMail = require("../utils/sendVerificationMail");
const { where } = require("sequelize");
const { sequelize, DataTypes } = require("../models/index");
const { generateTaxReport } = require("../Services/pdfService");

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
    await reliefForRentIncome.create({
      reliefForRentIncome: "0",
      reliefForRentIncome2: "0",
      taxpayerId: res.dataValues.id,
    });

    await sumOfCat.create({
      TotAssessableIncome: "0",
      TotAssessableIncome2: "0",
      Reliefs: 2250000.0,
      Reliefs2: 300000.0,
      QP: "0",
      Choosed_QP: "0",
      TaxCredit: "0",
      TaxCredit2: "0",
      terminal: "0",
      capitalGain: "0",
      WHT: "0",
      taxpayerId: res.dataValues.id,
    });

    await totalTax.create({
      taxableAmount: "0",
      taxableAmount2: "0",
      incomeTax: "0",
      incomeTax2: "0",
      TerminalTax: "0",
      CapitalTax: "0",
      WHTNotDeductTax: "0",
      taxpayerId: res.dataValues.id,
    });

    console.log("logged in");
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

module.exports.uploadpropic = async (id, files, host, protocol) => {
  try {

    let userid = parseInt(id, 10);
    
    if (!files || !files.path) {
      throw new Error("Invalid file input: file is missing or file path is missing.");
    }

    const normalizedPath = files.path.replace(/\\/g, "/");
    const parts = normalizedPath.split("/").slice(1); // remove public
    // Construct the URL
    const path = `${protocol}://${host}/${parts.join("/")}`;

    console.log(path); // Log the path after it is defined

    const taxpayer = await Taxpayer.findOne({ where: { id: userid } });

    if (taxpayer) {
      const existingRow1 = await taxpayer.update({ filePath: path });
      console.log("Employment income row updated:", existingRow1.toJSON());
    } else {
      throw new Error("Taxpayer not found.");
    }

  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Error saving or updating file: " + error.message);
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
module.exports.fileUpload = async (userId, files, host, protocol) => {
  try {
    //dataObject.UserId is a string and want to convert to integer to compare
    let id = parseInt(userId, 10);
    // console.log(id, files, files[0].path, files.length, host, protocol);

    //Update number of submissions in taxpayer table
    const numSub = files.length;
    const row = await Taxpayer.update(
      { numOfSubmissions: sequelize.literal(`numOfSubmissions + ${numSub}`) },
      { where: { id: id } }
    );

    for (let i = 0; i < files.length; i++) {
      //01.Employment Income table
      if (files[i].id == 1) {
        // 1.update employment income table
        // First, attempt to find the existing row

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await employmentIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await businessIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await investmentIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await otherIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await reliefForRentIncome.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await reliefForExpenditure.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await qualifyingPayments.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await apit.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await whtOnInvestmentIncome.findOrCreate(
          {
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          }
        );
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] =
          await whtOnServiceFeeReceived.findOrCreate({
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await selfAssessmentPayment.findOrCreate(
          {
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          }
        );
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await terminalBenefits.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await capitalValueGain.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            filePath: path,
            docname: files[i].filename,
            isnewsubmission: 1,
            taxpayerId: id,
          },
        });
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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

        const normalizedPath = files[i].path.replace(/\\/g, "/");
        const parts = normalizedPath.split("/").slice(1); // remove public
        // Construct the URL
        const path = `${protocol}://${host}/${parts.join("/")}`;

        let [existingRow1, created1] = await whtWhichIsNotDeducted.findOrCreate(
          {
            where: { taxpayerId: id }, // to find the existing row
            defaults: {
              filePath: path,
              docname: files[i].filename,
              isnewsubmission: 1,
              taxpayerId: id,
            },
          }
        );
        // If the row was not created (already existed), update it
        if (!created1) {
          existingRow1 = await existingRow1.update({
            filePath: path,
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
      attributes: ["name", "tin", "isVerifiedUser"],
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

//thimira get tax calculations
module.exports.getTaxCalDetails = async (userId) => {
  try {
    const result = await totalTax.findOne({
      attributes: [
        "taxableAmount",
        "taxableAmount2",
        "incomeTax",
        "incomeTax2",
        "TerminalTax",
        "CapitalTax",
        "WHTNotDeductTax",
        "createdAt",
      ],
      where: { taxpayerId: userId },
    });
    const result2 = await sumOfCat.findOne({
      attributes: [
        "TotAssessableIncome",
        "TotAssessableIncome2",
        "Reliefs",
        "Reliefs2",
        "Choosed_QP",
        "TaxCredit",
        "TaxCredit2",
      ],
      where: { taxpayerId: userId },
    });
    if (!result || !result2) {
      return { status: false };
    }
    return { status: true, data: result, data2: result2 };
  } catch (error) {
    return { status: false };
  }
};

//generate tax report
module.exports.generateTaxReport = async (userId, protocol, host) => {
  try {
    const SumOfCat = await sumOfCat.findOne({ where: { taxpayerId: userId } });
    const taxpayer = await Taxpayer.findByPk(userId);
    const TotalTax = await totalTax.findOne({ where: { taxpayerId: userId } });
    const amount1 = await employmentIncome.findOne({
      where: { taxpayerId: userId },
    });
    const amount2 = await businessIncome.findOne({
      where: { taxpayerId: userId },
    });
    const amount3 = await investmentIncome.findOne({
      where: { taxpayerId: userId },
    });
    const amount4 = await reliefForRentIncome.findOne({
      where: { taxpayerId: userId },
    });
    const amount5 = await otherIncome.findOne({
      where: { taxpayerId: userId },
    });
    const Amounts = [amount1, amount2, amount3, amount4, amount5];
    if (!taxpayer || !SumOfCat || !TotalTax) {
      return { status: false, msg: "Taxpayer or related data not found" };
    }
    const result = await generateTaxReport(
      taxpayer,
      SumOfCat,
      TotalTax,
      Amounts
    );

    // Transform the file path into a URL
    // Convert file path to URL path relative to 'public' directory
    const relativePath = `${userId}/tax_report_${userId}.pdf`;

    // Construct the final URL
    const fileUrl = `${protocol}://${host}/files/${relativePath}`;

    //update taxSummary report table
    const [taxSummaryReport, created] = await TaxSummaryReport.findOrCreate({
      where: { taxpayerId: userId },
      defaults: {
        path: fileUrl,
        isVerified: false,
        taxpayerId: userId,
      },
    });
    if (!created) {
      await taxSummaryReport.update({
        path: fileUrl,
        isVerified: false,
      });
      console.log(`Tax summary report updated for taxpayerId: ${userId}`);
    } else {
      // New record was created
      console.log(`New tax summary report created for taxpayerId: ${userId}`);
    }
    return { status: true };
  } catch (error) {
    return { status: false, msg: "Error generating PDF in repo" };
  }
};

//download tax report
module.exports.downloadSummaryReport = async (id) => {
  try {
    const result = await TaxSummaryReport.findOne({
      attributes: ["isVerified", "path"],
      where: { taxpayerId: id },
    });

    return { status: true, data: result };
  } catch (error) {
    console.error(`Error fetching notifications: ${error}`);
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

module.exports.getCalculatedTax = async (id) => {
  try {
    const tax = await totalTax.findOne({
      attributes: [
        "incomeTax",
        "incomeTax2",
        "TerminalTax",
        "CapitalTax",
        "WHTNotDeductTax",
      ],
      where: { taxpayerId: id },
    });
    console.log(tax);

    return { status: true, data: tax };
  } catch (error) {
    console.error(`Error fetching notifications: ${error}`);
    return { status: false };
  }
};

module.exports.getTaxPayments = async (id) => {
  try {
    const taxPayments = await PaidTax.findAll({
      attributes: ["paidTaxId", "Description", "Paid"],
      where: { taxpayerId: id },
    });

    return { status: true, data: taxPayments };
  } catch (error) {
    console.error(`Error fetching taxpayments: ${error}`);
    return { status: false };
  }
};

module.exports.ReportVerified = async (id) => {
  try {
    const taxPayments = await TaxSummaryReport.findOne({
      attributes: ["isVerified"],
      where: { taxpayerId: id },
    });
    // console.log(taxPayments.isVerified);
    return { status: true, data: taxPayments.isVerified };
  } catch (error) {
    console.error(`Error fetching taxpayments: ${error}`);
    return { status: false };
  }
};

module.exports.deleteTaxPayment = async (id) => {
  try {
    await PaidTax.destroy({ where: { paidTaxId: id } });

    return { status: true };
  } catch (error) {
    console.error(`Error deleting tax payments: ${error}`);
    return { status: false };
  }
};

module.exports.postpaidtax = async (id, cat, amnt) => {
  try {
    // Check if a record exists with the given taxpayerId and Description
    const existingRecord = await PaidTax.findOne({
      where: { taxpayerId: id, Description: cat },
    });

    if (existingRecord) {
      // Update the existing record
      existingRecord.Paid += parseFloat(amnt);
      await existingRecord.save();
      console.log("Record updated successfully:", existingRecord);
    } else {
      // Create a new record
      const newRecord = await PaidTax.create({
        taxpayerId: id,
        Description: cat,
        Paid: parseFloat(amnt),
      });
      console.log("Record created successfully:", newRecord);
    }
    return { status: true };
  } catch (error) {
    console.error("Error in upsertPaidTax:", error);
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

//get income details
module.exports.getBusinessIncomeByTaxpayerId = async (id) => {
  try {
    return await businessIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getBusinessIncomeByTaxpayerId = async (id) => {
  try {
    return await businessIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getEmploymentIncomeByTaxpayerId = async (id) => {
  try {
    return await employmentIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getInvestmentIncomeByTaxpayerId = async (id) => {
  try {
    return await investmentIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getOtherIncomeByTaxpayerId = async (id) => {
  try {
    return await otherIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getCapitalValueGainByTaxpayerId = async (id) => {
  try {
    return await capitalValueGain.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getReliefForExpenditureByTaxpayerId = async (id) => {
  try {
    return await reliefForExpenditure.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getReliefForRentIncomeByTaxpayerId = async (id) => {
  try {
    return await reliefForRentIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getQualifyingPaymentsByTaxpayerId = async (id) => {
  try {
    return await qualifyingPayments.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getTerminalBenefitsByTaxpayerId = async (id) => {
  try {
    return await terminalBenefits.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getWhtOnInvestmentIncomeByTaxpayerId = async (id) => {
  try {
    return await whtOnInvestmentIncome.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getWhtOnServiceFeeReceivedByTaxpayerId = async (id) => {
  try {
    return await whtOnServiceFeeReceived.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getWhtWhichIsNotDeductedByTaxpayerId = async (id) => {
  try {
    return await whtWhichIsNotDeducted.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getApitByTaxpayerId = async (id) => {
  try {
    return await apit.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports.getSelfAssessmentPaymentByTaxpayerId = async (id) => {
  try {
    return await selfAssessmentPayment.findAll({ where: { taxpayerId: id } });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
