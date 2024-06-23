module.exports = (sequelize, DataTypes) => {
  const whtOnInvestmentIncome = sequelize.define("whtOnInvestmentIncome", {
    taxCreditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    whtOnInvestmentIncome: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    docname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wHT_II_Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isnewsubmission: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return whtOnInvestmentIncome;
};
