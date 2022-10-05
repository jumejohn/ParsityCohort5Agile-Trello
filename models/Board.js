const mongoose = require("mongoose")
const UserSchema = require("./User")
const ListSchema = require("./List")
const Organization = require("./Organization")
const Schema = mongoose.Schema


const BoardSchema = new Schema({
  boardName: {type: String, required: true},
  organization: {type: Schema.Types.ObjectId, ref: "Organization"},
  users: [{type: Schema.Types.ObjectId, ref:"User"}],
  lists: [{type: Schema.Types.ObjectId, ref: "List"}],
  labels: {
    type: Array, 
    default: [
      {color: "#ffb3ba", title: null},
      {color: "#ffdfba", title: null},
      {color: "#ffffba", title: null},
      {color: "#baffc9", title: null},
      {color: "#bae1ff", title: null},
      {color: "#957dad", title: null},
    ],
  },
})

module.exports = mongoose.model("Board", BoardSchema)