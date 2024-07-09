module.exports = (sequelize, DataTypes) => {
  const totalTax = sequelize.define("totalTax", {
    totTaxId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    taxableAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    taxableAmount2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    incomeTax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    incomeTax2: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    TerminalTax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    CapitalTax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    WHTNotDeductTax: {
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
      onDelete: 'CASCADE',
    },
  });

  return totalTax;
};
