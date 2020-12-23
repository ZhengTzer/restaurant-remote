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

//search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim())
  );
  res.render("index", {
    restaurants: restaurants,
    keywords: req.query.keyword,
  });
});

//listening server
app.listen(port, () => {
  console.log(`Restaurant Web is running on http://localhost:${port}`);
});
