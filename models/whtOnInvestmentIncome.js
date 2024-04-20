module.exports = (sequelize, DataTypes) => {
  const whtOnInvestmentIncome = sequelize.define("whtOnInvestmentIncome", {
    taxCreditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    whtOnInvestmentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return whtOnInvestmentIncome;
};
