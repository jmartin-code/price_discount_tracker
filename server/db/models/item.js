const db = require('../db')
const { STRING, TEXT, DECIMAL } = require('sequelize')


const Item = db.define('item', {
    name: {
        type: STRING
    },
    link: {
        type: TEXT,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    imageURL: {
        type: TEXT
    },
    price: {
        type: DECIMAL
    },
    targetPrice: {
        type: DECIMAL,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

module.exports = Item
