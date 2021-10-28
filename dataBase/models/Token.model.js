const Sequelize = require('sequelize');

const { sequelize } = require("../index");

const TODO = require('./ToDo.model');
const User = require('./Users.model');

class Token extends Sequelize.Model {}

Token.init(
  {
    id_token: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    user_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    value: {
        type: Sequelize.STRING(192),
        allowNull: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "token" }
);

module.exports = Token;
