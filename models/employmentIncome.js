module.exports = (sequelize, DataTypes) => {
  const employmentIncome = sequelize.define("employmentIncome", {

    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    employmentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  

  return employmentIncome;
};
