var express = require('express');
var router = express.Router();
const List = require('../models/List');

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

  .post('/', requireAuth, function (req, res, next) {
    const { listName, cards } = req.body;
    const newList = new List({ listName, cards }).save((err) => {
      if (err) {
        res.status(400).send(err)
        return next(err);
      } else {
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
    });
    res.send(updateList).populate('cards');
    res.status(200);
  });

module.exports = router;
