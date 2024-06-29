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
      reliefForRentIncome2: {
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
    },
    {
      hooks: {
        beforeUpdate: async (record, options) => {
          // Fetch the previous value
          const previousRecord = await record.constructor.findOne({
            where: { reliefid: record.reliefid },
            transaction: options.transaction,
          });

          const previousIncome = previousRecord.reliefForRentIncome;
          const newIncome = record.reliefForRentIncome;
          const previousIncome2 = previousRecord.reliefForRentIncome2;
          const newIncome2 = record.reliefForRentIncome2;

          // Update sumOfCat table
          await sumOfCat.update(
            {
              TotAssessableIncome: sequelize.literal(
                `TotAssessableIncome + ${newIncome} - ${previousIncome}`
              ),
              TotAssessableIncome2: sequelize.literal(
                `TotAssessableIncome2 + ${newIncome2} - ${previousIncome2}`
              ),
              Reliefs: sequelize.literal(
                `Reliefs + ${newIncome}*0.25 - ${previousIncome}*0.25`
              ),
              Reliefs2: sequelize.literal(
                `Reliefs2 + ${newIncome2}*0.25 - ${previousIncome2}*0.25`
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
        //         `TotAssessableIncome + ${record.employmentIncome}`
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
            where: { reliefid: record.reliefid },
            transaction: options.transaction,
          });
          // Update sumOfCat table
          await sumOfCat.update(
            {
              TotAssessableIncome: sequelize.literal(
                `TotAssessableIncome - ${previousRecord.reliefForRentIncome}`
              ),
              TotAssessableIncome2: sequelize.literal(
                `TotAssessableIncome2 - ${previousRecord.reliefForRentIncome2}`
              ),
              Reliefs: sequelize.literal(
                `Reliefs - ${previousRecord.reliefForRentIncome}*0.25`
              ),
              Reliefs2: sequelize.literal(
                `Reliefs2 - ${previousRecord.reliefForRentIncome2}*0.25`
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

  return reliefForRentIncome;
};
