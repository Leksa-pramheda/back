const Sequelize = require('sequelize');

const { sequelize } = require("../index0");

class Organization extends Sequelize.Model {}

Organization.init(
  {
    id_org: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    // id_contact_person: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
    name_org: {
        type: Sequelize.STRING,
    },
    status_org: {
        type: Sequelize.STRING,
    },
    phone_org: {
        type: Sequelize.STRING(16),
    },
    email_org: {
        type: Sequelize.STRING,
    },
    address_org: {
        type: Sequelize.STRING,
    },
    fax_org: {
        type: Sequelize.STRING,
    },
    contract: {
        type: Sequelize.INTEGER,
    },
    ogrn: {
        type: Sequelize.STRING,
    },
    inn_org: {
        type: Sequelize.INTEGER,
    },
    egryul: {
        type: Sequelize.STRING,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "organizations" }
);


module.exports = Organization;
