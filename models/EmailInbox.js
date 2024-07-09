module.exports = (sequelize, DataTypes) => {
    const EmailInbox = sequelize.define("EmailInbox", {
      emailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recipient: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT, // TEXT data type used for potentially long email bodies
        allowNull: true,
      },
      docname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      receivedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Emails are marked as unread by default
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Emails are not archived by default
      }
    });

    EmailInbox.associate = (models) => {
        EmailInbox.belongsTo(models.Taxpayer, {
          foreignKey: 'taxpayerId',
          as: 'Taxpayer' // This alias must match the model used in the include statement
        });
      };
      
  
    return EmailInbox;
  };
  