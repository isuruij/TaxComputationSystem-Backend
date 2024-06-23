module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const whtOnInvestmentIncome = sequelize.define(
    "whtOnInvestmentIncome",
    {
      taxCreditId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      whtOnInvestmentIncome: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      whtOnInvestmentIncome2: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      docname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wHT_II_Note: {
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
            where: { taxCreditId: record.taxCreditId },
            transaction: options.transaction,
          });

          const oldValue = previousRecord.whtOnInvestmentIncome || 0;
          const newValue = record.whtOnInvestmentIncome || 0;
          const oldValue2 = previousRecord.whtOnInvestmentIncome2 || 0;
          const newValue2 = record.whtOnInvestmentIncome2 || 0;

          // Update sumOfCat table
          await sumOfCat.update(
            {
              TaxCredit: sequelize.literal(
                `TaxCredit + ${newValue} - ${oldValue}`
              ),
              TaxCredit2: sequelize.literal(
                `TaxCredit2 + ${newValue2} - ${oldValue2}`
              ),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterCreate: async (record, options) => {
          let value = record.whtOnInvestmentIncome || 0.0;
          let value2 = record.whtOnInvestmentIncome2 || 0.0;
          // Update sumOfCat table
          await sumOfCat.update(
            {
              TaxCredit: sequelize.literal(`TaxCredit + ${value}`),
              TaxCredit2: sequelize.literal(`TaxCredit2 + ${value2}`),
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
            where: { taxCreditId: record.taxCreditId },
            transaction: options.transaction,
          });
          // Update sumOfCat table
          await sumOfCat.update(
            {
              TaxCredit: sequelize.literal(
                `TaxCredit - ${previousRecord.whtOnInvestmentIncome}`
              ),
              TaxCredit2: sequelize.literal(
                `TaxCredit2 - ${previousRecord.whtOnInvestmentIncome2}`
              ),
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

  return whtOnInvestmentIncome;
};
