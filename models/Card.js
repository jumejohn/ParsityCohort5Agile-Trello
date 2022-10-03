const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  cardTitle: { type: String, required: true },
  cardLabel: { type: String, required: false },
  cardDescription: { type: String, required: false, default: "" },
  cardComments: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Card", CardSchema);
