module.exports = (sequelize, DataTypes) => {
    const PaidTax = sequelize.define("PaidTax", {
      paidTaxId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Paid: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      taxpayerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Taxpayers",
          key: "id",
        },
      },
    });
  
    return PaidTax;
  };
  