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
    wHT_WND_Note: {
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

  return whtWhichIsNotDeducted;
};
