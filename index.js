const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
//to file upload
const multer = require("multer");
const path = require("path");

const db = require("./models");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(bodyparser.json());

//Routers
const taxpayerRoutes = require("./Routes/TaxpayerRoute");
const dataentryRoutes = require("./Routes/DataEntryRoute");
const SuperAdminRoutes = require("./Routes/SuperAdminRoute");
const { FORCE } = require("sequelize/lib/index-hints");
app.use("/api/taxpayer", taxpayerRoutes);
app.use("/api/dataentry", dataentryRoutes);
app.use("/api/SuperAdmin", SuperAdminRoutes);
 
db.sequelize.sync({force:false}).then(() => { 
  app.listen(3000, () => {
    console.log("Server running on port 3000"); 
  });
}); 
 