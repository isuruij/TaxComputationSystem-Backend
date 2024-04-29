module.exports = (sequelize, DataTypes) => {
  const apit = sequelize.define("apit", {
    APITId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    apit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    aPIT_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aPIT_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return apit;
};
