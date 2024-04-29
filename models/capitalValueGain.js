module.exports = (sequelize, DataTypes) => {
  const capitalValueGain = sequelize.define("capitalValueGain", {
    assessmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    capitalValueGain: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cVnG_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cVnG_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return capitalValueGain;
};
