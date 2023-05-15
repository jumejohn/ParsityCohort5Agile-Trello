const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const OrganizationSchema = require('./Organization');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  password: { type: String, required: false },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  // this.salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model('User', UserSchema);
