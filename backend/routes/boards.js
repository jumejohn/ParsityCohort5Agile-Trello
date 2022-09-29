var express = require('express');
var router = express.Router();
const Board = require('../models/Board');

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
        if (err) return next(err);
        res.status(200).send(board).end();
      });
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
    const { boardName, users, lists } = req.body;
    const update = { boardName: boardName, users: users, lists: lists };
    const filter = { _id: boardId };
    const updateBoard = await Board.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(updateBoard);
    res.status(200);
  });

module.exports = router;
