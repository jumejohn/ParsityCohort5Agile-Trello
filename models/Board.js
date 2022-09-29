const mongoose = require("mongoose")
const UserSchema = require("./User")
const ListSchema = require("./List")
const Organization = require("./Organization")
const Schema = mongoose.Schema


const BoardSchema = new Schema({
  boardName: {type: String, required: true},
  organization: {type: Schema.Types.ObjectId, ref: "Organization"},
  users: [{type: Schema.Types.ObjectId, ref:"User"}],
  lists: [{type: Schema.Types.ObjectId, ref: "List"}]
})

module.exports = mongoose.model("Board", BoardSchema)