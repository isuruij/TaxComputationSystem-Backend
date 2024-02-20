module.exports = (sequelize, DataTypes) => {
  const qualifyingPayments = sequelize.define("qualifyingPayments", {

    reliefid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    qualifyingPayments: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return qualifyingPayments;
};
