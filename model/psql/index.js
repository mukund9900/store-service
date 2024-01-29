/* This code is setting up a connection to a PostgreSQL database using the Sequelize library in
JavaScript. */
const dbConfig = require("../../config/postgresql.js");

const Sequelize = require("sequelize");
/* The code is creating a new instance of the Sequelize class and initializing it with the database
configuration parameters. */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.book = require("./bookStore.model.js")(sequelize, Sequelize);

module.exports = db;
