module.exports = (sequelize, DataTypes) => {
  const totalTax = require("./totalTax")(sequelize, DataTypes);

  const sumOfCat = sequelize.define(
    "sumOfCat",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      TotAssessableIncome: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      TotAssessableIncome2: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      Reliefs: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      Reliefs2: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      QP: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      Choosed_QP: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      TaxCredit: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      TaxCredit2: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      taxpayerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Taxpayers",
          key: "id",
        },
      },
    },
    {
      hooks: {
        beforeUpdate: async (sumOfCatInstance, options) => {
          const qp = sumOfCatInstance.QP || 0;
          const qp_Chose = sumOfCatInstance.Choosed_QP || 0;
          const totAssessableIncome = sumOfCatInstance.TotAssessableIncome || 0;
          const totAssessableIncome2 =
            sumOfCatInstance.TotAssessableIncome2 || 0;
          const reliefs = sumOfCatInstance.Reliefs || 0;
          const reliefs2 = sumOfCatInstance.Reliefs2 || 0;

          // Store the lowest value between calculatedValue, qp, and Govlimit in Choosed_QP
          if (qp) {
            // Calculate [(TotAssessableIncome + TotAssessableIncome2) - (Reliefs + Reliefs2)] / 3
            const calculatedValue =
              (totAssessableIncome +
                totAssessableIncome2 -
                (reliefs + reliefs2)) /
              3;

            // Additional value to compare
            const govLimit = 75000.0;

            if (calculatedValue > 0) {
              sumOfCatInstance.Choosed_QP = Math.min(
                calculatedValue,
                qp,
                govLimit
              );
            } else {
              sumOfCatInstance.Choosed_QP = Math.min(qp, govLimit);
            }
          }

          let TotTaxableIncome =
            totAssessableIncome -
            ((sumOfCatInstance.Choosed_QP || 0) * 9) / 12 -
            reliefs;
          if (TotTaxableIncome <= 0) {
            TotTaxableIncome = 0;
          }
          let TotTaxableIncome2 =
            totAssessableIncome2 -
            ((sumOfCatInstance.Choosed_QP || 0) * 3) / 12 -
            reliefs2;
          if (TotTaxableIncome2 <= 0) {
            TotTaxableIncome2 = 0;
          }
          let Tax = 0.0;
          let Tax2 = 0.0;

          //Calculate Income tax for 9months
          if (TotTaxableIncome <= 0) {
            Tax = 0;
          } else if (TotTaxableIncome <= 2250000) {
            Tax = TotTaxableIncome * 0.06;
          } else if (TotTaxableIncome <= 4500000) {
            Tax = 2250000 * 0.06 + (TotTaxableIncome - 2250000) * 0.12;
          } else {
            Tax =
              2250000 * 0.06 +
              2250000 * 0.12 +
              (TotTaxableIncome - 4500000) * 0.18;
          }
          // Update totalTax table
          await totalTax.update(
            {
              taxableAmount: TotTaxableIncome,
              incomeTax: Tax,
            },
            {
              where: { taxpayerId: sumOfCatInstance.taxpayerId },
              transaction: options.transaction,
            }
          );

          //Calculate Income tax for 3months
          if (TotTaxableIncome2 <= 0) {
            Tax = 0;
          } else if (TotTaxableIncome2 <= 125000) {
            Tax2 = TotTaxableIncome2 * 0.06;
          } else if (TotTaxableIncome2 <= 250000) {
            Tax2 = 125000 * 0.06 + (TotTaxableIncome2 - 125000) * 0.12;
          } else if (TotTaxableIncome2 <= 375000) {
            Tax2 =
              125000 * 0.06 +
              125000 * 0.12 +
              (TotTaxableIncome2 - 250000) * 0.18;
          } else if (TotTaxableIncome2 <= 500000) {
            Tax2 =
              125000 * 0.06 +
              125000 * 0.12 +
              125000 * 0.18 +
              (TotTaxableIncome2 - 375000) * 0.24;
          } else if (TotTaxableIncome2 <= 625000) {
            Tax2 =
              125000 * 0.06 +
              125000 * 0.12 +
              125000 * 0.18 +
              125000 * 0.24 +
              (TotTaxableIncome2 - 500000) * 0.3;
          } else {
            Tax2 =
              125000 * 0.06 +
              125000 * 0.12 +
              125000 * 0.18 +
              125000 * 0.24 +
              125000 * 0.3 +
              (TotTaxableIncome2 - 625000) * 0.36;
          }
          // Update totalTax table
          await totalTax.update(
            {
              taxableAmount2: TotTaxableIncome2,
              incomeTax2: Tax2,
            },
            {
              where: { taxpayerId: sumOfCatInstance.taxpayerId },
              transaction: options.transaction,
            }
          );
          // }
        },
      },
    }
  );

  return sumOfCat;
};
