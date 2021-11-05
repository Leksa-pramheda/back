const dbConfig = require("./db-config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  ...dbConfig,
  models: __dirname + "/*.model.*",
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelizeInstance.dropSchema("public", {});
    // await sequelizeInstance.createSchema("public", {});
    console.log("Sequelize was initialized");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = {
  sequelize,
  initDB,
};

//initDB();
