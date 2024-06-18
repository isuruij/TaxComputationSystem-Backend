module.exports = (sequelize, DataTypes) => {
  const investmentIncome = sequelize.define("investmentIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    investmentIncome: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    iI_docname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "path"
    },
    iI_Note: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "path"
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

  return investmentIncome;
};
