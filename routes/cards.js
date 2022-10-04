var express = require('express');
var router = express.Router();
const Card = require('../models/Card');
const passport = require('passport');
const passportService = require('../authentication/passport');
const List = require('../models/List');
const User = require('../models/User')
const requireAuth = passport.authenticate('jwt', { session: false });
const {createActivityLog, createComment} = require('../util/cardActivityLogCreator')

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

  .delete('/:cardId/:commentId', requireAuth, async function(req, res, next) {
    const cardId = req.params.cardId
    const commentId = req.params.commentId
    const card = await Card.findById(cardId)
    let newCommentArray = []
    card.cardComments.filter(comment => {
      if(comment._id != commentId){
        newCommentArray.push(comment)
      }
    })
    card.cardComments = newCommentArray
    await card.save()
    res.send(card).status(204).end()
  })

  .put('/:cardId', requireAuth, async function (req, res, next) {
    const cardId = req.params.cardId;
    const { listId, cardTitle, cardLabel, cardDescription, cardComment, userId } = req.body;
    // const user = User.findById(userId).exec((err, user)=> {
    //   if (err) return next (err)
    //   return user
    // })
    const user = await User.find({ _id: userId}).exec()
    const newComment = {commentText: cardComment, commentUser: user}
    // return newComment
      const activtyLog = createActivityLog(userId, listId)
      // const comment = createComment(userId, cardComment)
      
      const update = {
        cardTitle: cardTitle,
        cardLabel: cardLabel,
        cardDescription: cardDescription,
      };
      
      const filter = { _id: cardId };
      Card
    .findOneAndUpdate(filter, update, {
      new: true,
    })
    .updateOne({$push: {cardComments: newComment}})
    .updateOne({$push: {cardActivity: activtyLog}})
    .exec((err) => {
      if (err) {
        res.status(400).send(err)
        return next(err)
      } else {
        updatedList = List.findOne({ _id: listId })
        .populate('cards')
        .exec((err, list) => {
          if (err) return next(err)
          res.status(200).send(list).end();
        })
      }
    })
  });



module.exports = router;
