module.exports = (sequelize, DataTypes) => {
    const selfAssessmentPayment = sequelize.define("selfAssessmentPayment", {

      taxCreditId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      selfAssessmentPayment: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return selfAssessmentPayment;
  };
  