'use strict';

// uncomment this and comment below for development
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "1234",
    DB: "bookstore",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
/* module.exports = {
    HOST: process.env.PGHOST,
    USER: process.env.PGUSER,
    PASSWORD: process.env.PGPWD,
    DB: process.env.PGDB,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
 */