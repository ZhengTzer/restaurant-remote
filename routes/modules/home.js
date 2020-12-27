const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

// index page
router.get('/', (req, res) => {
  const sortOption = req.query.sort
  console.log(sortOption)

  // to be develope
  const sortMethod = [
    { name_en: 1 },
    { name_en: -1 },
    { location: 1 },
    { category: 1 }
  ]
  console.log(sortMethod)

  restaurantDBTable
    .find()
    .lean()
    .sort(sortMethod[sortOption])
    .then((restaurantListTable) => res.render('index', { restaurantListTable }))
})

// module export
module.exports = router
