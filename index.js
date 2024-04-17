const express = require("express")
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("express-async-errors");
require('dotenv').config();

const db = require("./models")
const taxpayerRoutes = require("./Routes/TaxpayerRoute");
const SuperAdminRoutes = require("./Routes/SuperAdminRoute");
const app = express()
app.use(express.json())
app.use(cookieParser())




//middleware
app.use(cors(
  {
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  }
));

app.use(bodyparser.json());
app.use("/api/taxpayer", taxpayerRoutes); 
app.use("/api/SuperAdmin", SuperAdminRoutes); 
app.use((err, req, res, next) => {
  console.log(err); 
  res.status(err.status || 500).send("Something went wrong!");
});

db.sequelize.sync({force:false}).then(() => {
  app.listen(3000, () => {    
    console.log("Server running on port 3000");
  }); 
});           