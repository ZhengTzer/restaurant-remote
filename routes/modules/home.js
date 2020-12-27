const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

// index page
router.get('/', (req, res) => {
  restaurantDBTable
    .find()
    .lean()
    .then((restaurantListTable) => res.render('index', { restaurantListTable }))
})

// module export
module.exports = router
