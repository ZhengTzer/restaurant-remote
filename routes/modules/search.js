const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

//search
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const queryWord = "'" + req.query.keyword + "'"
  console.log(queryWord)
  // const query = {
  //   $and: [
  //     { name: { $regex: queryWord, $options: 'i' } },
  //     { name_en: { $regex: queryWord, $options: 'i' } }
  //   ]
  // }

  restaurantDBTable
    .find({ name_en: { $regex: queryWord, $options: 'i' } })
    .lean()
    .then((restaurantListTable) =>
      res.render('index', { restaurantListTable, keyword })
    )
    .catch((error) => console.log(error))
})

// module export
module.exports = router
