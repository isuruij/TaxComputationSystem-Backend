module.exports = (sequelize, DataTypes) => {
  const whtOnServiceFeeReceived = sequelize.define("whtOnServiceFeeReceived", {
    taxCreditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    whtOnServiceFeeReceived: {
      type: DataTypes.DOUBLE,
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
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isnewsubmission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
  });

  return whtOnServiceFeeReceived;
};
