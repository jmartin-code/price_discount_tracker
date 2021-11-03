const router = require('express').Router()
const { models: { Item } } = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll()
        res.json(items)

    } catch (err) {
        next(err)
    }
})

module.exports = router