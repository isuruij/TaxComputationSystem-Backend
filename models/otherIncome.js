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
    oI_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oI_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return otherIncome;
};
