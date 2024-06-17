module.exports = (sequelize, DataTypes) => {
  const investmentIncome = sequelize.define("investmentIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    investmentIncome: {
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
    iI_Note: {
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

  return investmentIncome;
};
