var express = require('express');
var router = express.Router();
const Board = require("../models/Board")
const List = require("../models/List")
const Organization = require("../models/Organization")
const Card = require("../models/Card")
const User = require("../models/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
