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

const removeExtra = async (item) => {
    if (item.changed('link')) {
        item.link = item.link.split('ref=')[0]
    }
    if (item.changed('email')) {
        item.email = item.email.trim()
    }
}

Item.beforeCreate(removeExtra)
Item.beforeUpdate(removeExtra)

module.exports = Item
