module.exports = (sequelize, DataTypes) => {
  const otherIncome = sequelize.define("otherIncome", {
    incomeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    otherIncome: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    oI_docname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "path"
    },
    oI_Note: {
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

  return otherIncome;
};
