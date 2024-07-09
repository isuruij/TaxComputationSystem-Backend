module.exports = (sequelize, DataTypes) => {
  const totalTax = require("./totalTax")(sequelize, DataTypes);

  const whtWhichIsNotDeducted = sequelize.define(
    "whtWhichIsNotDeducted",
    {
      assessmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      whtWhichIsNotDeducted: {
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
      wHT_WND_Note: {
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
      requested:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      requestedAgain:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      hooks: {
        beforeUpdate: async (record, options) => {
          const newValue = parseFloat(record.whtWhichIsNotDeducted || 0);

          let tax = newValue * 0.1;
          // Update totalTax table
          await totalTax.update(
            {
              WHTNotDeductTax: sequelize.literal(`${tax}`),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterCreate: async (record, options) => {
          let value = parseFloat(record.whtWhichIsNotDeducted) || 0.0;
          let tax;
          tax = value * 0.1;
          // Update totalTax table
          await totalTax.update(
            {
              WHTNotDeductTax: sequelize.literal(`${tax}`),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterDestroy: async (record, options) => {
          let tax = 0;
          // Update totalTax table
          await totalTax.update(
            {
              WHTNotDeductTax: sequelize.literal(`${tax}`),
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

  return whtWhichIsNotDeducted;
};
