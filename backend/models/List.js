const mongoose = require("mongoose")
const BoardSchema = require("./Board")
const Schema = mongoose.Schema

const ListSchema = new Schema({
  boardName: {type: String, required: true},
  boards: [],
})

module.exports = mongoose.model("List", ListSchema)