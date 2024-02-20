// admin.js
module.exports = (sequelize, DataTypes) => {
    const SecondAdmin = sequelize.define("SecondAdmin", {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    
    return SecondAdmin;
  };
  