const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CardSchema = new Schema({
  cardData: [{
    cardName: String,
    data: []
  }]
})

module.exports = mongoose.model("Card", CardSchema)