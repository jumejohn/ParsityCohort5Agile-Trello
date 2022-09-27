const mongoose = require("mongoose")
const BoardSchema = require("./Board")
const Schema = mongoose.Schema

const ListSchema = new Schema({
  listName: {type: String, required: true},
  cards: [{type: Schema.Types.ObjectId, ref: "Card"}],
})

module.exports = mongoose.model("List", ListSchema)