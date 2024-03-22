module.exports = (sequelize, DataTypes) => {
  const whtWhichIsNotDeducted = sequelize.define("whtWhichIsNotDeducted", {

    assessmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    whtWhichIsNotDeducted: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return whtWhichIsNotDeducted;
};
