const express = require('express')
const app = express()

////// Middleware //////
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// error handler

/////// Scraping and Emailing section /////////////
const puppeteer = require('puppeteer')
const num = require('numeral')
const nodemailer = require('nodemailer')
const cron = require('node-cron')

const scrapper = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const titleSelector = '#productTitle'
    await page.waitForSelector(titleSelector)
    const res = await page.evaluate(() => {
        const itemName = document.querySelector('#productTitle').innerText;
        const itemImage = document.querySelector("#imgTagWrapperId > img").src
        const itemPrice = parseFloat(document.querySelector('span.a-price > span').innerText.replace(/[^0-9.-]+/g, ""));

        return {
            itemName,
            itemImage,
            itemPrice
        }
    })
    console.log(res)
    await browser.close()
}

///Sony camera
// scrapper('https://www.amazon.com/Sony-Full-Frame-Mirrorless-Interchangeable-Camera/dp/B09JZT6YK5/')

/// Sweater
scrapper('https://www.amazon.com/Hanes-EcoSmart-Fleece-Sweatshirt-Small/dp/B072K68D77/')


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

///////// Associations //////////////


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