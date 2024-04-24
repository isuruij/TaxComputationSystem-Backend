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
    isViewed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },


  });
  
  Notification.associate = models => {
    Notification.belongsTo(models.Taxpayer, {
      foreignKey: 'taxpayerId', // Assuming taxpayerId is the foreign key in the BusinessIncome table referencing Taxpayer's id
      targetKey: 'id' // The target key in the Taxpayer table to which the foreign key in the BusinessIncome table refers
    });
  };

  return Notification;
};
