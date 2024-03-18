module.exports = (sequelize, DataTypes) => {
    const selfAssessmentPayment = sequelize.define("selfAssessmentPayment", {

      taxCreditId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      selfAssessmentPayment: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return selfAssessmentPayment;
  };
  