module.exports = (sequelize, DataTypes) => {
  const totalTax = require("./totalTax")(sequelize, DataTypes);

  const capitalValueGain = sequelize.define(
    "capitalValueGain",
    {
      assessmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      capitalValueGain: {
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
      cVnG_Note: {
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
          const newValue = parseFloat(record.capitalValueGain || 0);

          let tax = newValue * 0.1;
          // Update totalTax table
          await totalTax.update(
            {
              CapitalTax: sequelize.literal(`${tax}`),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterCreate: async (record, options) => {
          let value = parseFloat(record.capitalValueGain) || 0.0;
          let tax;
          tax = value * 0.1;
          // Update totalTax table
          await totalTax.update(
            {
              CapitalTax: sequelize.literal(`${tax}`),
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
              CapitalTax: sequelize.literal(`${tax}`),
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

  return capitalValueGain;
};
