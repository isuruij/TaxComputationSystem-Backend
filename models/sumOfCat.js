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
          const totAssessableIncome = sumOfCatInstance.TotAssessableIncome || 0;
          const totAssessableIncome2 =
            sumOfCatInstance.TotAssessableIncome2 || 0;
          const reliefs = sumOfCatInstance.Reliefs || 0;
          const reliefs2 = sumOfCatInstance.Reliefs2 || 0;
          const qp = sumOfCatInstance.QP || 0;

          // Calculate [(TotAssessableIncome + TotAssessableIncome2) - (Reliefs + Reliefs2)] / 3
          const calculatedValue =
            (totAssessableIncome +
              totAssessableIncome2 -
              (reliefs + reliefs2)) /
            3;

          // Additional value to compare
          const govLimit = 75000.0;

          // Store the lowest value between calculatedValue, qp, and Govlimit in Choosed_QP
          sumOfCatInstance.Choosed_QP = Math.min(calculatedValue, qp, govLimit);
        },
      },
    }
  );

  return sumOfCat;
};
