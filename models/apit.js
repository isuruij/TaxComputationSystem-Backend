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
      allowNull: true,
    },
    docname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aPIT_Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isnewsubmission: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return apit;
};
