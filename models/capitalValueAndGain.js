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
    cVnG_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cVnG_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return capitalValue;
};
