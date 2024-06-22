module.exports = (sequelize, DataTypes) => {
  const terminalBenefits = sequelize.define("terminalBenefits", {
    assessmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    terminalBenefits: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    terminalBenefits2: {
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
    tB_Note: {
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

  return terminalBenefits;
};
