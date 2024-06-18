module.exports = (sequelize, DataTypes) => {
  const terminalBenefits = sequelize.define("terminalBenefits", {
    assessmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    terminalBenefits: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tB_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tB_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isnewsubmission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
  });

  return terminalBenefits;
};
