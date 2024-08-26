const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Email = require("./email"); // Changed from './user' to './email'
const User = require("./user");

const Recipient = sequelize.define("recipient", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("TO", "CC", "BCC"),
    allowNull: false,
  }
});

Recipient.belongsTo(User, { as: 'RecipientUser', foreignKey: 'userId' });
Recipient.belongsTo(Email, { as: 'Email', foreignKey: 'emailId' });

User.hasMany(Recipient, { as: 'ReceivedEmails', foreignKey: 'userId' });
Email.hasMany(Recipient, { as: 'Recipients', foreignKey: 'emailId' });

module.exports = Recipient;
