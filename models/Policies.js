module.exports = (sequelize, DataTypes) => {
    const Policies = sequelize.define("Policies", {
        policyId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    });

    const insertInitialData = async () => {
      const count = await Policies.count();
      if (count === 0) {
          const initialData = [
              { title: 'Policy A', amount: 1000.0, rate: 1.5 },
              { title: 'Policy B', amount: 2000.0, rate: 2.0 },
              { title: 'Policy C', amount: 1500.0, rate: 1.8 },
          ];

          await Policies.bulkCreate(initialData);
          console.log("Initial data inserted successfully");
      } else {
          console.log("Initial data already exists");
      }
  };

  // Ensure this function runs after the model is defined
  Policies.afterSync(insertInitialData);
   
    return Policies;
  };
  