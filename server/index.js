const express = require('express')

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// error handler

///////////// DB Section ///////////////
const { Sequelize, STRING, TEXT, DECIMAL } = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:fullstack25@localhost/test', { logging: false })

//////////// Models //////////////////
const User = db.define('user', {
    name: {
        type: STRING
    },
    email: {
        type: STRING,
        unique: true
    },
    password: {
        type: STRING,
    }
})

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

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        console.log('DB authenticated')
        await db.sync({ force: true })
        console.log('DB Ready!')
    }
    catch (err) {
        console.log(err)
    }
}


const init = async () => {
    try {
        const port = process.env.PORT || 3000;

        await syncAndSeed()
        await app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

init()