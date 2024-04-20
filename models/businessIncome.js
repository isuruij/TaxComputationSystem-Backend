module.exports = (sequelize, DataTypes) => {
  const businessIncome = sequelize.define("businessIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    businessIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  businessIncome.associate = (models) => {
    businessIncome.belongsTo(models.Taxpayer, {
      foreignKey: "taxpayerId", // Assuming taxpayerId is the foreign key in the BusinessIncome table referencing Taxpayer's id
      targetKey: "id", // The target key in the Taxpayer table to which the foreign key in the BusinessIncome table refers
    });
  };

  return businessIncome;
};
