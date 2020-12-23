// mongoose connection
const mongoose = require("mongoose");
const restaurantModel = require("../restaurantModel");
const restaurantListDB = require("../../restaurant.json").results;

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

  for (let i = 0; i < restaurantListDB.length; i++) {
    restaurantModel.create(restaurantListDB[i]);
  }
  console.log("insert sample json, done!");
});
