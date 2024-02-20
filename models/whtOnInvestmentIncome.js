module.exports = (sequelize, DataTypes) => {
    const whtOnInvestmentIncome = sequelize.define("whtOnInvestmentIncome", {

      taxCreditId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      whtOnInvestmentIncome: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return whtOnInvestmentIncome;
  };
  