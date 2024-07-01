module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const businessIncome = sequelize.define(
    "businessIncome",
    {
      incomeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      businessIncome: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      businessIncome2: {
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
      bI_Note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isnewsubmission: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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

          const previousIncome = previousRecord.businessIncome;
          const newIncome = record.businessIncome;
          const previousIncome2 = previousRecord.businessIncome2;
          const newIncome2 = record.businessIncome2;

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
        //         `TotAssessableIncome + ${record.businessIncome}`
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
                `TotAssessableIncome - ${previousRecord.businessIncome}`
              ),
              TotAssessableIncome2: sequelize.literal(
                `TotAssessableIncome2 - ${previousRecord.businessIncome2}`
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

  businessIncome.associate = (models) => {
    businessIncome.belongsTo(models.Taxpayer, {
      foreignKey: "taxpayerId", // Assuming taxpayerId is the foreign key in the BusinessIncome table referencing Taxpayer's id
      targetKey: "id", // The target key in the Taxpayer table to which the foreign key in the BusinessIncome table refers
    });
  };

  return businessIncome;
};
