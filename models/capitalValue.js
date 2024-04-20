module.exports = (sequelize, DataTypes) => {
  const capitalValue = sequelize.define("capitalValue", {
    assessmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    capitalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return capitalValue;
};
