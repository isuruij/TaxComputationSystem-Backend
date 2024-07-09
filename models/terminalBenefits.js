module.exports = (sequelize, DataTypes) => {
  const totalTax = require("./totalTax")(sequelize, DataTypes);

  const terminalBenefits = sequelize.define(
    "terminalBenefits",
    {
      assessmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      terminalBenefits: {
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
      tB_Note: {
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
          const newValue = parseFloat(record.terminalBenefits || 0);

          let tax;
          if (newValue < 1000000) {
            tax = 0.0;
          } else if (newValue > 1000000 && newValue < 2000000) {
            tax = (newValue - 1000000) * 0.06;
          } else if (newValue > 2000000) {
            tax = 1000000 * 0.06 + (newValue - 2000000) * 0.12;
          }
          // Update totalTax table
          await totalTax.update(
            {
              TerminalTax: sequelize.literal(`${tax}`),
            },
            {
              where: { taxpayerId: record.taxpayerId },
              transaction: options.transaction,
            }
          );
        },
        afterCreate: async (record, options) => {
          let value = parseFloat(record.terminalBenefits) || 0.0;
          let tax;
          if (value < 1000000) {
            tax = 0.0;
          } else if (value > 1000000 && value < 2000000) {
            tax = (value - 1000000) * 0.06;
          } else if (value > 2000000) {
            tax = 1000000 * 0.06 + (value - 2000000) * 0.12;
          }
          // Update totalTax table
          await totalTax.update(
            {
              TerminalTax: sequelize.literal(`${tax}`),
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
              TerminalTax: sequelize.literal(`${tax}`),
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

  return terminalBenefits;
};
