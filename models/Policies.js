module.exports = (sequelize, DataTypes) => {
    const Policies = sequelize.define("Policies", {
        policyId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
   
    return Policies;
  };
  