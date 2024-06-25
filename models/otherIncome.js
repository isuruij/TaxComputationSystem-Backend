module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const otherIncome = sequelize.define(
    "otherIncome",
    {
      incomeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      otherIncome: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      otherIncome2: {
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
      oI_Note: {
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
    },
    {
      hooks: {
        beforeUpdate: async (record, options) => {
          // Fetch the previous value
          const previousRecord = await record.constructor.findOne({
            where: { incomeId: record.incomeId },
            transaction: options.transaction,
          });

          const previousIncome = previousRecord.otherIncome;
          const newIncome = record.otherIncome;
          const previousIncome2 = previousRecord.otherIncome2;
          const newIncome2 = record.otherIncome2;

          // Update sumOfCat table
          await sumOfCat.update(
            {
              TotAssessableIncome: sequelize.literal(
                `TotAssessableIncome + ${newIncome} - ${previousIncome}`
              ),
              TotAssessableIncome2: sequelize.literal(
                `TotAssessableIncome2 + ${newIncome2} - ${previousIncome2}`
              ),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
          // Trigger the beforeUpdate hook on sumOfCat model
          const sumOfCatInstance = await sumOfCat.findOne({
            where: { taxpayerId: record.taxpayerId },
            transaction: options.transaction,
          });
          if (sumOfCatInstance) {
            await sumOfCatInstance.update(
              {},
              { transaction: options.transaction }
            );
          }
        },
        // afterCreate: async (record, options) => {
        //   // Update sumOfCat table
        //   await sumOfCat.update(
        //     {
        //       TotAssessableIncome: sequelize.literal(
        //         `TotAssessableIncome + ${record.otherIncome}`
        //       ),
        //     },
        //     {
        //       where: { taxpayerId: record.taxpayerId },
        //       transaction: options.transaction,
        //     }
        //   );
        // },
        afterDestroy: async (record, options) => {
          // Fetch the previous value
          const previousRecord = await record.constructor.findOne({
            where: { incomeId: record.incomeId },
            transaction: options.transaction,
          });
          // Update sumOfCat table
          await sumOfCat.update(
            {
              TotAssessableIncome: sequelize.literal(
                `TotAssessableIncome - ${previousRecord.otherIncome}`
              ),
              TotAssessableIncome2: sequelize.literal(
                `TotAssessableIncome2 - ${previousRecord.otherIncome2}`
              ),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
          // Trigger the beforeUpdate hook on sumOfCat model
          const sumOfCatInstance = await sumOfCat.findOne({
            where: { taxpayerId: record.taxpayerId },
            transaction: options.transaction,
          });
          if (sumOfCatInstance) {
            await sumOfCatInstance.update(
              {},
              { transaction: options.transaction }
            );
          }
        },
      },
    }
  );

  return otherIncome;
};
