const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CardCommentSchema = new Schema({
  commentUser: {type: Schema.Types.ObjectId, ref: "User"},
  commentText: {type: String, required: true}
})

module.exports = mongoose.model("CardComment", CardCommentSchema)