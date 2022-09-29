var express = require('express');
var router = express.Router();
const Card = require('../models/Card')

router
  .get('/:cardId', function (req, res, next) {
    const cardId = req.params.cardId
    Card.findById(cardId)
      .exec((err, card) => {
        if(err) return next(err)
        res.status(200).send(card).end()
      })
  })

  .delete('/:cardId', function (req, res, next) {
    const cardId = req.params.cardId
    Card.findByIdAndDelete(cardId).exec((err) => {
      if(err) return next(err)
      res.send("Card has been successfully removed from the database").status(204).end()
    })
  }) 

  .post('/', function(req, res, next){
    const {cardTitle, cardLabel, cardDescription} = req.body
    const newCard = new Card({cardTitle, cardLabel, cardDescription}).save((err)=>{
      if(err) return next(err)
      res.status(200).json(newCard)
      res.end()
    })
  })

  .put('/:cardId', async function(req, res, next){
    const cardId = req.params.cardId
    const { cardTitle, cardLabel, cardDescription} = req.body
    const update = {cardTitle: cardTitle, cardLabel: cardLabel, cardDescription: cardDescription}
    const filter = {_id: cardId}
    const updateCard = await Card.findOneAndUpdate(filter, update, {new: true})
    res.send(updateCard)
    res.status(200)
  })

  module.exports = router