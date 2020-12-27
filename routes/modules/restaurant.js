const express = require('express')
const router = express.Router()
const restaurantDBTable = require('../../models/restaurantModel')

// route
//show
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantDBTable
    .findById(id)
    .lean()
    .then((singleRestaurant) => res.render('show', { singleRestaurant }))
})

//new
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  return restaurantDBTable
    .create({
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantDBTable
    .findById(id)
    .lean()
    .then((singleRestaurant) => res.render('edit', { singleRestaurant }))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  return restaurantDBTable
    .findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((error) => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurantDBTable
    .findById(id)
    .then((deleteRestaurant) => deleteRestaurant.remove())
    .then(() => res.redirect('/'))
})

//search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  console.log(keyword)
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
