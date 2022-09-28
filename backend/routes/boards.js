var express = require('express');
var router = express.Router();
const Board = require('../models/Board');

router
  .get('/', async (req, res, next) => {
    // console.log(Board.findById(id));
    const board = await Board.find({ id: board._id });
    res.json(board);
    console.log(board);
    console.log(error.message);
    res.status(500);
  })
  .get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const board = await Board.findById(id).exec((err, board) => {});
    console.log(board);
  });

module.exports = router;
