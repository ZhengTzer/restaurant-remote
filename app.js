// declare
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000
const methodOverride = require('method-override')

// routes setting
const routes = require('./routes')

// mongoose config
require('./config/mongoose')

// app
const app = express()

// engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// get from routes
app.use(routes)

// listening server
app.listen(port, () => {
  console.log(`Restaurant Web is running on http://localhost:${port}`)
})
