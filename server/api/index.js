const router = require('express').Router()

const itemsRoute = require('./items')

router.use('/items', itemsRoute)

router.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})


module.exports = router