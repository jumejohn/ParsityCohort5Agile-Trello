var express = require('express');
var router = express.Router();
const Board = require('../models/Board');
const Organization = require('../models/Organization')

const passport = require('passport');
const passportService = require('../authentication/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router
  // GET board from Organization
  .get('/:boardId', requireAuth, function (req, res, next) {
    const boardId = req.params.boardId;
    Board.findById(boardId)
      .populate('users')
      .populate({ path: 'lists', populate: { path: 'cards' } })
      .exec((err, board) => {
        if(err) return next(err)
        res.status(200).send(board).end()
      })
  })
  
// POST add new board
  .post('/', requireAuth, async function(req, res, next){
    const {boardName, organization, users} = req.body
    const newBoard = await new Board({boardName, organization, users}).save((err, board) => {
      if(err) return next(err)
      Organization.updateOne(
        { _id: organization},
        { $push: { orgBoards: [board._id]}},
        function(err, result) {
          if(err){
            return next(err)
          }
          else{
            return res.send(board).status(200)
          }
        }
        
        )
      })

  })


  // POST add new board
  .post('/', requireAuth, function (req, res, next) {
    const { boardName, organization, users } = req.body;
    const newBoard = new Board({ boardName, organization, users }).save(
      (err) => {
        if (err) return next(err);
        res.status(200).json(newBoard);
      }
    );
  })

  // DELETE board by id
  .delete('/:boardId', requireAuth, function (req, res, next) {
    const boardId = req.params.boardId;
    Board.findByIdAndDelete(boardId).exec((err) => {
      if (err) return next(err);
      res
        .send('Board has been successfully removed from the database')
        .status(204)
        .end();
    });
  })
  // PUT update board by id
  .put('/:boardId', requireAuth, async function (req, res, next) {
    const boardId = req.params.boardId;
    const updateQuery = {};
    if (req.body.boardName) updateQuery.boardName = req.body.boardName;
    if (req.body.users) updateQuery.users = req.body.users;
    if (req.body.lists) updateQuery.lists = req.body.lists;
    if (req.body.labels) updateQuery.labels = req.body.labels;
    // const { boardName, users, lists, labels } = req.body;
    // const update = { boardName: boardName, users: users, lists: lists, labels: labels };
    const filter = { _id: boardId };
    const updatedBoard = await Board.findOneAndUpdate(filter, updateQuery, { new: true })
      .populate('users')
      .populate({ path: 'lists', populate: { path: 'cards' } })
      .exec((err, board) => {
        if (err) return next(err);
        res
          .status(200)
          .send(board)
          .end();
      });
  });

module.exports = router;
