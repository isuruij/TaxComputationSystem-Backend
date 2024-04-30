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
} = require("../models");

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
  try {
    console.log(dataObject.amount[0], dataObject.note[0], dataObject.UserId);
    console.log(dataObject.amount[1], dataObject.note[1], dataObject.UserId);
    console.log(dataObject.amount[2], dataObject.note[2], dataObject.UserId);
    console.log(dataObject.amount[3], dataObject.note[3], dataObject.UserId);
    console.log(dataObject.amount[4], dataObject.note[4], dataObject.UserId);
    console.log(dataObject.amount[5], dataObject.note[5], dataObject.UserId);
    console.log(dataObject.amount[6], dataObject.note[6], dataObject.UserId);
    console.log(dataObject.amount[7], dataObject.note[7], dataObject.UserId);
    console.log(dataObject.amount[8], dataObject.note[8], dataObject.UserId);
    console.log(dataObject.amount[9], dataObject.note[9], dataObject.UserId);
    console.log(dataObject.amount[10], dataObject.note[10], dataObject.UserId);
    console.log(dataObject.amount[11], dataObject.note[11], dataObject.UserId);
    console.log(dataObject.amount[12], dataObject.note[12], dataObject.UserId);
    console.log(dataObject.amount[13], dataObject.note[13], dataObject.UserId);

    //dataObject.UserId is a string and want to convert to integer to compare
    let id = parseInt(dataObject.UserId, 10);

    // only update or insert when amount is not null
    if (dataObject.amount[0]) {
      // 1.update employment income table
      // First, attempt to find the existing row
      let [existingRow1, created1] = await employmentIncome.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          employmentIncome: dataObject.amount[0],
          eI_Note: dataObject.note[0],
          taxpayerId: id,
          eI_docname: "",
        },
      });
      // If the row was not created (already existed), update it
      if (!created1) {
        existingRow1 = await existingRow1.update({
          employmentIncome: dataObject.amount[0],
          eI_Note: dataObject.note[0],
        });
        console.log("Employemnet income row updated:", existingRow1.toJSON());
      } else {
        console.log("Employemnet income row created:", existingRow1.toJSON());
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[1]) {
      // 2.update bussiness income table
      // First, attempt to find the existing row
      let [existingRow2, created2] = await businessIncome.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          businessIncome: dataObject.amount[1],
          bI_Note: dataObject.note[1],
          taxpayerId: id,
          bI_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created2) {
        existingRow2 = await existingRow2.update({
          businessIncome: dataObject.amount[1],
          bI_Note: dataObject.note[1],
        });
        console.log("Business income row updated:", existingRow2.toJSON());
      } else {
        console.log("Business income new row created:", existingRow2.toJSON());
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[2]) {
      // 3.update investment Income table
      // First, attempt to find the existing row
      let [existingRow3, created3] = await investmentIncome.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          investmentIncome: dataObject.amount[2],
          iI_Note: dataObject.note[2],
          taxpayerId: id,
          iI_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created3) {
        existingRow3 = await existingRow3.update({
          investmentIncome: dataObject.amount[2],
          iI_Note: dataObject.note[2],
        });
        console.log("investment Income row updated:", existingRow3.toJSON());
      } else {
        console.log(
          "investment Income new row created:",
          existingRow3.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[3]) {
      // 4.update other Income table
      // First, attempt to find the existing row
      let [existingRow4, created4] = await otherIncome.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          otherIncome: dataObject.amount[3],
          oI_Note: dataObject.note[3],
          taxpayerId: id,
          oI_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created4) {
        existingRow4 = await existingRow4.update({
          otherIncome: dataObject.amount[3],
          oI_Note: dataObject.note[3],
        });
        console.log("other Income row updated:", existingRow4.toJSON());
      } else {
        console.log("other Income new row created:", existingRow4.toJSON());
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[4]) {
      // 5.update relief for rent income table
      // First, attempt to find the existing row
      let [existingRow5, created5] = await reliefForRentIncome.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          reliefForRentIncome: dataObject.amount[4],
          rRI_Note: dataObject.note[4],
          taxpayerId: id,
          rRI_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created5) {
        existingRow5 = await existingRow5.update({
          reliefForRentIncome: dataObject.amount[4],
          rRI_Note: dataObject.note[4],
        });
        console.log(
          "relief for rent income row updated:",
          existingRow5.toJSON()
        );
      } else {
        console.log(
          "relief for rent income new row created:",
          existingRow5.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[5]) {
      // 6.update relief for expenditure table
      // First, attempt to find the existing row
      let [existingRow6, created6] = await reliefForExpenditure.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          reliefForExpenditure: dataObject.amount[5],
          rE_Note: dataObject.note[5],
          taxpayerId: id,
          rE_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created6) {
        existingRow6 = await existingRow6.update({
          reliefForExpenditure: dataObject.amount[5],
          rE_Note: dataObject.note[5],
        });
        console.log(
          "relief for expenditure row updated:",
          existingRow6.toJSON()
        );
      } else {
        console.log(
          "relief for expenditure new row created:",
          existingRow6.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[6]) {
      // 7.update  qualifying payments table
      // First, attempt to find the existing row
      let [existingRow7, created7] = await qualifyingPayments.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          qualifyingPayments: dataObject.amount[5],
          qP_Note: dataObject.note[5],
          taxpayerId: id,
          qP_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created7) {
        existingRow7 = await existingRow7.update({
          qualifyingPayments: dataObject.amount[5],
          qP_Note: dataObject.note[5],
        });
        console.log("qualifying payments row updated:", existingRow7.toJSON());
      } else {
        console.log(
          " qualifying payments new row created:",
          existingRow7.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[7]) {
      // 8.update apit table
      // First, attempt to find the existing row
      let [existingRow8, created8] = await apit.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          apit: dataObject.amount[7],
          aPIT_Note: dataObject.note[7],
          taxpayerId: id,
          aPIT_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created8) {
        existingRow8 = await existingRow8.update({
          apit: dataObject.amount[7],
          aPIT_Note: dataObject.note[7],
        });
        console.log("Apit row updated:", existingRow8.toJSON());
      } else {
        console.log("Apit new row created:", existingRow8.toJSON());
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[8]) {
      // 9.update whtoninvestmentincome table
      // First, attempt to find the existing row
      let [existingRow9, created9] = await whtOnInvestmentIncome.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          whtOnInvestmentIncome: dataObject.amount[8],
          wHT_II_Note: dataObject.note[8],
          taxpayerId: id,
          wHT_II_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created9) {
        existingRow9 = await existingRow9.update({
          whtOnInvestmentIncome: dataObject.amount[8],
          wHT_II_Note: dataObject.note[8],
        });
        console.log("wHT_II_ row updated:", existingRow9.toJSON());
      } else {
        console.log("wHT_II_ new row created:", existingRow9.toJSON());
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[9]) {
      // 10.update whtonservicefeereceived table
      // First, attempt to find the existing row
      let [existingRow10, created10] =
        await whtOnServiceFeeReceived.findOrCreate({
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            whtOnServiceFeeReceived: dataObject.amount[9],
            wHT_SFR_Note: dataObject.note[9],
            taxpayerId: id,
            wHT_SFR_docname: "",
          },
        });
      // If the row was not created (already existed), update it using update()
      if (!created10) {
        existingRow10 = await existingRow10.update({
          whtOnServiceFeeReceived: dataObject.amount[9],
          wHT_SFR_Note: dataObject.note[9],
        });
        console.log(
          "whtOnServiceFeeReceived row updated:",
          existingRow10.toJSON()
        );
      } else {
        console.log(
          "whtOnServiceFeeReceived new row created:",
          existingRow10.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[10]) {
      // 11.update selfassessmentpayment table
      // First, attempt to find the existing row
      let [existingRow11, created11] = await selfAssessmentPayment.findOrCreate(
        {
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            selfAssessmentPayment: dataObject.amount[10],
            sAP_Note: dataObject.note[10],
            taxpayerId: id,
            sAP_docname: "",
          },
        }
      );
      // If the row was not created (already existed), update it using update()
      if (!created11) {
        existingRow11 = await existingRow11.update({
          selfAssessmentPayment: dataObject.amount[10],
          sAP_Note: dataObject.note[10],
        });
        console.log(
          "selfAssessmentPayment row updated:",
          existingRow11.toJSON()
        );
      } else {
        console.log(
          "selfAssessmentPayment new row created:",
          existingRow11.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[11]) {
      // 12.update terminalbenefits table
      // First, attempt to find the existing row
      let [existingRow12, created12] = await terminalBenefits.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          terminalBenefits: dataObject.amount[11],
          tB_Note: dataObject.note[11],
          taxpayerId: id,
          tB_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created12) {
        existingRow12 = await existingRow12.update({
          terminalBenefits: dataObject.amount[11],
          tB_Note: dataObject.note[11],
        });
        console.log("terminalBenefits row updated:", existingRow12.toJSON());
      } else {
        console.log(
          "terminalBenefits new row created:",
          existingRow12.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[12]) {
      // 13.update capitalValueAndGain table
      // First, attempt to find the existing row
      let [existingRow13, created13] = await capitalValueGain.findOrCreate({
        where: { taxpayerId: id }, // to find the existing row
        defaults: {
          capitalValueGain: dataObject.amount[12],
          cVnG_Note: dataObject.note[12],
          taxpayerId: id,
          cVnG_docname: "",
        },
      });
      // If the row was not created (already existed), update it using update()
      if (!created13) {
        existingRow13 = await existingRow13.update({
          capitalValueGain: dataObject.amount[12],
          cVnG_Note: dataObject.note[12],
        });
        console.log("capitalValueAndGain row updated:", existingRow13.toJSON());
      } else {
        console.log(
          "capitalValueAndGain new row created:",
          existingRow13.toJSON()
        );
      }
    }

    // only update or insert when amount is not null
    if (dataObject.amount[13]) {
      // 14.update whtWhichIsNotDeducted table
      // First, attempt to find the existing row
      let [existingRow14, created14] = await whtWhichIsNotDeducted.findOrCreate(
        {
          where: { taxpayerId: id }, // to find the existing row
          defaults: {
            whtWhichIsNotDeducted: dataObject.amount[13],
            wHT_WND_Note: dataObject.note[13],
            taxpayerId: id,
            wHT_WND_docname: "",
          },
        }
      );
      // If the row was not created (already existed), update it using update()
      if (!created14) {
        existingRow14 = await existingRow14.update({
          whtWhichIsNotDeducted: dataObject.amount[13],
          wHT_WND_Note: dataObject.note[13],
        });
        console.log(
          "whtWhichIsNotDeducted row updated:",
          existingRow14.toJSON()
        );
      } else {
        console.log(
          "whtWhichIsNotDeducted new row created:",
          existingRow14.toJSON()
        );
      }
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
