const { Sequelize } = require('sequelize')

if (process.env.DATABASE_URL) {
    config.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    };
}

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:fullstack25@localhost/test', { logging: true })

module.exports = db;