module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define("Document", {
      documentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    });
   
    return Document;
  };
  