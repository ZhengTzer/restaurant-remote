const express = require('express')
const exphbs = require('express-handlebars')
const restaurantDBTable = require('./models/restaurantModel')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const routes = require('./routes')

// engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// get from home.js
app.use(routes)

//listening server
app.listen(port, () => {
  console.log(`Restaurant Web is running on http://localhost:${port}`)
})
