const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

// index page
router.get('/', (req, res) => {
  const sortOption = req.query.sort

  const sortMethod = [
    { name: 1 },
    { name: -1 },
    { location: 1 },
    { rating: -1 }
  ]

  restaurantDBTable
    .find()
    .lean()
    .sort(sortMethod[sortOption])
    .then((restaurantListTable) => res.render('index', { restaurantListTable }))
    .catch((error) => console.log(error))
})

// module export
module.exports = router
