module.exports = (sequelize, DataTypes) => {
  const qualifyingPayments = sequelize.define("qualifyingPayments", {
    reliefid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    qualifyingPayments: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    qP_docname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qP_Note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isnewsubmission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
  });

  return qualifyingPayments;
};
