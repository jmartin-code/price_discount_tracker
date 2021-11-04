const router = require('express').Router()
const { models: { Item } } = require('../db')
const scrapper = require('../scraper')

router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll()
        res.json(items)

    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { url, email, targetPrice } = req.body

        const { itemName, itemImage, itemPrice } = await scrapper(url);

        const item = await Item.create({ name: itemName, imageURL: itemImage, link: url, targetPrice: targetPrice, email: email, price: itemPrice })
        
        res.status(201).send(item)
    } catch (err) {
        next(err)
    }
})

module.exports = router