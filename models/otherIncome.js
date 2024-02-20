module.exports = (sequelize, DataTypes) => {
    const otherIncome = sequelize.define("otherIncome", {

      incomeId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      otherIncome: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return otherIncome;
  };
  