const dbConfig = require("./db-config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  ...dbConfig,
  models: __dirname + "/*.model.*",
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.dropSchema("public", {});
    // await sequelize.createSchema("public", {});
    await sequelize.sync();
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
