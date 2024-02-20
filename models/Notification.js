module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    notificationId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  return Notification;
};
