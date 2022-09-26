const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const connectDB = require('./config/db')



// mongoose.connect("mongodb://localhost/productsWithReviewsTest", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const app = express();

connectDB()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const mainRoutes = require("./routes/main");

app.use(mainRoutes);

module.exports = app.listen(8000, () => {
  console.log(`Node.js listening on port 8000`);
});