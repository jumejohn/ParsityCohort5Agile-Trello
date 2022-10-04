const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const CardCommentSchema = new Schema({
  comment: { type: String, required: false },
  // commentFrom: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
});

module.exports = mongoose.model('CardComment', CardCommentSchema);
