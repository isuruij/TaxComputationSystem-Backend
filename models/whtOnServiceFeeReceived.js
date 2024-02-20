module.exports = (sequelize, DataTypes) => {
    const whtOnServiceFeeReceived = sequelize.define("whtOnServiceFeeReceived", {

      taxCreditId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      whtOnServiceFeeReceived: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return whtOnServiceFeeReceived;
  };
  