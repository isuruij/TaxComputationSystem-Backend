module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const whtOnServiceFeeReceived = sequelize.define(
    "whtOnServiceFeeReceived",
    {
      taxCreditId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      whtOnServiceFeeReceived: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      whtOnServiceFeeReceived2: {
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
      wHT_SFR_Note: {
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

          const oldValue = previousRecord.whtOnServiceFeeReceived || 0;
          const newValue = record.whtOnServiceFeeReceived || 0;
          const oldValue2 = previousRecord.whtOnServiceFeeReceived2 || 0;
          const newValue2 = record.whtOnServiceFeeReceived2 || 0;

          // Update sumOfCat table
          await sumOfCat.update(
            {
              totTaxCredit: sequelize.literal(
                `totTaxCredit + ${newValue} + ${newValue2} - ${oldValue} - ${oldValue2}`
              ),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterCreate: async (record, options) => {
          let value = record.whtOnServiceFeeReceived;
          let value2 = record.whtOnServiceFeeReceived2;
          if (!record.whtOnServiceFeeReceived) {
            value = 0;
          } else if (!record.whtOnServiceFeeReceived2) {
            value2 = 0;
          }
          // Update sumOfCat table
          await sumOfCat.update(
            {
              totTaxCredit: sequelize.literal(
                `totTaxCredit + ${value}  + ${value2}`
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
            where: { taxCreditId: record.taxCreditId },
            transaction: options.transaction,
          });
          // Update sumOfCat table
          await sumOfCat.update(
            {
              totTaxCredit: sequelize.literal(
                `totTaxCredit - ${previousRecord.whtOnServiceFeeReceived}- ${previousRecord.whtOnServiceFeeReceived2}`
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

  return whtOnServiceFeeReceived;
};
