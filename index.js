const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("express-async-errors");
require("dotenv").config();
//to file upload
// const multer = require("multer");
// const path = require("path");

const db = require("./models");

const app = express();
app.use(express.json());
app.use(cookieParser());

//For upload docs
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./public/Images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });
// const multipleUpload = upload.fields([
//   { name: "file1" },
//   { name: "file2" },
//   { name: "file3" },
//   { name: "file4" },
//   { name: "file5" },
//   { name: "file6" },
//   { name: "file7" },
//   { name: "file8" },
//   { name: "file9" },
//   { name: "file10" },
//   { name: "file11" },
//   { name: "file12" },
//   { name: "file13" },
// ]);

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
app.use("/api/taxpayer", taxpayerRoutes);
const dataentryRoutes = require("./Routes/DataEntryRoute");
app.use("/api/dataentry", dataentryRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong!");
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
