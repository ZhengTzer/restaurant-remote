const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

//search
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const queryWord = "'" + req.query.keyword + "'"
  const query = {
    $and: [
      { name: { $regex: queryWord, $options: 'i' } },
      { name_en: { $regex: queryWord, $options: 'i' } }
    ]
  }

  restaurantDBTable
    .find(query)
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))
    .catch((error) => console.log(error))
})

// module export
module.exports = router
