module.exports = (sequelize, DataTypes) => {
  const otherIncome = sequelize.define("otherIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    otherIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return otherIncome;
};
