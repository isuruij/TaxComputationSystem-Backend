module.exports = (sequelize, DataTypes) => {
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
      totTaxCredit: {
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
    }
    // {
    //   hooks: {
    //     beforeUpdate: async (sumOfCatInstance, options) => {
    //       // Check if TotAssessableIncome or TotAssessableIncome2 have changed
    //       if (
    //         sumOfCatInstance.changed("TotAssessableIncome") ||
    //         sumOfCatInstance.changed("TotAssessableIncome2")
    //       ) {
    //         // const previousIncome =
    //         //   sumOfCatInstance.previous("TotAssessableIncome") || 0;
    //         const newIncome = sumOfCatInstance.TotAssessableIncome || 0;
    //         // const previousIncome2 =
    //         //   sumOfCatInstance.previous("TotAssessableIncome2") || 0;
    //         const newIncome2 = sumOfCatInstance.TotAssessableIncome2 || 0;
    //         const QP = sumOfCatInstance.QP || 0;

    //         // logic to update Qualifying payment fields
    //         if ((newIncome + newIncome2) / 3 >= 75000) {
    //           if (QP > 75000) {
    //             sumOfCatInstance.Choosed_QP = 75000.0;
    //           } else {
    //             sumOfCatInstance.Choosed_QP = QP;
    //           }
    //         } else if ((newIncome + newIncome2) / 3 < 75000) {
    //           if (QP > (newIncome + newIncome2) / 3) {
    //             sumOfCatInstance.Choosed_QP = (newIncome + newIncome2) / 3;
    //           } else {
    //             sumOfCatInstance.Choosed_QP = QP;
    //           }
    //         }
    //       }
    //     },
    //   },
    //   sequelize, // We need to pass the sequelize connection
    //   modelName: "sumOfCat", // Name of the model
    //   tableName: "sumOfCat", // Name of the table in the database
    // }
  );

  return sumOfCat;
};
