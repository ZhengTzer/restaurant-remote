const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')

// route
router.use('/', home)
router.use('/restaurant', restaurant)

// module export
module.exports = router
