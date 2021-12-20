const Sequelize = require('sequelize');

const { sequelize } = require("../index0");
class Contracts extends Sequelize.Model {}

Contracts.init(
  {
    contract_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },    
    contract_number: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
  },
    equipment_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "contracts" }
);

module.exports = Contracts;
