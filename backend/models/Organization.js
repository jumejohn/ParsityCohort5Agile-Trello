const mongoose = require("mongoose")
const UserSchema = require("./User")
const BoardSchema = require("./Board")
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  orgName: {type: String, required: true},
  orgOwner: {type: String, required: true},
  orgBoards: [],
  orgMembers: []
})

module.exports = mongoose.model("Organization", OrganizationSchema)