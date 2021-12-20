const Sequelize = require("sequelize");

const { sequelize } = require("../index");
// const Token = require('./Token.model');
// const User = require('./Users.model');

class TODO extends Sequelize.Model {}

TODO.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      // defaultValue: "Title",
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "Description",
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isFavourite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "todo" }
);

module.exports = TODO;
