const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CardSchema = new Schema({
  data: []
})

module.exports = mongoose.model("Card", CardSchema)