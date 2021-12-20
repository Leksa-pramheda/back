const Sequelize = require('sequelize');

const { sequelize } = require("../index0");

class Contact_persons extends Sequelize.Model {}

Contact_persons.init(
  {
    id_contact_person: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    type_of_client: {
        type: Sequelize.STRING,
    },
    id_client: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    last_name_contact_person: {
        type: Sequelize.STRING,
    },
    name_contact_person: {
        type: Sequelize.STRING,
    },
    patronymic_contact_person: {
        type: Sequelize.STRING,
    },
    phone_number: {
        type: Sequelize.STRING(16),
    },
    email: {
        type: Sequelize.STRING,
    },
    status_contact: {
        type: Sequelize.STRING,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "contact_persons" }
);


module.exports = Contact_persons;
