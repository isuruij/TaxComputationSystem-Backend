module.exports = (sequelize, DataTypes) => {
  const Taxpayer = sequelize.define("Taxpayer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameofemployer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officeno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerifiedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerifiedUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    agreeToannualFee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dprSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Taxpayer.associate = (models) => {
    Taxpayer.hasOne(models.apit, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.businessIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.businessIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.Document, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.employmentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.investmentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.Notification, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.otherIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.qualifyingPayments, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.reliefForExpenditure, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.reliefForRentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.selfAssessmentPayment, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.TaxSummaryReport, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.terminalBenefits, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.whtOnInvestmentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasOne(models.whtOnServiceFeeReceived, {
      foreignKey: "taxpayerId",
    });
    Taxpayer.hasOne(models.whtWhichIsNotDeducted, { foreignKey: "taxpayerId" });
  };

  return Taxpayer;
};
