module.exports = (sequelize, DataTypes) => {
  const whtWhichIsNotDeducted = sequelize.define("whtWhichIsNotDeducted", {

    assessmentId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    whtWhichIsNotDeducted: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return whtWhichIsNotDeducted;
};
