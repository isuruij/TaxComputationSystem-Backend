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
    wHT_WND_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wHT_WND_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return whtWhichIsNotDeducted;
};
