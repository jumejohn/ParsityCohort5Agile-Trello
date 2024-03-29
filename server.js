const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const mainRoutes = require("./routes/main");

const testRoutes = require("./routes/test");
const boardRoutes = require("./routes/boards");
const orgRoutes = require("./routes/organization");
const userRoutes = require("./routes/users");
const listRoutes = require("./routes/lists");
const cardRoutes = require("./routes/cards");

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
// main routes for login/logout
app.use("/", mainRoutes);
// test routes for adding testing data

app.use("/test", testRoutes);
app.use("/boards", boardRoutes);
app.use("/organization", orgRoutes);
app.use("/user", userRoutes);
app.use("/lists", listRoutes);
app.use("/cards", cardRoutes);

if (process.env.ENVIRONMENT === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  // app.use(express.static("client/build"));
  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
}

module.exports = app.listen(port, () => {
  console.log(`Node.js listening on port 8000`);
});
