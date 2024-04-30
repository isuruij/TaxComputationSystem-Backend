module.exports = (sequelize, DataTypes) => {
  const reliefForExpenditure = sequelize.define("reliefForExpenditure", {
    reliefid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    reliefForExpenditure: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rE_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rE_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return reliefForExpenditure;
};
