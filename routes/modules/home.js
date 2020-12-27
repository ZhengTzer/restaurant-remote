const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

// index page
router.get('/', (req, res) => {
  const sortOption = req.query.sort
  console.log(sortOption)

  // to be develope
  let sort = []
  console.log(sort)

  restaurantDBTable
    .find()
    .lean()
    .sort(...sort)
    .then((restaurantListTable) => res.render('index', { restaurantListTable }))
})

// module export
module.exports = router
