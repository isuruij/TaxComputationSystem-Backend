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
    wHT_SFR_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wHT_SFR_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return whtOnServiceFeeReceived;
};
