module.exports = (sequelize, DataTypes) => {
    const Policies = sequelize.define("Policies", {
        policyId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      policyTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      policyDetails: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
   
    return Policies;
  };
  