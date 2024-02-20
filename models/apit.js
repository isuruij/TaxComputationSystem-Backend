module.exports = (sequelize, DataTypes) => {
    const apit = sequelize.define("apit", {

      taxCreditId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      apit: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return apit;
  };
  