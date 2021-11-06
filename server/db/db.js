const { Sequelize } = require('sequelize')

const config = {
    logging: false
};

if (process.env.HEROKU_POSTGRESQL_NAVY_URL) {
    config.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    };
}

const db = new Sequelize(process.env.HEROKU_POSTGRESQL_NAVY_URL || 'postgres://postgres:fullstack25@localhost/test', config)

module.exports = db;