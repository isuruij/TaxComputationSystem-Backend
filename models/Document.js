module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define("Document", {
      documentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    });
   
    return Document;
  };
  