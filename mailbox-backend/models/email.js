const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");

const Email = sequelize.define("email", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    defaultValue: "No Subject",
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Email.belongsTo(User);
User.hasMany(Email);

module.exports = Email;
