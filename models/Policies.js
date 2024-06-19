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
      },
      optional:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
      
    });

    const insertInitialData = async () => {
      const count = await Policies.count();
      if (count === 0) {
          const initialData = [
              { title: 'personal relief for 9 months', amount:2250000, rate: 0 },
              { title: 'personal relief for 3 months', amount: 300000, rate: 0 },
              { title: 'Rent relief', amount:0, rate: 25 },
              { title: 'Expenditure relief for 9 months', amount:900000, rate: 0 },
              { title: 'Expenditure relief for 9 months', amount:0, rate: 0 },
              { title: 'Income tax first 2,250,000 for 9 months', amount:0, rate:6 },
              { title: 'Income tax next 2,250,000 for 9 months', amount:0, rate:12 },
              { title: 'Income tax (remain balance)balance for 9 months', amount:0, rate:18 },
              { title: 'Income tax first 125,000 for 3 months', amount:0, rate:6 },
              { title: 'Income tax next 125,000 for 3 months', amount:0, rate:12 },
              { title: 'Income tax next 125,000 for 3 months', amount:0, rate:18 },
              { title: 'Income tax next 125,000 for 3 months', amount:0, rate:24 },
              { title: 'Income tax next 125,000 for 3 months', amount:0, rate:30 },
              { title: 'Income tax next balance for 3 months', amount:0, rate:36 },
              { title: 'Capital gain tax rate', amount:0, rate:10 },
              { title: 'Tax on terminal benefits 0 – 10,000,000', amount:0, rate:0 },
              { title: 'Tax on terminal benefits 10,000,000 – 20,000,000', amount:0, rate:6 },
              { title: 'Tax on terminal benefits exceeding 20,000,000', amount:0, rate:12 }, 
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
  