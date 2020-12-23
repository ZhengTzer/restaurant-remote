const express = require("express");
const exphbs = require("express-handlebars");
const restaurantDBTable = require("./models/restaurantModel");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurantDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

//index
app.get("/", (req, res) => {
  restaurantDBTable
    .find()
    .lean()
    .then((restaurantListTable) =>
      res.render("index", { restaurantListTable })
    );
});

//show
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  return restaurantDBTable
    .findById(id)
    .lean()
    .then((singleRestaurant) => res.render("show", { singleRestaurant }));
});

//new
app.get("/restaurant/new", (req, res) => {
  return res.render("new");
});

/* //search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurant_list.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim())
  );
  res.render("index", {
    restaurants: restaurants,
    keywords: req.query.keyword,
  });
}); */

//edit
app.get("/restaurant/:id/edit", (req, res) => {
  const id = req.params.id;
  return restaurantDBTable
    .findById(id)
    .lean()
    .then((singleRestaurant) => res.render("edit", { singleRestaurant }));
});

app.post("/restaurant/:id/edit", (req, res) => {
  const id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return restaurantDBTable
    .findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((error) => console.log(error));
});

//listening server
app.listen(port, () => {
  console.log(`Restaurant Web is running on http://localhost:${port}`);
});
