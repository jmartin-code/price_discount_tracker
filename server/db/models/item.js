const db = require('../db')
const { STRING, TEXT, DECIMAL } = require('sequelize')


const Item = db.define('item', {
    name: {
        type: STRING
    },
    link: {
        type: TEXT,
        allowNull: false
    },
    imageURL: {
        type: TEXT
    },
    price: {
        type: DECIMAL
    },
    targetPrice: {
        type: DECIMAL
    },
    email: {
        type: STRING
    }
})

module.exports = Item
