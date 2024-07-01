module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const reliefForExpenditure = sequelize.define(
    "reliefForExpenditure",
    {
      reliefid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      reliefForExpenditure: {
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
      rE_Note: {
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

          const previousIncome = previousRecord.reliefForExpenditure || 0.0;
          const newIncome = record.reliefForExpenditure || 0.0;

          if (newIncome - 900000 > 0 && previousIncome - 900000 < 0) {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(
                  `Reliefs + 900000.0 - ${previousIncome}`
                ),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          } else if (newIncome - 900000 < 0 && previousIncome - 900000 > 0) {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(`Reliefs + ${newIncome} - 900000.0`),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          } else if (newIncome - 900000 < 0 && previousIncome - 900000 < 0) {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(
                  `Reliefs + ${newIncome} - ${previousIncome}`
                ),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          }
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
        afterCreate: async (record, options) => {
          if (!record.reliefForExpenditure) {
            return;
          }
          if (record.reliefForExpenditure - 900000 > 0) {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(`Reliefs + 900000.0`),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          } else {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(
                  `Reliefs + ${record.reliefForExpenditure}`
                ),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          }
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
        afterDestroy: async (record, options) => {
          // Fetch the previous value
          const previousRecord = await record.constructor.findOne({
            where: { reliefid: record.reliefid },
            transaction: options.transaction,
          });
          if (previousRecord - 900000 > 0) {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(`Reliefs - 900000.0`),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          } else {
            // Update sumOfCat table
            await sumOfCat.update(
              {
                Reliefs: sequelize.literal(
                  `Reliefs - ${previousRecord.reliefForExpenditure}`
                ),
              },
              {
                where: { taxpayerId: record.taxpayerId },
                transaction: options.transaction,
              }
            );
          }
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

  return reliefForExpenditure;
};
