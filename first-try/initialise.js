console.log("in init");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
        HOST: "localhost",
        USER: "alexa",
        PASSWORD: "Leksa@25",
        //DB: "js",
        dialect: "postgres",
        pool: {
          max: 15,
          min: 5,
          idle: 20000,
          evict: 15000,
          acquire: 30000
        }
      });

const initDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Sequelize was initialized');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = {
    sequelize,
    initDB
};