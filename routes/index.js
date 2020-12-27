const express = require('express')
const router = express.Router()

// route
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')

// route
router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/search', search)

// module export
module.exports = router
