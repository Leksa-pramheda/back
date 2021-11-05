const Sequelize = require('sequelize');

const { sequelize } = require("../index");
const TODO = require('./ToDo.model');
const Token = require('./Token.model');

class User extends Sequelize.Model {}

User.init(
  {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(Token);
// Token.belongsTo(User, {foreignKey: userid});
User.hasMany(TODO);
// TODO.belongsTo(User, {foreignKey: userid});

module.exports = User;
