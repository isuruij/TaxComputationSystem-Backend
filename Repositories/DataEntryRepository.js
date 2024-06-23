const {
  Taxpayer,
  employmentIncome,
  businessIncome,
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
  SecondAdmin,
  SuperAdmin,
} = require("../models");
const bcrypt = require("bcrypt");
const { sequelize, DataTypes } = require("../models/index");

//get username and is verified details to dataentry dashboard
module.exports.getusernames = async () => {
  try {
    const listOfUsers = await Taxpayer.findAll({
      attributes: ["id", "name", "isVerifiedUser"],
    });
    console.log(listOfUsers);
    return { status: true, data: listOfUsers };
  } catch (error) {
    return { status: false, message: error };
  }
};

///////////////////////////////////////////////////////////////////////

// dataentry data enter part
module.exports.postTaxDetails = async (dataObject) => {
  //     //dataObject.UserId is a string and want to convert to integer to compare
  //     let id = parseInt(dataObject.UserId, 10);

  //     // only update or insert when amount is not null
  //     if (dataObject.amount[0]) {
  //       // 1.update employment income table
  //       // First, attempt to find the existing row
  //       let [existingRow1, created1] = await employmentIncome.findOrCreate({
  //         where: { taxpayerId: id }, // to find the existing row
  //         defaults: {
  //           employmentIncome: dataObject.amount[0],
  //           eI_Note: dataObject.note[0],
  //           taxpayerId: id,
  //         },
  //       });
  //       // If the row was not created (already existed), update it
  //       if (!created1) {
  //         existingRow1 = await existingRow1.update({
  //           employmentIncome: dataObject.amount[0],
  //           eI_Note: dataObject.note[0],
  //         });
  //         console.log("Employemnet income row updated:", existingRow1.toJSON());
  //       } else {
  //         console.log("Employemnet income row created:", existingRow1.toJSON());
  //       }
  //     }

  try {
    // Convert UserId to integer
    let id = parseInt(dataObject.UserId, 10);

    // 1.update employment income table
    const upsertEmploymentIncome = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount" ? "employmentIncome" : "employmentIncome2";
      if (!dataObject[amountKey][0]) {
        dataObject[amountKey][0] = 0;
      }
      let [existingRow, created] = await employmentIncome.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][0],
          eI_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][0],
          eI_Note: note,
        });
        console.log(`Employment income row updated:`, existingRow.toJSON());
      } else {
        console.log(`Employment income row created:`, existingRow.toJSON());
      }
    };
    // Update or create employment income entries for amount and amount2
    if (dataObject.amount[0] || dataObject.amount2[0]) {
      await upsertEmploymentIncome("amount", dataObject.note[0], id);
      await upsertEmploymentIncome("amount2", dataObject.note[0], id);
    }

    // 2.update bussiness income table
    const upsertBusinessIncome = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount" ? "businessIncome" : "businessIncome2";
      if (!dataObject[amountKey][1]) {
        dataObject[amountKey][1] = 0;
      }
      let [existingRow, created] = await businessIncome.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][1],
          bI_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][1],
          bI_Note: note,
        });
        console.log(`Business income row updated:`, existingRow.toJSON());
      } else {
        console.log(`Business income row created:`, existingRow.toJSON());
      }
    };
    // Update or create business income entries for amount and amount2
    if (dataObject.amount[1] || dataObject.amount2[1]) {
      await upsertBusinessIncome("amount", dataObject.note[1], id);
      await upsertBusinessIncome("amount2", dataObject.note[1], id);
    }

    // 3.update InvestmentIncome table
    const upsertInvestmentIncome = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount" ? "investmentIncome" : "investmentIncome2";
      if (!dataObject[amountKey][2]) {
        dataObject[amountKey][2] = 0;
      }
      let [existingRow, created] = await investmentIncome.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][2],
          iI_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][2],
          iI_Note: note,
        });
        console.log(`investment income row updated:`, existingRow.toJSON());
      } else {
        console.log(`investment income row created:`, existingRow.toJSON());
      }
    };
    // Update or create InvestmentIncome entries for amount and amount2
    if (dataObject.amount[2] || dataObject.amount2[2]) {
      await upsertInvestmentIncome("amount", dataObject.note[2], id);
      await upsertInvestmentIncome("amount2", dataObject.note[2], id);
    }

    // 4.update reliefForRentIncome table
    const upsertreliefForRentIncome = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount" ? "reliefForRentIncome" : "reliefForRentIncome2";
      if (!dataObject[amountKey][3]) {
        dataObject[amountKey][3] = 0;
      }
      let [existingRow, created] = await reliefForRentIncome.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][3],
          rRI_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][3],
          rRI_Note: note,
        });
        console.log(`reliefForRentIncome row updated:`, existingRow.toJSON());
      } else {
        console.log(`reliefForRentIncome row created:`, existingRow.toJSON());
      }
    };
    // Update or create reliefForRentIncome entries for amount and amount2
    if (dataObject.amount[3] || dataObject.amount2[3]) {
      await upsertreliefForRentIncome("amount", dataObject.note[3], id);
      await upsertreliefForRentIncome("amount2", dataObject.note[3], id);
    }

    // 5.update otherIncome table
    const upsertotherIncome = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount" ? "otherIncome" : "otherIncome2";
      if (!dataObject[amountKey][4]) {
        dataObject[amountKey][4] = 0;
      }
      let [existingRow, created] = await otherIncome.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][4],
          oI_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][4],
          oI_Note: note,
        });
        console.log(`otherIncome row updated:`, existingRow.toJSON());
      } else {
        console.log(`otherIncome row created:`, existingRow.toJSON());
      }
    };
    // Update or create otherIncomee entries for amount and amount2
    if (dataObject.amount[4] || dataObject.amount2[4]) {
      await upsertotherIncome("amount", dataObject.note[4], id);
      await upsertotherIncome("amount2", dataObject.note[4], id);
    }

    // 6.update reliefForExpenditure table
    const upsertreliefForExpenditure = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount"
          ? "reliefForExpenditure"
          : "reliefForExpenditure2";
      if (!dataObject[amountKey][5]) {
        dataObject[amountKey][5] = 0;
      }
      let [existingRow, created] = await reliefForExpenditure.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          reliefForExpenditure: dataObject[amountKey][5],
          rE_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          reliefForExpenditure: dataObject[amountKey][5],
          rE_Note: note,
        });
        console.log(`reliefForExpenditure row updated:`, existingRow.toJSON());
      } else {
        console.log(`reliefForExpenditure row created:`, existingRow.toJSON());
      }
    };
    // Update or create reliefForExpenditure entries for amount and amount2
    if (dataObject.amount[5] || dataObject.amount2[5]) {
      await upsertreliefForExpenditure("amount", dataObject.note[5], id);
    }

    // 7.update qualifingPayments table
    const upsertqualifyingPayments = async (amountKey, note, id) => {
      if (!dataObject[amountKey][6]) {
        dataObject[amountKey][6] = 0;
      }
      let [existingRow, created] = await qualifyingPayments.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          qualifyingPayments: dataObject[amountKey][6],
          qP_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          qualifyingPayments: dataObject[amountKey][6],
          qP_Note: note,
        });
        console.log(`qualifyingPayments row updated:`, existingRow.toJSON());
      } else {
        console.log(`qualifyingPayments row created:`, existingRow.toJSON());
      }
    };
    // Update or create qualifyingPayments entries for amount and amount2
    if (dataObject.amount[6] || dataObject.amount2[6]) {
      await upsertqualifyingPayments("amount", dataObject.note[6], id);
    }

    // 8.update apit table
    const upsertapit = async (amountKey, note, id) => {
      const columnName = amountKey === "amount" ? "apit" : "apit2";
      if (!dataObject[amountKey][7]) {
        dataObject[amountKey][7] = 0;
      }
      let [existingRow, created] = await apit.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][7],
          aPIT_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][7],
          aPIT_Note: note,
        });
        console.log(`apit row updated:`, existingRow.toJSON());
      } else {
        console.log(`apit row created:`, existingRow.toJSON());
      }
    };
    // Update or create apit entries for amount and amount2
    if (dataObject.amount[7] || dataObject.amount2[7]) {
      await upsertapit("amount", dataObject.note[7], id);
      await upsertapit("amount2", dataObject.note[7], id);
    }

    // 9.update whtOnInvestmentIncome table
    const upsertwhtOnInvestmentIncome = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount"
          ? "whtOnInvestmentIncome"
          : "whtOnInvestmentIncome2";
      if (!dataObject[amountKey][8]) {
        dataObject[amountKey][8] = 0;
      }
      let [existingRow, created] = await whtOnInvestmentIncome.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][8],
          wHT_II_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][8],
          wHT_II_Note: note,
        });
        console.log(`whtOnInvestmentIncome row updated:`, existingRow.toJSON());
      } else {
        console.log(`whtOnInvestmentIncome row created:`, existingRow.toJSON());
      }
    };
    // Update or create whtOnInvestmentIncome entries for amount and amount2
    if (dataObject.amount[8] || dataObject.amount2[8]) {
      await upsertwhtOnInvestmentIncome("amount", dataObject.note[8], id);
      await upsertwhtOnInvestmentIncome("amount2", dataObject.note[8], id);
    }

    // 10.update whtOnServiceFeeReceived table
    const upsertwhtOnServiceFeeReceived = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount"
          ? "whtOnServiceFeeReceived"
          : "whtOnServiceFeeReceived2";
      if (!dataObject[amountKey][9]) {
        dataObject[amountKey][9] = 0;
      }
      let [existingRow, created] = await whtOnServiceFeeReceived.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][9],
          wHT_SFR_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][9],
          wHT_SFR_Note: note,
        });
        console.log(
          `whtOnServiceFeeReceived row updated:`,
          existingRow.toJSON()
        );
      } else {
        console.log(
          `whtOnServiceFeeReceived row created:`,
          existingRow.toJSON()
        );
      }
    };
    // Update or create whtOnServiceFeeReceived entries for amount and amount2
    if (dataObject.amount[9] || dataObject.amount2[9]) {
      await upsertwhtOnServiceFeeReceived("amount", dataObject.note[9], id);
      await upsertwhtOnServiceFeeReceived("amount2", dataObject.note[9], id);
    }

    // 11.update selfAssessmentPayment table
    const upsertselfAssessmentPayment = async (amountKey, note, id) => {
      const columnName =
        amountKey === "amount"
          ? "selfAssessmentPayment"
          : "selfAssessmentPayment2";
      if (!dataObject[amountKey][10]) {
        dataObject[amountKey][10] = 0;
      }
      let [existingRow, created] = await selfAssessmentPayment.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          [columnName]: dataObject[amountKey][10],
          sAP_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          [columnName]: dataObject[amountKey][10],
          sAP_Note: note,
        });
        console.log(`selfAssessmentPayment row updated:`, existingRow.toJSON());
      } else {
        console.log(`selfAssessmentPayment row created:`, existingRow.toJSON());
      }
    };
    // Update or create selfAssessmentPayment entries for amount and amount2
    if (dataObject.amount[10] || dataObject.amount2[10]) {
      await upsertselfAssessmentPayment("amount", dataObject.note[10], id);
      await upsertselfAssessmentPayment("amount2", dataObject.note[10], id);
    }

    // 12.update terminalBenefits table
    const upsertterminalBenefits = async (amountKey, note, id) => {
      if (!dataObject[amountKey][11]) {
        dataObject[amountKey][11] = 0;
      }
      let [existingRow, created] = await terminalBenefits.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          terminalBenefits: dataObject[amountKey][11],
          tB_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          terminalBenefits: dataObject[amountKey][11],
          tB_Note: note,
        });
        console.log(`terminalBenefits row updated:`, existingRow.toJSON());
      } else {
        console.log(`terminalBenefits row created:`, existingRow.toJSON());
      }
    };
    // Update or create terminalBenefits entries for amount and amount2
    if (dataObject.amount[11] || dataObject.amount2[11]) {
      await upsertterminalBenefits("amount", dataObject.note[11], id);
    }

    // 13.update capitalValueGain table
    const upsertcapitalValueGain = async (amountKey, note, id) => {
      if (!dataObject[amountKey][12]) {
        dataObject[amountKey][12] = 0;
      }
      let [existingRow, created] = await capitalValueGain.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          capitalValueGain: dataObject[amountKey][12],
          cVnG_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          capitalValueGain: dataObject[amountKey][12],
          cVnG_Note: note,
        });
        console.log(`capitalValueGain row updated:`, existingRow.toJSON());
      } else {
        console.log(`capitalValueGain row created:`, existingRow.toJSON());
      }
    };
    // Update or create capitalValueGain entries for amount and amount2
    if (dataObject.amount[12] || dataObject.amount2[12]) {
      await upsertcapitalValueGain("amount", dataObject.note[12], id);
    }

    // 14.update whtWhichIsNotDeducted table
    const upsertwhtWhichIsNotDeducted = async (amountKey, note, id) => {
      if (!dataObject[amountKey][13]) {
        dataObject[amountKey][13] = 0;
      }
      let [existingRow, created] = await whtWhichIsNotDeducted.findOrCreate({
        where: { taxpayerId: id },
        defaults: {
          whtWhichIsNotDeducted: dataObject[amountKey][13],
          wHT_WND_Note: note,
          taxpayerId: id,
        },
      });
      if (!created) {
        existingRow = await existingRow.update({
          whtWhichIsNotDeducted: dataObject[amountKey][13],
          wHT_WND_Note: note,
        });
        console.log(`whtWhichIsNotDeducted row updated:`, existingRow.toJSON());
      } else {
        console.log(`whtWhichIsNotDeducted row created:`, existingRow.toJSON());
      }
    };
    // Update or create whtWhichIsNotDeducted entries for amount and amount2
    if (dataObject.amount[13] || dataObject.amount2[13]) {
      await upsertwhtWhichIsNotDeducted("amount", dataObject.note[13], id);
    }

    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

///////////////////////////////////////////////////////////////////

//get username and is verified details to dataentry dashboard
module.exports.getUserSubmission = async () => {
  try {
    const listOfSubmissions = await Taxpayer.findAll({
      attributes: ["id", "name", "numOfSubmissions"],
    });
    console.log(listOfSubmissions);
    return { status: true, data: listOfSubmissions };
  } catch (error) {
    return { status: false, message: error };
  }
};

//get tin and name
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

////////////////////////////////////////////////////////////

// file upload part
module.exports.fileUpload = async (userId, files) => {
  try {
    //dataObject.UserId is a string and want to convert to integer to compare
    let id = parseInt(userId, 10);
    console.log(id, files, files[0].id, files.length);

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

module.exports.addSecondAdmin = async (obj) => {
  try {
    const existingUser1 = await SecondAdmin.findOne({
      where: { userName: obj.userName },
    });
    console.log("in repos");

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
    console.log(error.message);
    return { status: false };
  }
};
