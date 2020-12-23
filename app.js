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
app.get("/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurant", (req, res) => {
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
    .create({
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description,
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

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

//delete
app.post("/restaurant/:id/delete", (req, res) => {
  const id = req.params.id;
  return restaurantDBTable
    .findById(id)
    .then((deleteRestaurant) => deleteRestaurant.remove())
    .then(() => res.redirect("/"));
});

//search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  console.log(keyword);
  restaurantDBTable
    .find()
    .lean()
    .then((restaurantListTable) => {
      const searchRestaurant = restaurantListTable.filter(
        (restaurantListTable) => {
          return (
            restaurantListTable.name.toLowerCase().includes(keyword) ||
            restaurantListTable.category.toLowerCase().includes(keyword)
          );
        }
      );
      res.render("index", {
        restaurantListTable: searchRestaurant,
        keyword: keyword,
      });
    })
    .catch((error) => console.error(error));
});

//listening server
app.listen(port, () => {
  console.log(`Restaurant Web is running on http://localhost:${port}`);
});
