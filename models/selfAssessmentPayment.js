module.exports = (sequelize, DataTypes) => {
  const sumOfCat = require("./sumOfCat")(sequelize, DataTypes);

  const selfAssessmentPayment = sequelize.define(
    "selfAssessmentPayment",
    {
      taxCreditId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      selfAssessmentPayment: {
        type: DataTypes.FLOAT,
        default: 0,
      },
      selfAssessmentPayment2: {
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
      sAP_Note: {
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

          const oldValue = previousRecord.selfAssessmentPayment || 0;
          const newValue = record.selfAssessmentPayment || 0;
          const oldValue2 = previousRecord.selfAssessmentPayment2 || 0;
          const newValue2 = record.selfAssessmentPayment2 || 0;

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
          let value = record.selfAssessmentPayment;
          let value2 = record.selfAssessmentPayment2;
          if (!record.selfAssessmentPayment) {
            value = 0;
          } else if (!record.selfAssessmentPayment2) {
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
                `totTaxCredit - ${previousRecord.selfAssessmentPayment}- ${previousRecord.selfAssessmentPayment2}`
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

  return selfAssessmentPayment;
};
