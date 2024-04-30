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
    wHT_II_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wHT_II_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return whtOnInvestmentIncome;
};
