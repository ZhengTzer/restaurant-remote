const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

//search
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  restaurantDBTable
    .find()
    .lean()
    .then((restaurantListTable) => {
      const searchRestaurant = restaurantListTable.filter(
        (restaurantListTable) => {
          return (
            restaurantListTable.name.toLowerCase().includes(keyword) ||
            restaurantListTable.category.toLowerCase().includes(keyword)
          )
        }
      )
      res.render('index', {
        restaurantListTable: searchRestaurant,
        keyword: keyword
      })
    })
    .catch((error) => console.error(error))
})

// module export
module.exports = router
