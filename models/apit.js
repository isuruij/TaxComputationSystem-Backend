module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const apit = sequelize.define(
    "apit",
    {
      APITId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      apit: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      apit2: {
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
      aPIT_Note: {
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
            where: { APITId: record.APITId },
            transaction: options.transaction,
          });

          const oldValue = previousRecord.apit;
          const newValue = record.apit;
          const oldValue2 = previousRecord.apit2;
          const newValue2 = record.apit2;

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
          // Update sumOfCat table
          await sumOfCat.update(
            {
              totTaxCredit: sequelize.literal(
                `totTaxCredit + ${record.apit} + ${record.apit2}`
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
              totTaxCredit: sequelize.literal(
                `totTaxCredit - ${previousRecord.apit}- ${previousRecord.apit2}`
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

  return apit;
};
