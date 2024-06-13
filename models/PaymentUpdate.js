module.exports = (sequelize, DataTypes) => {
    const PaymentUpdate = sequelize.define("PaymentUpdate", {
      PaymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Paymentname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ToPay: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Paid: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

    });
  
    PaymentUpdate.associate = (models) => {
        PaymentUpdate.belongsTo(models.Taxpayer, {
        foreignKey: "taxpayerId", // Assuming taxpayerId is the foreign key in the BusinessIncome table referencing Taxpayer's id
        targetKey: "id", // The target key in the Taxpayer table to which the foreign key in the BusinessIncome table refers
      });
    };
  
    return PaymentUpdate;
  };
  