module.exports = (sequelize, DataTypes) => {
  const totalTax = sequelize.define("totalTax", {
    totTaxId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    taxName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taxableAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    paid: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  return totalTax;
};
