const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CardSchema = new Schema({
    cardTitle: {type: String, required: true},
    cardLabel: {type: String, required: false},
    cardDescription: {type: String, required: false},
    cardComments: [{type: Schema.Types.ObjectId, ref: "CardComment"}],
    cardActivity: [
      {activityTimeStamp: {type: Date, required: true}}, 
      {activityDescription: {type: String, required: true}}, 
      {activityUser: 
        {type: Schema.Types.ObjectId, ref: "User"}, required: true}]
  })


module.exports = mongoose.model("Card", CardSchema)