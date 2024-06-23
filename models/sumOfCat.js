module.exports = (sequelize, DataTypes) => {
  const sumOfCat = sequelize.define("sumOfCat", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    TotAssessableIncome: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    TotQPnR: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totTaxCredit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    terminal: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    capitalGain: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    WHT: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  return sumOfCat;
};
