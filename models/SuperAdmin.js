
module.exports = (sequelize, DataTypes) => {
    const SuperAdmin = sequelize.define("SuperAdmin", {
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
    
    return SuperAdmin;
  };
  