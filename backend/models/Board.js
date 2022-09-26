const mongoose = require("mongoose")
const UserSchema = require("./User")
const ListSchema = require("./List")
const Schema = mongoose.Schema


const BoardSchema = new Schema({
  boardName: {type: String, required: true},
  users: [],
  lists: []
})

module.exports = mongoose.model("Board", BoardSchema)