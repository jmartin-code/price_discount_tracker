const db = require('../db')
const { STRING, TEXT, DECIMAL } = require('sequelize')


const Item = db.define('item', {
    name: {
        type: STRING
    },
    link: {
        type: TEXT
    },
    imageURL: {
        type: TEXT
    },
    price: {
        type: DECIMAL
    },
    targetPrice: {
        type: DECIMAL
    }
})

module.exports = Item
