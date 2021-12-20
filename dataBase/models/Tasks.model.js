const Sequelize = require("sequelize");

const { sequelize } = require("../index0");

class Tasks extends Sequelize.Model {}

Tasks.init(
  {
    id_task: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,  
      unique: true,    
    },
    // id_author: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,      
    // },
    // id_executor: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,      
    // },
    // id_contact_person: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,      
    // },
    task: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    progress: {
      type: Sequelize.STRING,
      defaultValue: "запланировано",
    },
    priority: {
      type: Sequelize.STRING,
      defaultValue: "низкий",
    },
    // date_of_creation: {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    // },
    execution_date: {
      type: Sequelize.DATE,
    },
    finish_date: {
      type: Sequelize.DATE,
    },
    // contract_number: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true, 
    // },
  },
  { sequelize: sequelize, underscored: true, modelName: "tasks" }
);

module.exports = Tasks;
