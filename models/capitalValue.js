module.exports = (sequelize, DataTypes) => {
    const capitalValue = sequelize.define("capitalValue", {

      assessmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      capitalValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return capitalValue;
  };
  