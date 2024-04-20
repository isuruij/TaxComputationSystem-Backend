module.exports = (sequelize, DataTypes) => {
  const qualifyingPayments = sequelize.define("qualifyingPayments", {
    reliefid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    qualifyingPayments: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return qualifyingPayments;
};
