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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Email.belongsTo(User, { as: 'Sender', foreignKey: 'userId' });
User.hasMany(Email, { as: 'SentEmails', foreignKey: 'userId' });

module.exports = Email;
