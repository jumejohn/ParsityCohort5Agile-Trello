var express = require('express');
var router = express.Router();
const List = require('../models/List');
const Board = require('../models/Board');
const passport = require('passport');
const passportService = require('../authentication/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router
  .get('/:listId', requireAuth, function (req, res, next) {
    const listId = req.params.listId;
    List.findById(listId)
      .populate('cards')
      .exec((err, list) => {
        if (err) {
          res.status(400).send(err)
          return next(err);
        } else {
          res.status(200).send(list).end();
        }
      });
  })

  .delete('/:listId', requireAuth, function (req, res, next) {
    const listId = req.params.listId;
    List.findByIdAndDelete(listId).exec((err) => {
      if (err) {
        res.status(400).send(err)
        return next(err);
      } else {
        res
        .send('List has been successfully removed from the database')
        .status(204)
        .end();
      }
    });
  })

  .post('/', requireAuth, async function(req, res, next){
    const { listName, board } = req.body;
    console.log("board", board)
    const newList = await new List({ listName }).save((err, list) => {
      if(err) return next(err)
      Board.updateOne(
        { _id: board },
        { $push: { lists: [list._id]}},
        function(err, result) {
          if(err){
            res.status(400).send(err)
          } else {
            res.send(list).status(200)
          }
        })
      })
  })

  .post('/', requireAuth, function (req, res, next) {
    const { listName, cards } = req.body;
    const newList = new List({ listName, cards }).save((err) => {
      if (err) {
        res.status(400).send(err)
        return next(err);
      } else {
      console.log(newList);
      res.status(200).json(newList);
      }
    });
  })

  .put('/:listId', requireAuth, async function (req, res, next) {
    const listId = req.params.listId;
    const { listName, cards } = req.body;
    const update = { listName: listName, cards: cards };
    const filter = { _id: listId };
    const updateList = await List.findOneAndUpdate(filter, update, {
      new: true,
    })
    .populate('cards');
    res.send(updateList)
    res.status(200);
  })

  // .put('/:listId/update', requireAuth, async function (req, res, next) {
  //   const listId = req.params.boardId
  //   const {boardId, lists, cards, username }= req.body
  //   const updatedBoard = Board.updateOne((
  //     {_id: boardId},
  //     { lists: lists}),
      
  //     function(err, result){
  //       const updatedList = List.updateOne((
  //       {_id: listId},
  //       { cards: cards}),

  //       function(err, result){
  //         const returnBoard = Board.findById(boardId)
  //         .populate({ path: 'lists', populate:{path: 'cards'}})
  //         .exec((err, board) => {
  //           if(err){
  //             res.status(400).send(err)
  //           } else {
  //             res.send(board).status(200)
  //           }})
  //       })
  //     })
  //   })
    
    module.exports = router;
// [
//   {lists:{_id:listId, cards:[{_id:cardId}]}}
// ]

    // .populate({ path: 'lists', populate: {path: 'cards'}}).exec()

// const newList = await new List({ listName }).save((err, list) => {
//   if(err) return next(err)
//   Board.updateOne(
//     { _id: board },
//     { $push: { lists: [list._id]}},
//     function(err, result) {
//       if(err){
//         res.status(400).send(err)
//       } else {
//         res.send(list).status(200)
//       }
//     })
//   })

[
  '633d0be355338ccaaf4060a9', '633dc0f555338ccaaf406322', '633dc0f955338ccaaf406329','633dc0fd55338ccaaf406330', '633dc0fd55338ccaaf406330', '633efc8eed4246b486db8366', '633efcb7e3dfa0720045e148' ]
  [
    '633efcbfe3dfa0720045e14f', '633efcc4e3dfa0720045e157'
  ]