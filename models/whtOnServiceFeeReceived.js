module.exports = (sequelize, DataTypes) => {
  const whtOnServiceFeeReceived = sequelize.define("whtOnServiceFeeReceived", {
    taxCreditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    whtOnServiceFeeReceived: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return whtOnServiceFeeReceived;
};
