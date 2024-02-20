module.exports = (sequelize, DataTypes) => {
  const reliefForRentIncome = sequelize.define("reliefForRentIncome", {

    reliefid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    reliefForRentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return reliefForRentIncome;
};
