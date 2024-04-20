module.exports = (sequelize, DataTypes) => {
  const Policies = sequelize.define("Policies", {
    policyId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    policyTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    policyDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Policies;
};
