const Sequelize = require('sequelize');

const { sequelize } = require("../index0");
const Contact_persons = require('./Contact_persons.model');
const Organization = require('./Organization.model ');
const Physical_client = require('./Physical_client.model');
const Contracts = require('./Contracts.model');

const Tasks = require('./Tasks.model');
const Token = require('./Token.model');

class Employee extends Sequelize.Model {}

Employee.init(
  {
    id_employee: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    last_name_employee: {
        type: Sequelize.STRING,
    },
    name_employee: {
        type: Sequelize.STRING,
    },
    patronymic_employee: {
        type: Sequelize.STRING,
    },
    employee_status: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.REAL,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "employees" }
);

// Employee.hasMany(Token);
Token.belongsTo(Employee, {foreignKey: "userId"});

// Employee.hasMany(Tasks);
Tasks.belongsTo(Employee, {foreignKey: "idAuthor"});
Tasks.belongsTo(Employee, {foreignKey: "idExecutor"});

// Contracts.hasMany(Tasks);
Tasks.belongsTo(Contracts, {foreignKey: "contractId"});

// Contact_persons.hasMany(Tasks);
Tasks.belongsTo(Contact_persons, {foreignKey: "idContactPerson"});

// Contact_persons.hasOne(Organization);
Organization.belongsTo(Contact_persons, {foreignKey: "idContactPerson"});

// Contact_persons.hasMany(Physical_client);
Physical_client.belongsTo(Contact_persons, {foreignKey: "idContactPerson"});

module.exports = Employee;
