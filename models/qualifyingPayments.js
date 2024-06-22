module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const qualifyingPayments = sequelize.define(
    "qualifyingPayments",
    {
      reliefid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      qualifyingPayments: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      qualifyingPayments2: {
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
      qP_Note: {
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

          const newIncome = record.qualifyingPayments;
          const newIncome2 = record.qualifyingPayments2;

          // Update sumOfCat table
          await sumOfCat.update(
            {
              QP: sequelize.literal(`${newIncome} + ${newIncome2}`),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterCreate: async (record, options) => {
          // Update sumOfCat table
          await sumOfCat.update(
            {
              QP: sequelize.literal(
                `${record.qualifyingPayments} + ${record.qualifyingPayments2}`
              ),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterDestroy: async (record, options) => {
          // Fetch the previous value
          const previousRecord = await record.constructor.findOne({
            where: { incomeId: record.incomeId },
            transaction: options.transaction,
          });
          // Update sumOfCat table
          await sumOfCat.update(
            {
              QP: sequelize.literal(`0`),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
      },
    }
  );

  return qualifyingPayments;
};
