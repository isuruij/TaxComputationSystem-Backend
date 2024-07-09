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
            allowNull: false,  // Sender should always be present for sent emails
        },
        recipient: {
            type: DataTypes.STRING,
            allowNull: false,  // Recipient should always be present
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,  // TEXT data type for potentially long email bodies
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
        sentDate: {
            type: DataTypes.DATE,
            allowNull: false,  // Date should always be recorded when email is sent
        },
        isDelivered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,  // Emails are marked as not delivered by default
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,  // Emails are marked as unread by default
        },

    });

    EmailSent.associate = (models) => {
        EmailSent.belongsTo(models.Taxpayer, {
            foreignKey: 'taxpayerId',
            as: 'Taxpayer' // This alias must match the model used in the include statemen
        }); 
    };

    return EmailSent;
};
