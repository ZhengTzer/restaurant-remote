// mongoose connection
const db = require('../../config/mongoose')
const restaurantModel = require('../restaurantModel')
const restaurantListDB = require('../../restaurant.json').results

// add seed data
db.once('open', () => {
  for (let i = 0; i < restaurantListDB.length; i++) {
    restaurantModel.create(restaurantListDB[i])
  }
  console.log('insert sample data, done!')
})
