module.exports = (sequelize, DataTypes) => {
  const reliefForRentIncome = sequelize.define("reliefForRentIncome", {
    reliefid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    reliefForRentIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rRI_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rRI_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return reliefForRentIncome;
};
