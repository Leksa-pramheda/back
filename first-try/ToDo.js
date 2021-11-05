console.log("in ToDO");
const Sequelize = require('sequelize');
const { sequelize } = require('./initialise');

class ToDo extends Sequelize.Model {}

ToDo.init(
    {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING  
    },
}
//     { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = ToDo