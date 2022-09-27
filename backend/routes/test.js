var express = require('express');
var router = express.Router();
const Board = require("../models/Board")
const List = require("../models/List")
const Organization = require("../models/Organization")
const Card = require("../models/Card")
const User = require("../models/User")


router.get("/generate-fake-data", (req,res,next) => {
  let list = new List()
  list.boardName = "test project board"
  list.boards = []
  list.save((err) => {
    if(err) throw err
  })

  let board = new Board()
  board.boardName = "test project board"
  board.users = [],
  board.lists = []
  board.save((err) =>{
    if(err) throw err
  })
  res.end()
})


module.exports = router;