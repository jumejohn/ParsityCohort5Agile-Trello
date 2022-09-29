var express = require('express');
var router = express.Router();
const Board = require('../models/Board');
const Organization = require('../models/Organization')

router

// GET board from Organization
  .get('/:boardId', function (req, res, next) {
    const boardId = req.params.boardId
    Board.findById(boardId)
      .populate("users")
      .populate(
        {path: "lists",
        populate: {path: "cards"}})
      .exec((err, board) => {
        if(err) return next(err)
        res.status(200).send(board).end()
      })
  })
  
// POST add new board
  .post('/', async function(req, res, next){
    const {boardName, organization, users} = req.body
    const newBoard = await new Board({boardName, organization, users}).save((err, board) => {
      if(err) return next(err)
      res.send(newBoard).status(200)
      Organization.updateOne(
        { _id: organization},
        { $push: { orgBoards: [board._id]}},
        function(err, result) {
          if(err){
            res.send(err)
          } else {
            res.send(result)
          }
        }
        
        )
      })
  })


// DELETE board by id
  .delete('/:boardId', function(req, res, next){
    const boardId = req.params.boardId
    Board.findByIdAndDelete(boardId).exec((err) => {
      if(err) return next(err)
      res.send("Board has been successfully removed from the database").status(204).end()
    })
  })
// PUT update board by id
  .put('/:boardId', async function(req, res, next) {
    const boardId = req.params.boardId
    const {boardName, users, lists} = req.body
    const update = {boardName: boardName, users: users, lists:lists}
    const filter = {_id: boardId}
    const updateBoard = await Board.findOneAndUpdate(filter, update, { new: true})
    res.send(updateBoard)  
    res.status(200)
  })

module.exports = router;
