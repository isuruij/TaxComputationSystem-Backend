module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const reliefForRentIncome = sequelize.define(
    "reliefForRentIncome",
    {
      reliefid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      reliefForRentIncome: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      docname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rRI_Note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isnewsubmission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }
    // {
    //   hooks: {
    //     beforeUpdate: async (record, options) => {
    //       // Fetch the previous value
    //       const previousRecord = await record.constructor.findOne({
    //         where: { incomeId: record.incomeId },
    //         transaction: options.transaction,
    //       });

    //       const previousIncome = previousRecord.otherIncome;
    //       const newIncome = record.otherIncome;

    //       // Update sumOfCat table
    //       await sumOfCat.update(
    //         {
    //           TotAssessableIncome: sequelize.literal(
    //             `TotAssessableIncome + ${newIncome} - ${previousIncome}`
    //           ),
    //         },
    //         {
    //           where: { taxpayerId: record.taxpayerId },
    //           transaction: options.transaction,
    //         }
    //       );
    //     },
    //     afterCreate: async (record, options) => {
    //       // Update sumOfCat table
    //       await sumOfCat.update(
    //         {
    //           TotAssessableIncome: sequelize.literal(
    //             `TotAssessableIncome + ${record.employmentIncome}`
    //           ),
    //         },
    //         {
    //           where: { taxpayerId: record.taxpayerId },
    //           transaction: options.transaction,
    //         }
    //       );
    //     },
    //     afterDestroy: async (record, options) => {
    //       // Update sumOfCat table
    //       await sumOfCat.update(
    //         {
    //           TotAssessableIncome: sequelize.literal(
    //             `TotAssessableIncome - ${record.employmentIncome}`
    //           ),
    //         },
    //         {
    //           where: { taxpayerId: record.taxpayerId },
    //           transaction: options.transaction,
    //         }
    //       );
    //     },
    //   },
    // }
  );

  return reliefForRentIncome;
};
