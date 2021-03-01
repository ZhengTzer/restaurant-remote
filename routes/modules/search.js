const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

//search better option
router.get('/', (req, res) => {
  const keyword = req.query.keyword

  restaurantDBTable
    .find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { name_en: { $regex: keyword, $options: 'i' } }
      ]
    })
    .lean()
    .then((restaurantListTable) =>
      res.render('index', { restaurantListTable, keyword })
    )
    .catch((error) => console.log(error))
})

// module export
module.exports = router
