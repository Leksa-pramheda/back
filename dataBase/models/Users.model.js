const Sequelize = require('sequelize');

const { sequelize } = require("../index");
const TODO = require('./ToDo.model');
const Token = require('./Token.model');

class User extends Sequelize.Model {}

User.init(
  {
    user_id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
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

User.hasMany(Token, {})

User.hasMany(TODO, {})

module.exports = User;
