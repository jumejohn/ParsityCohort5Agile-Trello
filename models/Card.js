const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  cardTitle: { type: String, required: true },
  cardLabel: [],
  cardDescription: { type: String, required: false },
  cardComments: [
    {
      commentText: { type: String },
      commentUser: { type: String },
    },
  ],
  cardActivity: [{ type: String }],
});

module.exports = mongoose.model("Card", CardSchema);
