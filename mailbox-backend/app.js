const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

require("dotenv").config();

const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");

const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());


app.use("/api/user", userRoutes);

sequelize
  .sync()
  .then((res) => {
    app.listen(3001);
    console.log('connected to the database')
  })
  .catch((err) => {});
