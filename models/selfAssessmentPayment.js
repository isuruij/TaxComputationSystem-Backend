module.exports = (sequelize, DataTypes) => {
  const selfAssessmentPayment = sequelize.define("selfAssessmentPayment", {
    taxCreditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    selfAssessmentPayment: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    sAP_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sAP_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return selfAssessmentPayment;
};
