module.exports = (sequelize, DataTypes) => {
  const investmentIncome = sequelize.define("investmentIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    investmentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return investmentIncome;
};
