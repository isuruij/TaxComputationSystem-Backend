module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    notificationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  return Notification;
};
