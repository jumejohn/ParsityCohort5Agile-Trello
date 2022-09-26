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

router.get("/generate-fake-data", (req,res,next) => {
//   let org = new Organization()
//   org.orgName = "Parsity"
//   org.orgOwner = "John Smith"
//   org.orgBoards = [],
//   org.orgMembers = []
//   org.save((err) => {
//     if(err) throw err
//   })

//   let user = new User()
//   user.username = "tester2"
//   user.firstname = "Mark"
//   user.lastname = "Cook"
//   user.email = "mark.cook@email.com"
//   user.phone = 2223334444
//   user.avatarUrl = "https://thumbs.dreamstime.com/z/cool-kid-10482439.jpg"
//   user.contacts = []
//   user.organization = []
//   user.password = "password"
//   user.save((err) => {
//     if(err) throw err
//   })

  
  res.end()
})

module.exports = router;
