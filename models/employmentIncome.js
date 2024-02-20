module.exports = (sequelize, DataTypes) => {
  const employmentIncome = sequelize.define("employmentIncome", {

    incomeId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    employmentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  

  return employmentIncome;
};
