const router = require('express').Router()
const { models: { Item } } = require('../db')
const sendEmail = require('../email')
const scrapper = require('../scraper')

router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll({
            order: [["updatedAt", "DESC"]],
        })
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

        let priceInfo;
        if (item.targetPrice * 1 >= item.price * 1) {
            priceInfo = 'Item price hit your target price! Time to buy!'
        }
        else {
            priceInfo = "Item price is above your target price. Let's wait for a better deal!"
        }
        const status = 'Your are monitoring a new item:'

        await sendEmail(item, priceInfo, status)

        res.status(201).send(item)
    } catch (err) {
        next(err)
    }
})

router.put('/', async (req, res, next) => {
    try {
        const { id, url, email, targetPrice, price } = req.body
        const item = await Item.findByPk(id);

        if (item.link !== url) {
            console.log('testing')
            const { itemName, itemImage, itemPrice } = await scrapper(url);
            await item.update({ link: url, email: email, targetPrice: targetPrice, name: itemName, imageURL: itemImage, price: itemPrice })
        }
        else {
            await item.update({ email: email, targetPrice: targetPrice, price: price })
        }

        let priceInfo;
        if (item.targetPrice * 1 >= item.price * 1) {
            priceInfo = 'Item price hit your target price! Time to buy!'
        }
        else {
            priceInfo = "Item price is above your target price. Let's wait for a better deal!"
        }

        const status = 'You updated an item:'
        await sendEmail(item, priceInfo, status)

        res.status(201).send(item)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const item = await Item.findByPk(id)
        await item.destroy();

        res.status(201).json(item)
    } catch (err) {
        next(err)
    }
})

module.exports = router