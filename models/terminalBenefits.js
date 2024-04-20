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
      allowNull: false,
    },
  });

  return terminalBenefits;
};
