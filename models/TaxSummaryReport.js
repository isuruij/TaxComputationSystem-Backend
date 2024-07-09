module.exports = (sequelize, DataTypes) => {
  const TaxSummaryReport = sequelize.define("TaxSummaryReport", {
    reportId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxpayerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Taxpayers",
        key: "id",
      },
    },
  });

  TaxSummaryReport.associate = (models) => {
    TaxSummaryReport.belongsTo(models.Taxpayer, { foreignKey: "taxpayerId" });
  };

  return TaxSummaryReport;
};
