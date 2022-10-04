const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const CardCommentSchema = new Schema({
  comment: { type: String},
  commentFrom: { type: String },
});

module.exports = mongoose.model('CardComment', CardCommentSchema);
