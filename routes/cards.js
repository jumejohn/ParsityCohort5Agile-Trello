var express = require('express');
var router = express.Router();
const Card = require('../models/Card');
const passport = require('passport');
const passportService = require('../authentication/passport');
const List = require('../models/List');
const requireAuth = passport.authenticate('jwt', { session: false });

router
  .get('/:cardId', requireAuth, function (req, res, next) {
    const cardId = req.params.cardId;
    Card.findById(cardId)
      .populate('cardComments cardActivity')
      .exec((err, card) => {
        if (err) {
          res.status(400).send(err)
          return next(err);
        } else {
          res.status(200).send(card).end();
        }
      });
  })

  .delete('/:cardId', requireAuth, async function (req, res, next) {
    const cardId = req.params.cardId;
    const { listId } = req.body;
    const listWithRemovedCard = await Card.findByIdAndDelete(cardId).exec((err) => {
      if (err) {
        res.status(400).send(err)
        return next(err);
      }
      updatedList = List.findOne({ _id: listId })
        .populate('cards')
        .exec((err, list) => {
          if (err) return next(err)
          console.log(list);
          res.status(200).send(list).end();
        })
    })
  })

  // POST add new card
  .post('/', requireAuth, async function(req, res, next){
    const { listId, cardTitle, cardLabel, cardDescription, cardComments, cardActivity } = req.body
    const listWithNewCard = await new Card({ cardTitle, cardLabel, cardDescription, cardComments, cardActivity }).save((err, card) => {
      if(err) return next(err)
      updatedList = List.findOneAndUpdate(
        { _id: listId},
        { $push: { cards: [card._id]}},
        { new: true }
      )
      .populate('cards')
      .exec((err, list) => {
        if (err) return next(err)
        res.status(200).send(list).end();
      })
    })
  })

  // .post('/', requireAuth, function (req, res, next) {
  //   const { cardTitle, cardLabel, cardDescription } = req.body;
  //   const newCard = new Card({ cardTitle, cardLabel, cardDescription }).save(
  //     (err) => {
  //       if (err){
  //         res.status(400).send(err)
  //         return next(err);
  //       } else {
  //       res.status(200).json(newCard);
  //       res.end();
  //       }
  //     }
  //   );
  // })

  .put('/:cardId', requireAuth, async function (req, res, next) {
    const cardId = req.params.cardId;
    const { listId, cardTitle, cardLabel, cardDescription } = req.body;
    const update = {
      cardTitle: cardTitle,
      cardLabel: cardLabel,
      cardDescription: cardDescription,
    };
    const filter = { _id: cardId };
    const listWithUpdatedCard = await Card.findOneAndUpdate(filter, update, {
      new: true,
    }).exec((err) => {
      if (err) return next(err)
      updatedList = List.findOne({ _id: listId })
        .populate('cards')
        .exec((err, list) => {
          if (err) return next(err)
          res.status(200).send(list).end();
        })
    })
  });

module.exports = router;
