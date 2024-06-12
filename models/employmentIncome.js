module.exports = (sequelize, DataTypes) => {
  const employmentIncome = sequelize.define("employmentIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    employmentIncome: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    eI_docname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "path"
    },
    eI_Note: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "path"
    },
  });

  return employmentIncome;
};
