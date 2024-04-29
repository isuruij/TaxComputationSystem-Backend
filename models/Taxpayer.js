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
    emailToken: {
      type: DataTypes.STRING,
    },
    isVerifiedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVerifiedUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    numOfSubmissions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Taxpayer.associate = (models) => {
    Taxpayer.hasMany(models.apit, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.businessIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.capitalValueGain, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.Document, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.employmentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.investmentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.Notification, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.otherIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.qualifyingPayments, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.reliefForExpenditure, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.reliefForRentIncome, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.selfAssessmentPayment, {
      foreignKey: "taxpayerId",
    });
    Taxpayer.hasMany(models.TaxSummaryReport, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.terminalBenefits, { foreignKey: "taxpayerId" });
    Taxpayer.hasMany(models.whtOnInvestmentIncome, {
      foreignKey: "taxpayerId",
    });
    Taxpayer.hasMany(models.whtOnServiceFeeReceived, {
      foreignKey: "taxpayerId",
    });
    Taxpayer.hasMany(models.whtWhichIsNotDeducted, {
      foreignKey: "taxpayerId",
    });
  };

  return Taxpayer;
};
