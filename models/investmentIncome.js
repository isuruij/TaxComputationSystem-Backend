module.exports = (sequelize, DataTypes) => {
  const investmentIncome = sequelize.define("investmentIncome", {

    incomeId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    investmentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return investmentIncome;
};
