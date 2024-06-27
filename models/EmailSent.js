module.exports = (sequelize, DataTypes) => {
  const EmailSent = sequelize.define("EmailSent", {
    emailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false, // Sender should always be present for sent emails
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: false, // Recipient should always be present
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT, // TEXT data type for potentially long email bodies
      allowNull: true,
    },

  });

  // EmailSent.associate = (models) => {
  //   EmailSent.belongsTo(models.Taxpayer, {
  //     foreignKey: "taxpayerId",
  //     as: "Taxpayer", // This alias must match the model used in the include statemen
  //   });
  // };

  return EmailSent;
};
