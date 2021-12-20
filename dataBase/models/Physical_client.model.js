const Sequelize = require('sequelize');

const { sequelize } = require("../index0");

class Physical_client extends Sequelize.Model {}

Physical_client.init(
  {
    id_pclient: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    // id_contact_person: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
    last_name_pclient: {
        type: Sequelize.STRING,
    },
    name_pclient: {
        type: Sequelize.STRING,
    },
    patronymic_pclient: {
        type: Sequelize.STRING,
    },
    status_pclient: {
        type: Sequelize.STRING,
    },
    inn_pclient: {
        type: Sequelize.INTEGER,
    },
    phone_pclient: {
        type: Sequelize.STRING(16),
    },
    email_pclient: {
        type: Sequelize.STRING,
    },
    address_pclient: {
        type: Sequelize.STRING,
    },
    fax_pclient: {
        type: Sequelize.STRING,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "physical_clients" }
);


module.exports = Physical_client;
