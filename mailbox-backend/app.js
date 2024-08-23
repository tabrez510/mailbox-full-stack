const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");

const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use("/api/user", userRoutes);

sequelize
  .sync()
  .then((res) => {
    app.listen(3001);
    console.log('connected to the database')
  })
  .catch((err) => {});
