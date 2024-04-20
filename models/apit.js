module.exports = (sequelize, DataTypes) => {
  const apit = sequelize.define("apit", {
    taxCreditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    apit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return apit;
};
